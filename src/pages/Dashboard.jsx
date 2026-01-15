import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, TrendingUp, TrendingDown, ArrowRight, Wallet } from 'lucide-react'
import Card from '../components/Card'

export default function Dashboard() {
  const [totalBalance] = useState(125680.50)
  const [monthIncome] = useState(15000.00)
  const [monthExpense] = useState(8234.50)
  const [netIncome] = useState(monthIncome - monthExpense)

  const recentTransactions = [
    { id: 1, type: 'expense', amount: 128.00, category: '餐饮', account: '支付宝', date: '2025-01-27', note: '午餐' },
    { id: 2, type: 'income', amount: 15000.00, category: '工资', account: '银行卡', date: '2025-01-25', note: '月薪' },
    { id: 3, type: 'expense', amount: 500.00, category: '购物', account: '微信', date: '2025-01-24', note: '日用品' },
    { id: 4, type: 'expense', amount: 200.00, category: '交通', account: '现金', date: '2025-01-23', note: '地铁卡充值' },
  ]

  const accounts = [
    { name: '银行卡', balance: 85680.50, color: 'bg-blue-500' },
    { name: '支付宝', balance: 25000.00, color: 'bg-blue-400' },
    { name: '微信', balance: 15000.00, color: 'bg-green-500' },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">仪表盘</h1>
          <p className="text-gray-500 mt-1">欢迎回来，查看您的财务状况</p>
        </div>
        <Link
          to="/add"
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200"
        >
          <Plus size={20} />
          <span>快速记账</span>
        </Link>
      </div>

      {/* 总览卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">总资产</p>
              <p className="text-3xl font-bold mt-2">¥{totalBalance.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <Wallet size={24} />
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">本月收入</p>
              <p className="text-2xl font-bold mt-2 text-green-600">¥{monthIncome.toLocaleString()}</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">本月支出</p>
              <p className="text-2xl font-bold mt-2 text-red-600">¥{monthExpense.toLocaleString()}</p>
            </div>
            <TrendingDown className="text-red-500" size={32} />
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">本月结余</p>
              <p className={`text-2xl font-bold mt-2 ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                ¥{netIncome.toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${netIncome >= 0 ? 'bg-green-100' : 'bg-red-100'}`}>
              {netIncome >= 0 ? <TrendingUp className="text-green-600" size={24} /> : <TrendingDown className="text-red-600" size={24} />}
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 账户列表 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">账户余额</h2>
            <Link to="/accounts" className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
              查看全部
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {accounts.map((account) => (
              <div key={account.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 ${account.color} rounded-full flex items-center justify-center text-white font-semibold`}>
                    {account.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{account.name}</p>
                    <p className="text-sm text-gray-500">余额</p>
                  </div>
                </div>
                <p className="text-lg font-bold">¥{account.balance.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* 最近交易 */}
        <Card>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">最近交易</h2>
            <Link to="/transactions" className="text-primary-600 hover:text-primary-700 text-sm flex items-center gap-1">
              查看全部
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.category}</p>
                    <p className="text-sm text-gray-500">{transaction.account} · {transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                  </p>
                  {transaction.note && <p className="text-xs text-gray-400">{transaction.note}</p>}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

