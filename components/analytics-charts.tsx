"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const salesData = [
  { month: "Янв", sales: 4000, clients: 24 },
  { month: "Фев", sales: 3000, clients: 18 },
  { month: "Мар", sales: 5000, clients: 32 },
  { month: "Апр", sales: 4500, clients: 28 },
  { month: "Май", sales: 6000, clients: 38 },
  { month: "Июн", sales: 5500, clients: 35 },
]

const funnelData = [
  { name: "Новые лиды", value: 400, color: "#3b82f6" },
  { name: "Квалификация", value: 300, color: "#8b5cf6" },
  { name: "Предложение", value: 200, color: "#ec4899" },
  { name: "Закрыто", value: 100, color: "#10b981" },
]

const sourceData = [
  { name: "WhatsApp", value: 45, color: "#25d366" },
  { name: "Сайт", value: 30, color: "#3b82f6" },
  { name: "Реклама", value: 15, color: "#f59e0b" },
  { name: "Рекомендации", value: 10, color: "#8b5cf6" },
]

export function AnalyticsCharts() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Обзор</TabsTrigger>
        <TabsTrigger value="sales">Продажи</TabsTrigger>
        <TabsTrigger value="clients">Клиенты</TabsTrigger>
        <TabsTrigger value="funnels">Воронки</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Общая выручка</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₸ 27,500</div>
              <p className="text-xs text-muted-foreground">+20.1% от прошлого месяца</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Новые клиенты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+175</div>
              <p className="text-xs text-muted-foreground">+15% от прошлого месяца</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Конверсия</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25%</div>
              <p className="text-xs text-muted-foreground">+5% от прошлого месяца</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Средний чек</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₸ 157</div>
              <p className="text-xs text-muted-foreground">+2.5% от прошлого месяца</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Динамика продаж</CardTitle>
              <CardDescription>Продажи и клиенты за последние 6 месяцев</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" name="Продажи (₸)" />
                  <Line type="monotone" dataKey="clients" stroke="#10b981" name="Клиенты" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Источники клиентов</CardTitle>
              <CardDescription>Откуда приходят ваши клиенты</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="sales" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Продажи по месяцам</CardTitle>
            <CardDescription>Детальная статистика продаж</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Продажи (₸)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="clients" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Рост клиентской базы</CardTitle>
            <CardDescription>Количество новых клиентов по месяцам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" fill="#10b981" name="Новые клиенты" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="funnels" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Воронка продаж</CardTitle>
            <CardDescription>Распределение клиентов по этапам</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Bar dataKey="value" name="Количество">
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
