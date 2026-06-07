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

const { hashPassword } = require('../utils/hash');
async function changePassword(id_staff, oldPass, newPass) {
  const [rows] = await db.execute('SELECT password FROM staff WHERE id_staff = ?', [id_staff]);
  if (!rows[0]) return { ok: false, message: 'User not found' };
  const matched = await comparePassword(oldPass, rows[0].password);
  if (!matched) return { ok: false, message: 'Mật khẩu cũ không chính xác' };
  const hashed = await hashPassword(newPass);
  await db.execute('UPDATE staff SET password = ? WHERE id_staff = ?', [hashed, id_staff]);
  return { ok: true };
}

module.exports = { login, changePassword };
