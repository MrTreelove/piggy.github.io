import { API_BASE_URL } from '../config/config';

// 基础请求函数
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // 设置默认选项
  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  // 合并选项
  const mergedOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };
  
  try {
    const response = await fetch(url, mergedOptions);
    const data = await response.json();
    
    // 处理错误响应
    if (!response.ok) {
      throw new Error(data.message || `请求失败: ${response.status}`);
    }
    
    return data;
  } catch (error) {
    console.error('API 请求错误:', error);
    throw error;
  }
}

// 获取认证头
function getAuthHeaders() {
  const token = localStorage.getItem('piggy_access_token');
  if (token) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
  return {};
}

// 认证相关 API
export const authApi = {
  // 用户注册
  register: async (username, email, password) => {
    return request('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  },
  
  // 用户登录
  login: async (usernameOrEmail, password, rememberMe = false) => {
    return request('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ usernameOrEmail, password, rememberMe }),
    });
  },
  
  // 刷新访问令牌
  refreshToken: async (refreshToken) => {
    return request('/api/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  },
  
  // 用户登出
  logout: async () => {
    return request('/api/auth/logout', {
      method: 'POST',
      headers: getAuthHeaders(),
    });
  },
  
  // 修改密码
  changePassword: async (currentPassword, newPassword) => {
    return request('/api/auth/change-password', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  },
  
  // 申请重置密码
  forgotPassword: async (email) => {
    return request('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // 重置密码
  resetPassword: async (token, newPassword) => {
    return request('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ token, newPassword }),
    });
  },
  
  // 验证令牌
  verifyToken: async () => {
    return request('/api/auth/verify', {
      method: 'GET',
      headers: getAuthHeaders(),
    });
  },
};

export default {
  auth: authApi,
};