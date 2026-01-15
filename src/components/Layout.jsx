import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { 
  Home, 
  Plus, 
  List, 
  BarChart3, 
  Wallet, 
  Target, 
  Settings,
  Menu,
  X,
  LogOut,
  User
} from 'lucide-react'

const navItems = [
  { path: '/', icon: Home, label: '首页' },
  { path: '/add', icon: Plus, label: '记账' },
  { path: '/transactions', icon: List, label: '记录' },
  { path: '/statistics', icon: BarChart3, label: '统计' },
  { path: '/accounts', icon: Wallet, label: '账户' },
  { path: '/budget', icon: Target, label: '预算' },
  { path: '/settings', icon: Settings, label: '设置' },
]

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 移动端顶部栏 */}
      <div className="lg:hidden bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary-600">Piggy</h1>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="flex">
        {/* 侧边栏 */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 z-50
            w-64 bg-white shadow-lg lg:shadow-none
            transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            transition-transform duration-300 ease-in-out
            lg:block
          `}
        >
          <div className="h-full flex flex-col">
            <div className="p-6 border-b hidden lg:block">
              <h1 className="text-2xl font-bold text-primary-600">Piggy</h1>
              <p className="text-sm text-gray-500 mt-1">智能记账本</p>
              {user && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                  <User size={16} />
                  <span>{user.username}</span>
                </div>
              )}
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setSidebarOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors duration-200
                      ${isActive 
                        ? 'bg-primary-50 text-primary-600 font-medium' 
                        : 'text-gray-700 hover:bg-gray-100'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
              
              {/* 登出按钮 */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200 mt-4"
              >
                <LogOut size={20} />
                <span>登出</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* 主内容区 */}
        <main className="flex-1 lg:ml-0">
          <div className="p-4 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* 移动端遮罩层 */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

