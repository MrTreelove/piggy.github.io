import { createContext, useContext, useState, useEffect } from 'react'
import { authApi } from '../services/api'
import { TOKEN_STORAGE_KEYS } from '../config/config'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 初始化：检查本地存储中的令牌
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const accessToken = localStorage.getItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN)
        const refreshToken = localStorage.getItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN)
        const savedUser = localStorage.getItem(TOKEN_STORAGE_KEYS.USER)

        if (accessToken && savedUser) {
          try {
            // 验证令牌是否有效
            const userData = await authApi.verifyToken()
            setUser(userData)
          } catch (err) {
            // 令牌无效，尝试使用刷新令牌
            if (refreshToken) {
              try {
                const tokenData = await authApi.refreshToken(refreshToken)
                localStorage.setItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN, tokenData.accessToken)
                const userData = await authApi.verifyToken()
                setUser(userData)
              } catch (refreshErr) {
                // 刷新令牌也无效，清除所有存储
                clearAuthStorage()
              }
            } else {
              clearAuthStorage()
            }
          }
        }
      } catch (err) {
        console.error('初始化认证失败:', err)
        clearAuthStorage()
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()
  }, [])

  // 清除认证存储
  const clearAuthStorage = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN)
    localStorage.removeItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem(TOKEN_STORAGE_KEYS.USER)
    setUser(null)
  }

  // 用户登录
  const login = async (usernameOrEmail, password, rememberMe = false) => {
    setError(null)
    try {
      const response = await authApi.login(usernameOrEmail, password, rememberMe)
      
      // 适配 API 返回的数据格式
      const loginData = response.data || response
      
      // 存储令牌和用户信息
      localStorage.setItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN, loginData.accessToken)
      localStorage.setItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN, loginData.refreshToken)
      localStorage.setItem(TOKEN_STORAGE_KEYS.USER, JSON.stringify(loginData.user))
      
      // 使用 setTimeout 确保状态更新后再返回结果
      return new Promise((resolve) => {
        setUser(loginData.user)
        // 延迟一小段时间，确保状态更新
        setTimeout(() => {
          resolve({ success: true, user: loginData.user })
        }, 100)
      })
    } catch (err) {
      const errorMessage = err.message || '登录失败，请检查用户名和密码'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 用户注册
  const register = async (username, email, password) => {
    setError(null)
    try {
      const response = await authApi.register(username, email, password)
      
      // 适配 API 返回的数据格式
      const registerData = response.data || response
      
      // 存储令牌和用户信息
      localStorage.setItem(TOKEN_STORAGE_KEYS.ACCESS_TOKEN, registerData.accessToken)
      localStorage.setItem(TOKEN_STORAGE_KEYS.REFRESH_TOKEN, registerData.refreshToken)
      localStorage.setItem(TOKEN_STORAGE_KEYS.USER, JSON.stringify(registerData.user))
      
      setUser(registerData.user)
      return { success: true, user: registerData.user }
    } catch (err) {
      const errorMessage = err.message || '注册失败，请检查输入信息'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 用户登出
  const logout = async () => {
    try {
      await authApi.logout()
    } catch (err) {
      console.error('登出失败:', err)
    } finally {
      clearAuthStorage()
    }
  }

  // 修改密码
  const changePassword = async (currentPassword, newPassword) => {
    setError(null)
    try {
      await authApi.changePassword(currentPassword, newPassword)
      return { success: true, message: '密码修改成功' }
    } catch (err) {
      const errorMessage = err.message || '密码修改失败，请检查输入信息'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 申请重置密码
  const forgotPassword = async (email) => {
    setError(null)
    try {
      await authApi.forgotPassword(email)
      return { success: true, message: '重置链接已发送，请查收邮件' }
    } catch (err) {
      const errorMessage = err.message || '发送重置链接失败，请检查邮箱地址'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 重置密码
  const resetPassword = async (token, newPassword) => {
    setError(null)
    try {
      await authApi.resetPassword(token, newPassword)
      return { success: true, message: '密码重置成功，请登录' }
    } catch (err) {
      const errorMessage = err.message || '密码重置失败，请检查链接是否有效'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    }
  }

  // 更新用户信息
  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem(TOKEN_STORAGE_KEYS.USER, JSON.stringify(userData))
  }

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    changePassword,
    forgotPassword,
    resetPassword,
    updateUser,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

