import { useState } from 'react'
import { Plus, Target, AlertCircle } from 'lucide-react'
import Card from '../components/Card'

const budgets = [
  { id: 1, category: '餐饮', budget: 3000, spent: 2340, percentage: 78, status: 'warning' },
  { id: 2, category: '交通', budget: 1500, spent: 1200, percentage: 80, status: 'warning' },
  { id: 3, category: '购物', budget: 5000, spent: 3500, percentage: 70, status: 'good' },
  { id: 4, category: '娱乐', budget: 2000, spent: 1800, percentage: 90, status: 'danger' },
  { id: 5, category: '医疗', budget: 1000, spent: 800, percentage: 80, status: 'warning' },
  { id: 6, category: '教育', budget: 2000, spent: 1500, percentage: 75, status: 'good' },
]

export default function Budget() {
  const [totalBudget] = useState(14500)
  const [totalSpent] = useState(11140)
  const totalPercentage = Math.round((totalSpent / totalBudget) * 100)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">预算管理</h1>
          <p className="text-gray-500 mt-1">设置和管理您的预算</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg shadow-primary-200">
          <Plus size={20} />
          <span>设置预算</span>
        </button>
      </div>

      {/* 总预算概览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-primary-100 text-sm">总预算</p>
              <p className="text-3xl font-bold mt-2">¥{totalBudget.toLocaleString()}</p>
            </div>
            <Target size={40} className="opacity-80" />
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-500 text-sm">已使用</p>
            <p className="text-3xl font-bold mt-2 text-red-600">¥{totalSpent.toLocaleString()}</p>
          </div>
        </Card>
        <Card>
          <div>
            <p className="text-gray-500 text-sm">剩余</p>
            <p className="text-3xl font-bold mt-2 text-green-600">
              ¥{(totalBudget - totalSpent).toLocaleString()}
            </p>
          </div>
        </Card>
      </div>

      {/* 总预算进度 */}
      <Card>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold">总预算进度</h2>
            <span className={`text-lg font-bold ${
              totalPercentage >= 90 ? 'text-red-600' : 
              totalPercentage >= 70 ? 'text-yellow-600' : 
              'text-green-600'
            }`}>
              {totalPercentage}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`h-4 rounded-full transition-all ${
                totalPercentage >= 90 ? 'bg-red-500' : 
                totalPercentage >= 70 ? 'bg-yellow-500' : 
                'bg-green-500'
              }`}
              style={{ width: `${Math.min(totalPercentage, 100)}%` }}
            />
          </div>
        </div>
        {totalPercentage >= 90 && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle size={20} />
            <span className="text-sm font-medium">预算即将用完，请注意控制支出</span>
          </div>
        )}
      </Card>

      {/* 分类预算 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">分类预算</h2>
        <div className="space-y-4">
          {budgets.map((budget) => (
            <div key={budget.id} className="p-4 border-2 border-gray-200 rounded-lg hover:border-primary-300 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold text-lg">{budget.category}</h3>
                  {budget.status === 'danger' && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-medium rounded">
                      超支风险
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">¥{budget.spent.toLocaleString()} / ¥{budget.budget.toLocaleString()}</p>
                  <p className={`text-lg font-bold ${
                    budget.percentage >= 90 ? 'text-red-600' : 
                    budget.percentage >= 70 ? 'text-yellow-600' : 
                    'text-green-600'
                  }`}>
                    {budget.percentage}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${
                    budget.percentage >= 90 ? 'bg-red-500' : 
                    budget.percentage >= 70 ? 'bg-yellow-500' : 
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min(budget.percentage, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

