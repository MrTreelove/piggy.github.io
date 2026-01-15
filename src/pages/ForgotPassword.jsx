import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react'
import Card from '../components/Card'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // 模拟发送重置密码邮件
    setTimeout(() => {
      if (email) {
        setSuccess(true)
      } else {
        setError('请输入邮箱地址')
      }
      setLoading(false)
    }, 1500)
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">忘记密码</h2>
            <p className="text-gray-500">请输入您的邮箱地址，我们将发送密码重置链接</p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">邮件已发送</h3>
              <p className="text-gray-600 mb-6">
                我们已向 <strong>{email}</strong> 发送了密码重置链接，请查收邮件并按照说明重置密码。
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                返回登录
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱地址
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="请输入注册时的邮箱地址"
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>发送中...</span>
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    <span>发送重置链接</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              记起密码了？{' '}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
                返回登录
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

