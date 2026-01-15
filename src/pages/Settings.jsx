import { useState } from 'react'
import { Moon, Sun, Download, Upload, Trash2, Shield, Bell, Globe, User, Lock, Edit, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import Card from '../components/Card'

export default function Settings() {
  const { user, updateUser } = useAuth()
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [passwordProtection, setPasswordProtection] = useState(false)
  
  // 用户信息编辑状态
  const [editingUser, setEditingUser] = useState(false)
  const [userForm, setUserForm] = useState({
    username: user?.username || '',
    email: user?.email || '',
  })
  
  // 密码修改状态
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  const handleUpdateUser = () => {
    if (userForm.username && userForm.email) {
      updateUser({ ...user, ...userForm })
      setEditingUser(false)
      alert('用户信息已更新')
    }
  }

  const handleChangePassword = () => {
    setPasswordError('')
    setPasswordSuccess(false)
    
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setPasswordError('请填写所有字段')
      return
    }
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('两次输入的密码不一致')
      return
    }
    
    if (passwordForm.newPassword.length < 6) {
      setPasswordError('新密码长度至少为6位')
      return
    }
    
    // 模拟密码修改
    setPasswordSuccess(true)
    setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
    setTimeout(() => {
      setChangingPassword(false)
      setPasswordSuccess(false)
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-500 mt-1">管理您的应用设置</p>
      </div>

      {/* 用户信息管理 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <User size={24} />
          用户信息
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex-1">
              <p className="font-medium mb-1">用户名</p>
              {editingUser ? (
                <input
                  type="text"
                  value={userForm.username}
                  onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              ) : (
                <p className="text-gray-600">{user?.username || '未设置'}</p>
              )}
            </div>
            {!editingUser && (
              <button
                onClick={() => setEditingUser(true)}
                className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Edit size={20} className="text-gray-600" />
              </button>
            )}
          </div>
          
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div className="flex-1">
              <p className="font-medium mb-1">邮箱</p>
              {editingUser ? (
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              ) : (
                <p className="text-gray-600">{user?.email || '未设置'}</p>
              )}
            </div>
          </div>
          
          {editingUser && (
            <div className="flex gap-2 pt-2">
              <button
                onClick={handleUpdateUser}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Check size={18} />
                <span>保存</span>
              </button>
              <button
                onClick={() => {
                  setEditingUser(false)
                  setUserForm({ username: user?.username || '', email: user?.email || '' })
                }}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                <span>取消</span>
              </button>
            </div>
          )}
        </div>
      </Card>

      {/* 密码修改 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Lock size={24} />
          密码管理
        </h2>
        {!changingPassword ? (
          <button
            onClick={() => setChangingPassword(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors"
          >
            <Lock size={20} />
            <span>修改密码</span>
          </button>
        ) : (
          <div className="space-y-4">
            {passwordError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                {passwordError}
              </div>
            )}
            {passwordSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                密码修改成功！
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">当前密码</label>
              <input
                type="password"
                value={passwordForm.oldPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                placeholder="请输入当前密码"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">新密码</label>
              <input
                type="password"
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                placeholder="至少6位字符"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">确认新密码</label>
              <input
                type="password"
                value={passwordForm.confirmPassword}
                onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                placeholder="请再次输入新密码"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleChangePassword}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Check size={18} />
                <span>确认修改</span>
              </button>
              <button
                onClick={() => {
                  setChangingPassword(false)
                  setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' })
                  setPasswordError('')
                  setPasswordSuccess(false)
                }}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <X size={18} />
                <span>取消</span>
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* 基础设置 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Globe size={24} />
          基础设置
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium">货币单位</p>
              <p className="text-sm text-gray-500">选择默认货币</p>
            </div>
            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none">
              <option>人民币 (¥)</option>
              <option>美元 ($)</option>
              <option>欧元 (€)</option>
              <option>日元 (¥)</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium">日期格式</p>
              <p className="text-sm text-gray-500">选择日期显示格式</p>
            </div>
            <select className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none">
              <option>YYYY-MM-DD</option>
              <option>MM/DD/YYYY</option>
              <option>DD/MM/YYYY</option>
            </select>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">主题</p>
              <p className="text-sm text-gray-500">浅色/深色模式</p>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
              <span>{darkMode ? '深色' : '浅色'}</span>
            </button>
          </div>
        </div>
      </Card>

      {/* 安全设置 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Shield size={24} />
          安全设置
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium">密码保护</p>
              <p className="text-sm text-gray-500">启用应用密码保护</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={passwordProtection}
                onChange={(e) => setPasswordProtection(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">数据加密</p>
              <p className="text-sm text-gray-500">加密存储本地数据</p>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">已启用</span>
          </div>
        </div>
      </Card>

      {/* 通知设置 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
          <Bell size={24} />
          通知设置
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium">记账提醒</p>
              <p className="text-sm text-gray-500">每日提醒记账</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            <div>
              <p className="font-medium">预算提醒</p>
              <p className="text-sm text-gray-500">预算超支提醒</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium">账单提醒</p>
              <p className="text-sm text-gray-500">信用卡还款等提醒</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                defaultChecked
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </Card>

      {/* 数据管理 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">数据管理</h2>
        <div className="space-y-4">
          <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="flex items-center gap-3">
              <Download size={20} className="text-primary-600" />
              <div className="text-left">
                <p className="font-medium">导出数据</p>
                <p className="text-sm text-gray-500">导出为 Excel/CSV/PDF</p>
              </div>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:bg-primary-50 transition-colors">
            <div className="flex items-center gap-3">
              <Upload size={20} className="text-primary-600" />
              <div className="text-left">
                <p className="font-medium">导入数据</p>
                <p className="text-sm text-gray-500">从 Excel/CSV 导入</p>
              </div>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-3">
              <Trash2 size={20} className="text-red-600" />
              <div className="text-left">
                <p className="font-medium text-red-600">清空所有数据</p>
                <p className="text-sm text-gray-500">删除所有记录和账户（不可恢复）</p>
              </div>
            </div>
          </button>
        </div>
      </Card>

      {/* 关于 */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">关于</h2>
        <div className="space-y-2 text-gray-600">
          <p><strong>应用名称：</strong>Piggy - 智能记账本</p>
          <p><strong>版本：</strong>1.0.0</p>
          <p><strong>描述：</strong>简单、直观、功能完善的记账工具</p>
        </div>
      </Card>
    </div>
  )
}

