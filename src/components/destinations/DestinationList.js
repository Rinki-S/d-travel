"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Search, Edit, Trash2, Eye, MapPin } from "lucide-react";
import DestinationForm from "./DestinationForm";
import DestinationDetail from "./DestinationDetail";
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

// 错误处理工具函数
const logError = (error) => {
  if (process.env.NODE_ENV === "development") {
    // 开发环境下输出到控制台
    // eslint-disable-next-line no-console
    console.error(error);
  }
  // 生产环境应发送到日志服务
};

// 显示用户友好的错误信息（暂时使用 alert，实际应使用 toast）
const showError = (message) => {
  // eslint-disable-next-line no-alert
  alert(message);
};

// 显示确认对话框（暂时使用 confirm，实际应使用 Dialog）
const showConfirm = (message) => {
  // eslint-disable-next-line no-alert
  return confirm(message);
};

// 表格行组件
const DestinationRow = ({ destination, onView, onEdit, onDelete }) => (
  <TableRow key={destination.id}>
    <TableCell className="font-medium">{destination.name}</TableCell>
    <TableCell>{destination.location}</TableCell>
    <TableCell>{destination.type}</TableCell>
    <TableCell>
      <span
        className={`px-2 py-1 rounded-full text-xs ${
          destination.status === "已发布"
            ? "bg-green-100 text-green-800"
            : destination.status === "草稿"
            ? "bg-yellow-100 text-yellow-800"
            : "bg-gray-100 text-gray-800"
        }`}
      >
        {destination.status}
      </span>
    </TableCell>
    <TableCell className="text-right">
      <div className="flex justify-end space-x-1">
        <Button
          variant="compact"
          size="compact"
          onClick={() => onView(destination)}
          className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200"
        >
          <Eye className="h-4 w-4" />
        </Button>
        <Button
          variant="compact"
          size="compact"
          onClick={() => onEdit(destination)}
          className="hover:bg-amber-50 hover:text-amber-600 hover:border-amber-200"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="compact"
          size="compact"
          onClick={() => onDelete(destination.id, destination.name)}
          className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
);

export default function DestinationListFixed() {
  const [destinations, setDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  const filteredDestinations = useMemo(() => {
    if (!destinations || !Array.isArray(destinations)) return [];
    if (!searchTerm) return destinations;

    const searchLower = searchTerm.toLowerCase();
    return destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchLower) ||
        dest.location.toLowerCase().includes(searchLower)
    );
  }, [destinations, searchTerm]);

  const fetchDestinations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/destinations");

      if (!response.ok) {
        throw new Error(`API错误: ${response.status}`);
      }

      const result = await response.json();

      if (result.success) {
        setDestinations(result.data || []);
      } else {
        throw new Error(result.error || "获取数据失败");
      }
    } catch (error) {
      logError(error);
      showError(`获取目的地失败: ${error.message}`);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCreate = useCallback(() => {
    setEditingDestination(null);
    setShowForm(true);
  }, []);

  const handleEdit = useCallback((destination) => {
    setEditingDestination(destination);
    setShowForm(true);
  }, []);

  const handleView = useCallback((destination) => {
    setSelectedDestination(destination);
    setShowDetail(true);
  }, []);

  const handleDelete = useCallback(
    async (id, destinationName) => {
      const confirmMessage = `确定要删除目的地 "${destinationName}" 吗？`;

      if (!showConfirm(confirmMessage)) return;

      try {
        const response = await fetch(`/api/destinations/${id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`删除失败: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          await fetchDestinations();
          showError(`目的地 "${destinationName}" 已成功删除`);
        } else {
          throw new Error(result.message || "删除失败");
        }
      } catch (error) {
        logError(error);
        showError(`删除失败: ${error.message}`);
      }
    },
    [fetchDestinations]
  );

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleFormSuccess = useCallback(() => {
    setShowForm(false);
    setEditingDestination(null);
    fetchDestinations();
  }, [fetchDestinations]);

  const handleFormCancel = useCallback(() => {
    setShowForm(false);
    setEditingDestination(null);
  }, []);

  const handleDetailClose = useCallback(() => {
    setShowDetail(false);
    setSelectedDestination(null);
  }, []);

  useEffect(() => {
    fetchDestinations();
  }, [fetchDestinations]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 font-mono">
        <div className="text-lg">加载中...</div>
      </div>
    );
  }

  return (
    <div
      className="container mx-auto p-6 font-mono"
      style={{
        fontFamily:
          '"IBM Plex Mono", ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6" />
              <div>
                <CardTitle>目的地管理</CardTitle>
                <CardDescription>管理旅游目的地信息</CardDescription>
              </div>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              添加目的地
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索目的地或位置..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>名称</TableHead>
                  <TableHead>位置</TableHead>
                  <TableHead>类型</TableHead>
                  <TableHead>状态</TableHead>
                  <TableHead className="text-right">操作</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDestinations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      {searchTerm ? "未找到匹配的目的地" : "暂无目的地数据"}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDestinations.map((destination) => (
                    <DestinationRow
                      key={destination.id}
                      destination={destination}
                      onView={handleView}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {showForm && (
        <DestinationForm
          destination={editingDestination}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      )}

      {showDetail && selectedDestination && (
        <DestinationDetail
          destination={selectedDestination}
          onClose={handleDetailClose}
        />
      )}
    </div>
  );
}
