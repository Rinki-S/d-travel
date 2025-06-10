"use client";

import { useState } from "react";
import { Plus, Search, Eye, FileText, Phone, Mail } from "lucide-react";
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
import { sampleApplications } from "@/data/sampleData";

export default function ApplicationList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [applications] = useState(sampleApplications);

  const filteredApplications = applications.filter(
    (app) =>
      app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactPhone.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "已确认":
        return "text-green-600 bg-green-100";
      case "待确认":
        return "text-yellow-600 bg-yellow-100";
      case "已取消":
        return "text-red-600 bg-red-100";
      case "待支付":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileText className="h-6 w-6" />
              <div>
                <CardTitle>申请管理</CardTitle>
                <CardDescription>管理旅游申请和参与者信息</CardDescription>
              </div>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增申请
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索申请人姓名或电话..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>申请人</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>参与人数</TableHead>
                <TableHead>总金额</TableHead>
                <TableHead>已付订金</TableHead>
                <TableHead>余款</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>申请日期</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((application) => (
                <TableRow key={application.id}>
                  <TableCell className="font-medium">
                    {application.applicantName}
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Phone className="h-3 w-3 mr-1" />
                        {application.contactPhone}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-3 w-3 mr-1" />
                        {application.contactEmail}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{application.participants.length}人</TableCell>
                  <TableCell>¥{application.totalAmount}</TableCell>
                  <TableCell className="text-green-600">
                    ¥{application.depositAmount}
                  </TableCell>
                  <TableCell className="text-orange-600">
                    ¥{application.balanceAmount}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        application.status
                      )}`}
                    >
                      {application.status}
                    </span>
                  </TableCell>
                  <TableCell>{application.applicationDate}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredApplications.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "未找到匹配的申请" : "暂无申请数据"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
