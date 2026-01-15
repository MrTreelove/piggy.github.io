import { useState } from 'react'
import { Plus, Edit, Trash2, Wallet } from 'lucide-react'
import Card from '../components/Card'

const accounts = [
  { id: 1, name: '银行卡', type: '银行卡', balance: 85680.50, color: 'bg-blue-500', icon: '💳' },
  { id: 2, name: '支付宝', type: '支付宝', balance: 25000.00, color: 'bg-blue-400', icon: '💙' },
  { id: 3, name: '微信', type: '微信钱包', balance: 15000.00, color: 'bg-green-500', icon: '💚' },
  { id: 4, name: '现金', type: '现金', balance: 0.00, color: 'bg-yellow-500', icon: '💵' },
]

export default function Accounts() {
  const [showAddModal, setShowAddModal] = useState(false)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">账户管理</h1>
          <p className="text-gray-500 mt-1">管理您的所有账户</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
        >
          <Plus size={20} />
          <span>添加账户</span>
        </button>
      </div>

      {/* 账户总览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">总资产</p>
              <p className="text-3xl font-bold mt-2">
                ¥{accounts.reduce((sum, acc) => sum + acc.balance, 0).toLocaleString()}
              </p>
            </div>
            <Wallet size={40} className="opacity-80" />
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-500 text-sm">账户数量</p>
            <p className="text-3xl font-bold mt-2 text-primary-600">{accounts.length}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-500 text-sm">本月新增</p>
            <p className="text-3xl font-bold mt-2 text-green-600">+2</p>
          </div>
        </Card>
      </div>

      {/* 账户列表 */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">账户列表</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="p-6 border-2 border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${account.color} rounded-xl flex items-center justify-center text-3xl`}>
                    {account.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{account.name}</h3>
                    <p className="text-sm text-gray-500">{account.type}</p>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit size={18} className="text-gray-600" />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-1">余额</p>
                <p className="text-2xl font-bold text-gray-900">¥{account.balance.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* 添加账户模态框 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6">添加账户</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">账户名称</label>
                <input
                  type="text"
                  placeholder="例如：工商银行"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">账户类型</label>
                <select className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none">
                  <option>现金</option>
                  <option>银行卡</option>
                  <option>支付宝</option>
                  <option>微信钱包</option>
                  <option>信用卡</option>
                  <option>其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">初始余额</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                />
              </div>
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                >
                  保存
                </button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  )
}

