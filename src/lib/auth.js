/**
 * Local Authentication Library
 * Developer: Abdelhamed Nada
 */

// Hash password using Web Crypto API
async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

// Generate token
function generateToken(userId) {
  const payload = {
    userId,
    exp: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  return btoa(JSON.stringify(payload));
}

// Verify token
function verifyToken(token) {
  try {
    const payload = JSON.parse(atob(token));
    if (payload.exp < Date.now()) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

// Get users from localStorage
function getUsers() {
  const users = localStorage.getItem('pdf_master_users');
  return users ? JSON.parse(users) : [];
}

// Save users to localStorage
function saveUsers(users) {
  localStorage.setItem('pdf_master_users', JSON.stringify(users));
}

// Register new user
export async function register(email, password, name) {
  const users = getUsers();
  
  // Check if user already exists
  if (users.find(u => u.email === email)) {
    throw new Error('المستخدم موجود بالفعل');
  }

  // Hash password
  const hashedPassword = await hashPassword(password);

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    email,
    password: hashedPassword,
    name,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  saveUsers(users);

  // Generate token
  const token = generateToken(newUser.id);

  // Save token
  localStorage.setItem('pdf_master_token', token);

  return {
    token,
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
    },
  };
}

// Login user
export async function login(email, password) {
  const users = getUsers();
  
  // Find user
  const user = users.find(u => u.email === email);
  if (!user) {
    throw new Error('بيانات الدخول غير صحيحة');
  }

  // Verify password
  const hashedPassword = await hashPassword(password);
  if (hashedPassword !== user.password) {
    throw new Error('بيانات الدخول غير صحيحة');
  }

  // Generate token
  const token = generateToken(user.id);

  // Save token
  localStorage.setItem('pdf_master_token', token);

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
}

// Logout user
export function logout() {
  localStorage.removeItem('pdf_master_token');
}

// Get current user
export function getCurrentUser() {
  const token = localStorage.getItem('pdf_master_token');
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) {
    logout();
    return null;
  }

  const users = getUsers();
  const user = users.find(u => u.id === payload.userId);
  
  if (!user) {
    logout();
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

// Check if user is authenticated
export function isAuthenticated() {
  return getCurrentUser() !== null;
}
