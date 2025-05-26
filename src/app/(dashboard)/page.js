import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  MapPin,
  Package,
  FileText,
  CreditCard,
  TrendingUp,
  Users,
} from "lucide-react";

export default function DashboardPage() {
  const stats = [
    {
      title: "目的地数量",
      value: "28",
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      title: "活跃产品",
      value: "45",
      icon: Package,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      title: "待处理申请",
      value: "12",
      icon: FileText,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      title: "今日收入",
      value: "¥12,580",
      icon: CreditCard,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "新申请",
      content: "张三提交了北京三日游申请",
      time: "2分钟前",
    },
    {
      id: 2,
      type: "支付完成",
      content: "李四完成了桂林四日游订金支付",
      time: "5分钟前",
    },
    {
      id: 3,
      type: "新产品",
      content: '添加了新目的地"九寨沟风光游"',
      time: "1小时前",
    },
    {
      id: 4,
      type: "催款提醒",
      content: "王五的余款已逾期3天",
      time: "2小时前",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">旅游管理系统</h1>
        <p className="text-gray-600 mt-2">
          欢迎回来！今天是 {new Date().toLocaleDateString("zh-CN")}
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bg}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 最近活动 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>最近活动</span>
            </CardTitle>
            <CardDescription>系统最新的业务动态</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-blue-600">
                        {activity.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {activity.time}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {activity.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 本月概览 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>本月概览</span>
            </CardTitle>
            <CardDescription>2024年5月业务数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium">新增客户</span>
                <span className="text-lg font-bold text-green-600">+42</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-sm font-medium">完成订单</span>
                <span className="text-lg font-bold text-blue-600">68</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                <span className="text-sm font-medium">客户满意度</span>
                <span className="text-lg font-bold text-purple-600">98.5%</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <span className="text-sm font-medium">平均订单金额</span>
                <span className="text-lg font-bold text-orange-600">
                  ¥2,456
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
