import { useState } from 'react'
import { Search, Filter, Edit, Trash2, Download } from 'lucide-react'
import Card from '../components/Card'

const transactions = [
  { id: 1, type: 'expense', amount: 128.00, category: '餐饮', account: '支付宝', date: '2025-01-27', note: '午餐', time: '12:30' },
  { id: 2, type: 'income', amount: 15000.00, category: '工资', account: '银行卡', date: '2025-01-25', note: '月薪', time: '09:00' },
  { id: 3, type: 'expense', amount: 500.00, category: '购物', account: '微信', date: '2025-01-24', note: '日用品', time: '15:20' },
  { id: 4, type: 'expense', amount: 200.00, category: '交通', account: '现金', date: '2025-01-23', note: '地铁卡充值', time: '08:15' },
  { id: 5, type: 'income', amount: 500.00, category: '奖金', account: '银行卡', date: '2025-01-22', note: '项目奖金', time: '14:00' },
  { id: 6, type: 'expense', amount: 1200.00, category: '娱乐', account: '支付宝', date: '2025-01-21', note: '电影票', time: '19:30' },
]

export default function TransactionList() {
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const filteredTransactions = transactions.filter(t => {
    const matchSearch = !search || 
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.note.toLowerCase().includes(search.toLowerCase()) ||
      t.account.toLowerCase().includes(search.toLowerCase())
    const matchType = filterType === 'all' || t.type === filterType
    return matchSearch && matchType
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">交易记录</h1>
        <p className="text-gray-500 mt-1">查看和管理您的所有交易记录</p>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="搜索分类、备注、账户..."
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Filter size={20} />
              <span>筛选</span>
            </button>
            <button className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download size={20} />
              <span>导出</span>
            </button>
          </div>
        </div>

        {/* 类型筛选 */}
        <div className="flex gap-2 mt-4">
          {['all', 'income', 'expense', 'transfer'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${filterType === t
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {t === 'all' ? '全部' : t === 'income' ? '收入' : t === 'expense' ? '支出' : '转账'}
            </button>
          ))}
        </div>
      </Card>

      {/* 交易列表 */}
      <Card>
        <div className="space-y-2">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>没有找到匹配的交易记录</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`
                    w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
                    ${transaction.type === 'income' ? 'bg-green-500' : 'bg-red-500'}
                  `}>
                    {transaction.type === 'income' ? '+' : '-'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{transaction.category}</p>
                      <span className="text-sm text-gray-500">{transaction.account}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-gray-500">{transaction.date}</span>
                      <span className="text-sm text-gray-400">{transaction.time}</span>
                      {transaction.note && (
                        <>
                          <span className="text-gray-300">·</span>
                          <span className="text-sm text-gray-500">{transaction.note}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className={`
                    text-lg font-bold
                    ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}
                  `}>
                    {transaction.type === 'income' ? '+' : '-'}¥{transaction.amount.toLocaleString()}
                  </p>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                      <Edit size={18} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={18} className="text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  )
}

