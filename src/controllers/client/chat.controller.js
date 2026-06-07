const { HfInference } = require('@huggingface/inference');

exports.handleChat = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const HF_TOKEN = process.env.HF_TOKEN;
    if (!HF_TOKEN) {
      return res.json({ reply: 'Chatbot chưa được cấu hình. Vui lòng thêm HF_TOKEN vào file .env.' });
    }
    const hf = new HfInference(HF_TOKEN);
    
    // Sử dụng model Llama 3 hoặc fallback nếu cần
    let response;
    try {
      response = await hf.chatCompletion({
        model: 'meta-llama/Meta-Llama-3-8B-Instruct',
        messages: [
          { role: 'system', content: 'Bạn là một trợ lý ảo tư vấn y tế cho nhà thuốc Pharma Care. Hãy trả lời ngắn gọn, thân thiện và hữu ích bằng tiếng Việt.' },
          { role: 'user', content: message }
        ],
        max_tokens: 250,
        temperature: 0.7
      });
    } catch (modelError) {
      console.warn('Llama 3 model failed, trying fallback model...', modelError.message);
      response = await hf.chatCompletion({
        model: 'mistralai/Mixtral-8x7B-Instruct-v0.1', // Một model mã nguồn mở mạnh mẽ khác
        messages: [
          { role: 'system', content: 'Bạn là một trợ lý ảo tư vấn y tế cho nhà thuốc Pharma Care. Trả lời bằng tiếng Việt.' },
          { role: 'user', content: message }
        ],
        max_tokens: 250
      });
    }

    let reply = 'Xin lỗi, tôi không thể trả lời lúc này.';
    if (response && response.choices && response.choices.length > 0) {
      reply = response.choices[0].message.content.trim();
    }

    res.json({ reply });
  } catch (error) {
    console.error('Chat Error:', error);
    res.json({ reply: 'Đã có lỗi xảy ra. Vui lòng kiểm tra lại cấu hình hoặc thử lại sau.' });
  }
};
