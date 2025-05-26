"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { Search, CreditCard, Receipt, Filter } from "lucide-react";
import { samplePayments } from "@/data/sampleData";

export default function PaymentList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [payments] = useState(samplePayments);

  const filteredPayments = payments.filter((payment) =>
    payment.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "已完成":
        return "text-green-600 bg-green-100";
      case "处理中":
        return "text-yellow-600 bg-yellow-100";
      case "已失败":
        return "text-red-600 bg-red-100";
      case "已退款":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "订金":
        return "text-blue-600 bg-blue-100";
      case "余款":
        return "text-green-600 bg-green-100";
      case "退款":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const totalAmount = filteredPayments.reduce(
    (sum, payment) =>
      payment.status === "已完成" ? sum + payment.amount : sum,
    0
  );

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">今日收入</p>
                <p className="text-2xl font-bold text-green-600">¥12,580</p>
              </div>
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">本月收入</p>
                <p className="text-2xl font-bold text-blue-600">¥185,240</p>
              </div>
              <Receipt className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">待收余款</p>
                <p className="text-2xl font-bold text-orange-600">¥45,680</p>
              </div>
              <Filter className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CreditCard className="h-6 w-6" />
              <div>
                <CardTitle>支付管理</CardTitle>
                <CardDescription>管理所有支付记录和交易状态</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索申请ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">导出记录</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>支付ID</TableHead>
                <TableHead>申请ID</TableHead>
                <TableHead>支付类型</TableHead>
                <TableHead>金额</TableHead>
                <TableHead>支付方式</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>支付时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.applicationId}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getTypeColor(
                        payment.paymentType
                      )}`}
                    >
                      {payment.paymentType}
                    </span>
                  </TableCell>
                  <TableCell className="font-medium">
                    ¥{payment.amount}
                  </TableCell>
                  <TableCell>{payment.paymentMethod}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>{payment.paymentDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        查看
                      </Button>
                      <Button variant="ghost" size="sm">
                        打印收据
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">当前筛选结果总金额：</span>
              <span className="text-lg font-bold text-green-600">
                ¥{totalAmount}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
