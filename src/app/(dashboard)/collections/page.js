import { Phone, Calendar, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function CollectionsPage() {
  const mockTasks = [
    { id: 1, customer: "张三", amount: 3740, overdueDays: 5, priority: "高" },
    { id: 2, customer: "李四", amount: 2580, overdueDays: 2, priority: "中" },
    { id: 3, customer: "王五", amount: 1890, overdueDays: 8, priority: "高" },
  ];

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Phone className="h-6 w-6" />
            <div>
              <CardTitle>催款管理</CardTitle>
              <CardDescription>管理逾期付款催收任务</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTasks.map((task) => (
              <div key={task.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        task.priority === "高"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    />
                    <div>
                      <h4 className="font-medium">{task.customer}</h4>
                      <p className="text-sm text-gray-500">
                        逾期金额: ¥{task.amount} · 逾期{task.overdueDays}天
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-1" />
                      电话催收
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-1" />
                      安排跟进
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
