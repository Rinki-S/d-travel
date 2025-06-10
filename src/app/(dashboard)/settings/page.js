import { Settings, Save } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";

export default function SettingsPage() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Settings className="h-6 w-6" />
            <div>
              <CardTitle>系统设置</CardTitle>
              <CardDescription>管理系统配置和业务规则</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">订金规则</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  默认订金比例
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="30"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  最低订金金额
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">余款规则</h3>
              <div className="space-y-2">
                <label className="block text-sm font-medium">出发前天数</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="7"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  催收提醒天数
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="3"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">取消规则</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  出发前7天以上
                </label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="10"
                />
                <span className="text-xs text-gray-500">手续费比例(%)</span>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">出发前3-7天</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="30"
                />
                <span className="text-xs text-gray-500">手续费比例(%)</span>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">出发前3天内</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded"
                  defaultValue="50"
                />
                <span className="text-xs text-gray-500">手续费比例(%)</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button>
              <Save className="h-4 w-4 mr-2" />
              保存设置
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
