import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 检查本地存储中是否有登录信息
    const savedUser = localStorage.getItem('piggy_user')
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser))
      } catch (e) {
        localStorage.removeItem('piggy_user')
      }
    }
    setLoading(false)
  }, [])

  const login = async (username, password, rememberMe = false) => {
    // 模拟登录API调用
    // 实际项目中应该调用真实的后端API
    if (username && password) {
      const userData = {
        id: Date.now().toString(),
        username,
        email: username.includes('@') ? username : `${username}@example.com`,
        createdAt: new Date().toISOString(),
      }
      setUser(userData)
      if (rememberMe) {
        localStorage.setItem('piggy_user', JSON.stringify(userData))
      }
      return { success: true, user: userData }
    }
    return { success: false, error: '用户名或密码错误' }
  }

  const register = async (username, email, password) => {
    // 模拟注册API调用
    if (username && email && password) {
      const userData = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date().toISOString(),
      }
      setUser(userData)
      localStorage.setItem('piggy_user', JSON.stringify(userData))
      return { success: true, user: userData }
    }
    return { success: false, error: '注册失败，请检查输入信息' }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('piggy_user')
  }

  const updateUser = (userData) => {
    setUser(userData)
    localStorage.setItem('piggy_user', JSON.stringify(userData))
  }

  const value = {
    user,
    login,
    register,
    logout,
    updateUser,
    isAuthenticated: !!user,
    loading,
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

