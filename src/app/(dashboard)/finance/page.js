import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { DollarSign, TrendingUp, Download } from "lucide-react";

export default function FinancePage() {
  const financeData = [
    { period: "2024年5月", revenue: 185240, refunds: 12580, net: 172660 },
    { period: "2024年4月", revenue: 208450, refunds: 15200, net: 193250 },
    { period: "2024年3月", revenue: 195680, refunds: 8900, net: 186780 },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">本月收入</p>
                <p className="text-2xl font-bold text-green-600">¥185,240</p>
                <p className="text-xs text-green-500">+12.5% 较上月</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">退款金额</p>
                <p className="text-2xl font-bold text-red-600">¥12,580</p>
                <p className="text-xs text-red-500">+3.2% 较上月</p>
              </div>
              <DollarSign className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">净收入</p>
                <p className="text-2xl font-bold text-blue-600">¥172,660</p>
                <p className="text-xs text-blue-500">+10.8% 较上月</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <DollarSign className="h-6 w-6" />
              <div>
                <CardTitle>财务管理</CardTitle>
                <CardDescription>查看财务报表和收支统计</CardDescription>
              </div>
            </div>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              导出报表
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {financeData.map((data, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{data.period}</h4>
                    <div className="flex items-center space-x-6 mt-2 text-sm">
                      <span>
                        收入:{" "}
                        <span className="text-green-600 font-medium">
                          ¥{data.revenue.toLocaleString()}
                        </span>
                      </span>
                      <span>
                        退款:{" "}
                        <span className="text-red-600 font-medium">
                          ¥{data.refunds.toLocaleString()}
                        </span>
                      </span>
                      <span>
                        净收入:{" "}
                        <span className="text-blue-600 font-medium">
                          ¥{data.net.toLocaleString()}
                        </span>
                      </span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
