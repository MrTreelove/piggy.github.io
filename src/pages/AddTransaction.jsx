import { useState } from 'react'
import { ArrowLeft, Calendar, Image as ImageIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

const transactionTypes = [
  { id: 'income', label: '收入', color: 'bg-green-500' },
  { id: 'expense', label: '支出', color: 'bg-red-500' },
  { id: 'transfer', label: '转账', color: 'bg-blue-500' },
]

const incomeCategories = ['工资', '奖金', '投资收益', '其他收入']
const expenseCategories = ['餐饮', '交通', '购物', '娱乐', '医疗', '教育', '其他']
const accounts = ['现金', '银行卡', '支付宝', '微信', '信用卡']

export default function AddTransaction() {
  const navigate = useNavigate()
  const [type, setType] = useState('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [account, setAccount] = useState('')
  const [note, setNote] = useState('')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const categories = type === 'income' ? incomeCategories : expenseCategories

  const handleSubmit = (e) => {
    e.preventDefault()
    // 这里处理提交逻辑
    console.log({ type, amount, category, account, note, date })
    alert('记账成功！')
    navigate('/')
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">记账</h1>
          <p className="text-gray-500 mt-1">记录您的每一笔收支</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 类型选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">交易类型</label>
            <div className="grid grid-cols-3 gap-3">
              {transactionTypes.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setType(t.id)
                    setCategory('')
                  }}
                  className={`
                    p-4 rounded-lg border-2 transition-all
                    ${type === t.id 
                      ? `${t.color} text-white border-transparent` 
                      : 'bg-white border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  <div className="font-medium">{t.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* 金额输入 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">金额</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-xl">¥</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full pl-10 pr-4 py-4 text-3xl font-bold border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* 分类选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">分类</label>
            <div className="grid grid-cols-4 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`
                    p-3 rounded-lg border-2 transition-all
                    ${category === cat
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'bg-white border-gray-200 hover:border-gray-300'
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 账户选择 */}
          {type !== 'transfer' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">账户</label>
              <select
                value={account}
                onChange={(e) => setAccount(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                required
              >
                <option value="">请选择账户</option>
                {accounts.map((acc) => (
                  <option key={acc} value={acc}>{acc}</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">转出账户</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                  required
                >
                  <option value="">请选择</option>
                  {accounts.map((acc) => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">转入账户</label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                  required
                >
                  <option value="">请选择</option>
                  {accounts.map((acc) => (
                    <option key={acc} value={acc}>{acc}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 日期选择 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
            <div className="relative">
              <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* 备注 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">备注</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="添加备注信息（可选）"
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary-500 focus:outline-none resize-none"
            />
          </div>

          {/* 附件 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">附件</label>
            <button
              type="button"
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
            >
              <ImageIcon size={20} className="text-gray-400" />
              <span className="text-gray-500">添加图片（发票、收据等）</span>
            </button>
          </div>

          {/* 提交按钮 */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex-1 px-6 py-3 border-2 border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              取消
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium shadow-lg shadow-primary-200"
            >
              保存
            </button>
          </div>
        </form>
      </Card>
    </div>
  )
}

