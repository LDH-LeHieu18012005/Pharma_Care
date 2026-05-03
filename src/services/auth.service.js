const db = require('../config/db');
const { hashPassword, comparePassword } = require('../utils/hash');

async function registerCustomer(data) {
  const email = data.email || '';
  const password = data.password || '123456';
  const passwordHash = await hashPassword(password);
  const [exists] = await db.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [email]);
  if (exists.length) {
    return { ok: false, message: 'Email đã tồn tại' };
  }
  await db.execute(
    'INSERT INTO users (full_name, email, phone, password_hash, address, role_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [data.full_name || '', email, data.phone || '', passwordHash, data.address || '', 3, 1]
  );
  return { ok: true };
}

async function login(email, password) {
  const [rows] = await db.execute('SELECT u.*, r.name AS role_name FROM users u LEFT JOIN roles r ON u.role_id = r.id WHERE u.email = ? LIMIT 1', [email]);
  const user = rows[0];
  if (!user) return { ok: false, message: 'Sai email hoặc mật khẩu' };
  const matched = await comparePassword(password || '', user.password_hash || '');
  if (!matched) return { ok: false, message: 'Sai email hoặc mật khẩu' };
  return {
    ok: true,
    user: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
      role: user.role_name || 'customer',
      role_id: user.role_id
    }
  };
}

async function getCurrentUser(userId) {
  const [rows] = await db.execute('SELECT id, full_name, email, phone, address, role_id, status FROM users WHERE id = ? LIMIT 1', [userId]);
  return rows[0] || null;
}

async function changePassword(userId, oldPassword, newPassword) {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);
  const user = rows[0];
  if (!user) return { ok: false, message: 'Không tìm thấy tài khoản' };
  const matched = await comparePassword(oldPassword || '', user.password_hash || '');
  if (!matched) return { ok: false, message: 'Mật khẩu cũ không đúng' };
  const passwordHash = await hashPassword(newPassword || '123456');
  await db.execute('UPDATE users SET password_hash = ? WHERE id = ?', [passwordHash, userId]);
  return { ok: true };
}

async function logout() {
  return { ok: true };
}

module.exports = { registerCustomer, login, getCurrentUser, changePassword, logout };
