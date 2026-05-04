const db = require('../config/db');
const { comparePassword } = require('../utils/hash');

async function login(username, password) {
  const [rows] = await db.execute('SELECT * FROM staff WHERE username = ? AND status = 1 LIMIT 1', [username]);
  const user = rows[0];
  if (!user) return { ok: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
  const matched = await comparePassword(password || '', user.password || '');
  if (!matched) return { ok: false, message: 'Sai tên đăng nhập hoặc mật khẩu' };
  return {
    ok: true,
    user: {
      id: user.id_staff,
      name: user.name_staff,
      username: user.username,
      permission: user.permission,
      images: user.images
    }
  };
}

module.exports = { login };
