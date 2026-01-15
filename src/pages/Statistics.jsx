import { useState } from 'react'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import Card from '../components/Card'

const pieData = [
  { name: '餐饮', value: 2340, color: '#3b82f6' },
  { name: '交通', value: 1200, color: '#10b981' },
  { name: '购物', value: 3500, color: '#f59e0b' },
  { name: '娱乐', value: 1800, color: '#ef4444' },
  { name: '医疗', value: 800, color: '#8b5cf6' },
  { name: '教育', value: 1500, color: '#ec4899' },
]

const barData = [
  { month: '1月', 收入: 15000, 支出: 8234 },
  { month: '2月', 收入: 15000, 支出: 9200 },
  { month: '3月', 收入: 15000, 支出: 7800 },
  { month: '4月', 收入: 15000, 支出: 8500 },
  { month: '5月', 收入: 15000, 支出: 9100 },
  { month: '6月', 收入: 15000, 支出: 8800 },
]

const lineData = [
  { date: '1/1', 收入: 500, 支出: 300 },
  { date: '1/8', 收入: 800, 支出: 450 },
  { date: '1/15', 收入: 600, 支出: 500 },
  { date: '1/22', 收入: 1200, 支出: 700 },
  { date: '1/29', 收入: 1000, 支出: 600 },
]

export default function Statistics() {
  const [timeRange, setTimeRange] = useState('month')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">统计分析</h1>
          <p className="text-gray-500 mt-1">深入了解您的财务状况</p>
        </div>
        <div className="flex gap-2">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 rounded-lg transition-colors
                ${timeRange === range
                  ? 'bg-primary-100 text-primary-700 font-medium'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
              `}
            >
              {range === 'week' ? '本周' : range === 'month' ? '本月' : '本年'}
            </button>
          ))}
        </div>
      </div>

      {/* 支出分类占比 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">支出分类占比</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-3">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }} />
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold">¥{item.value.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">
                    {((item.value / pieData.reduce((sum, d) => sum + d.value, 0)) * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 月度收支对比 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">月度收支对比</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="收入" fill="#10b981" />
            <Bar dataKey="支出" fill="#ef4444" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* 收支趋势 */}
      <Card>
        <h2 className="text-xl font-semibold mb-6">收支趋势</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="收入" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="支出" stroke="#ef4444" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}

