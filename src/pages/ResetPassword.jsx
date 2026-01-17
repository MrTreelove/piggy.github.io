import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Lock, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Card from '../components/Card'
import { PASSWORD_REQUIREMENTS } from '../config/config'

export default function ResetPassword() {
  const navigate = useNavigate()
  const { resetPassword } = useAuth()
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)

  // 从URL中获取令牌
  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
    } else {
      setError('无效的重置链接')
    }
  }, [searchParams])

  const checkPasswordStrength = (password) => {
    let strength = 0
    if (password.length >= PASSWORD_REQUIREMENTS.MIN_LENGTH) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (e) => {
    const password = e.target.value
    setNewPassword(password)
    setPasswordStrength(checkPasswordStrength(password))
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength === 0) return { text: '', color: '' }
    if (passwordStrength <= 2) return { text: '弱', color: 'text-red-600' }
    if (passwordStrength <= 3) return { text: '中', color: 'text-yellow-600' }
    return { text: '强', color: 'text-green-600' }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // 验证密码
    if (newPassword !== confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    if (newPassword.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
      setError(`密码长度至少为${PASSWORD_REQUIREMENTS.MIN_LENGTH}位`)
      return
    }

    if (!/[a-zA-Z]/.test(newPassword)) {
      setError('密码必须包含至少一个字母')
      return
    }

    if (!/[0-9]/.test(newPassword)) {
      setError('密码必须包含至少一个数字')
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword(token, newPassword)
      if (result.success) {
        setSuccess(true)
        // 3秒后跳转到登录页面
        setTimeout(() => {
          navigate('/login')
        }, 3000)
      } else {
        setError(result.error || '密码重置失败，请检查链接是否有效')
      }
    } catch (err) {
      setError('密码重置失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary-600 mb-2">Piggy</h1>
          <p className="text-gray-600">智能记账本</p>
        </div>

        <Card>
          <div className="mb-6">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-4"
            >
              <ArrowLeft size={20} />
              <span>返回登录</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">重置密码</h2>
            <p className="text-gray-500">请设置您的新密码</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-600">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">密码重置成功</h3>
              <p className="text-gray-600 mb-6">
                您的密码已成功重置，正在跳转到登录页面...
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                立即登录
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  新密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={newPassword}
                    onChange={handlePasswordChange}
                    placeholder={`至少${PASSWORD_REQUIREMENTS.MIN_LENGTH}位，包含字母和数字`}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
                {newPassword && (
                  <div className="mt-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            passwordStrength <= 2
                              ? 'bg-red-500'
                              : passwordStrength <= 3
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        />
                      </div>
                      {passwordStrength > 0 && (
                        <span className={`text-sm font-medium ${getPasswordStrengthText().color}`}>
                          {getPasswordStrengthText().text}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  确认新密码
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="请再次输入新密码"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
                {confirmPassword && newPassword === confirmPassword && (
                  <div className="mt-2 flex items-center gap-2 text-green-600 text-sm">
                    <CheckCircle size={16} />
                    <span>密码匹配</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                disabled={loading || !token}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>重置中...</span>
                  </>
                ) : (
                  <>
                    <Lock size={20} />
                    <span>重置密码</span>
                  </>
                )}
              </button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}