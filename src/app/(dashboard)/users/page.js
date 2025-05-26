import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Users, Plus, Shield } from "lucide-react";

export default function UsersPage() {
  const mockUsers = [
    {
      id: 1,
      name: "张经理",
      email: "zhang@travel.com",
      role: "经理",
      status: "激活",
    },
    {
      id: 2,
      name: "李客服",
      email: "li@travel.com",
      role: "客服",
      status: "激活",
    },
    {
      id: 3,
      name: "王财务",
      email: "wang@travel.com",
      role: "财务",
      status: "激活",
    },
  ];

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Users className="h-6 w-6" />
              <div>
                <CardTitle>用户管理</CardTitle>
                <CardDescription>管理系统用户和权限分配</CardDescription>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              新增用户
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockUsers.map((user) => (
              <div key={user.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">{user.name}</h4>
                      <p className="text-sm text-gray-500">
                        {user.email} · {user.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                      {user.status}
                    </span>
                    <Button variant="outline" size="sm">
                      <Shield className="h-4 w-4 mr-1" />
                      权限设置
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
