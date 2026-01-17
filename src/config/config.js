// API 配置
export const API_BASE_URL = ''; // 使用相对路径，依赖 Vite 代理

// 令牌存储键名
export const TOKEN_STORAGE_KEYS = {
  ACCESS_TOKEN: 'piggy_access_token',
  REFRESH_TOKEN: 'piggy_refresh_token',
  USER: 'piggy_user',
};

// 密码强度要求
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,
  REQUIRE_LETTER: true,
  REQUIRE_NUMBER: true,
};

// 登录失败锁定配置
export const LOGIN_LOCK_CONFIG = {
  MAX_ATTEMPTS: 5,
  LOCK_DURATION_MINUTES: 30,
};

// 令牌过期时间（秒）
export const TOKEN_EXPIRATION = {
  ACCESS_TOKEN: 7200, // 2小时
  REFRESH_TOKEN: 2592000, // 30天
  PASSWORD_RESET: 86400, // 24小时
};