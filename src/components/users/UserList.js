"use client";

import { useState } from "react";
import { Plus, Search, Edit, Trash2, Shield } from "lucide-react";
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

// 示例用户数据
const sampleUsers = [
  {
    id: "U001",
    username: "admin",
    realName: "系统管理员",
    email: "admin@travel.com",
    phone: "13800138000",
    role: "管理员",
    status: "激活",
    createTime: "2024-01-01",
  },
  {
    id: "U002",
    username: "operator1",
    realName: "张三",
    email: "zhangsan@travel.com",
    phone: "13900139000",
    role: "操作员",
    status: "激活",
    createTime: "2024-02-15",
  },
  {
    id: "U003",
    username: "finance1",
    realName: "李四",
    email: "lisi@travel.com",
    phone: "13700137000",
    role: "财务",
    status: "激活",
    createTime: "2024-03-10",
  },
  {
    id: "U004",
    username: "sale1",
    realName: "王五",
    email: "wangwu@travel.com",
    phone: "13600136000",
    role: "销售",
    status: "冻结",
    createTime: "2024-04-05",
  },
];

export default function UserList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users] = useState(sampleUsers);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.realName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm)
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "激活":
        return "text-green-600 bg-green-100";
      case "冻结":
        return "text-red-600 bg-red-100";
      case "待审核":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case "管理员":
        return "text-purple-600 bg-purple-100";
      case "财务":
        return "text-blue-600 bg-blue-100";
      case "操作员":
        return "text-green-600 bg-green-100";
      case "销售":
        return "text-orange-600 bg-orange-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>用户管理</CardTitle>
              <CardDescription>管理系统用户和权限</CardDescription>
            </div>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              新增用户
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索用户名、姓名、邮箱或电话..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>用户ID</TableHead>
                <TableHead>用户名</TableHead>
                <TableHead>真实姓名</TableHead>
                <TableHead>联系方式</TableHead>
                <TableHead>角色</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>创建时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell className="font-medium">{user.username}</TableCell>
                  <TableCell>{user.realName}</TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span>{user.email}</span>
                      <span>{user.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getRoleColor(
                        user.role
                      )}`}
                    >
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell>{user.createTime}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "未找到匹配的用户" : "暂无用户数据"}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
