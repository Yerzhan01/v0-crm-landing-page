"use client"

import { useMemo } from "react"
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
import { useDashboardTranslation } from "@/hooks/use-dashboard-translation"
import { EmptyState } from "@/components/empty-state"

// Типы для данных
interface SalesDataItem {
  month: string
  sales: number
  clients: number
}

interface ChartDataItem {
  name: string
  value: number
  color: string
}

interface AnalyticsChartsProps {
  // В будущем добавить реальные данные через props
  salesData?: SalesDataItem[]
  overviewStats?: {
    totalRevenue: number
    revenueChange: number
    newClients: number
    clientsChange: number
    conversion: number
    conversionChange: number
    averageCheck: number
    averageCheckChange: number
  }
}

export function AnalyticsCharts({ salesData: propsSalesData, overviewStats }: AnalyticsChartsProps) {
  const { t, lang } = useDashboardTranslation()

  const salesData = propsSalesData
  const funnelData = useMemo<ChartDataItem[]>(
    () => [
      { name: t.newLeads, value: 400, color: "#3b82f6" },
      { name: t.qualification, value: 300, color: "#8b5cf6" },
      { name: t.proposal, value: 200, color: "#ec4899" },
      { name: t.closed, value: 100, color: "#10b981" },
    ],
    [t],
  )

  const sourceData = useMemo<ChartDataItem[]>(
    () => [
      { name: "WhatsApp", value: 45, color: "#25d366" },
      { name: t.website, value: 30, color: "#3b82f6" },
      { name: t.advertising, value: 15, color: "#f59e0b" },
      { name: t.referrals, value: 10, color: "#8b5cf6" },
    ],
    [t],
  )

  const stats = overviewStats

  if (!propsSalesData || propsSalesData.length === 0) {
    return (
      <EmptyState
        title={t.noData || "Нет данных"}
        description={t.noDataDescription || "Данные аналитики пока недоступны"}
      />
    )
  }

  if (!overviewStats) {
    return <EmptyState title={t.loading || "Загрузка..."} description={t.loadingStats || "Загружаем статистику..."} />
  }

  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">{t.overview}</TabsTrigger>
        <TabsTrigger value="sales">{t.sales}</TabsTrigger>
        <TabsTrigger value="clients">{t.clients}</TabsTrigger>
        <TabsTrigger value="funnels">{t.funnels}</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title={t.totalRevenue}
            value={`₸ ${stats.totalRevenue.toLocaleString()}`}
            change={stats.revenueChange}
            changeLabel={t.fromLastMonth}
          />
          <StatCard
            title={t.newClients}
            value={`+${stats.newClients}`}
            change={stats.clientsChange}
            changeLabel={t.fromLastMonth}
          />
          <StatCard
            title={t.conversion}
            value={`${stats.conversion}%`}
            change={stats.conversionChange}
            changeLabel={t.fromLastMonth}
          />
          <StatCard
            title={t.averageCheck}
            value={`₸ ${stats.averageCheck}`}
            change={stats.averageCheckChange}
            changeLabel={t.fromLastMonth}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>{t.salesDynamics}</CardTitle>
              <CardDescription>{t.salesAndClientsLast6Months}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#3b82f6" name={t.salesTenge} />
                  <Line type="monotone" dataKey="clients" stroke="#10b981" name={t.clients} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t.clientSources}</CardTitle>
              <CardDescription>{t.whereClientsFrom}</CardDescription>
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
            <CardTitle>{t.salesByMonths}</CardTitle>
            <CardDescription>{t.detailedSalesStatistics}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name={t.salesTenge} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="clients" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t.clientsBaseGrowth}</CardTitle>
            <CardDescription>{t.newClientsByMonths}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="clients" fill="#10b981" name={t.newClients} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="funnels" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>{t.salesFunnel}</CardTitle>
            <CardDescription>{t.clientsDistributionStages}</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={funnelData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <Tooltip />
                <Bar dataKey="value" name={t.quantity}>
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

// Вспомогательный компонент для статистики
interface StatCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
}

function StatCard({ title, value, change, changeLabel }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className={`text-xs ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? "+" : ""}
          {change}% {changeLabel}
        </p>
      </CardContent>
    </Card>
  )
}
