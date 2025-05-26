"use client";

import { useState, useEffect } from "react";
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
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
import DestinationForm from "./DestinationForm";
import DestinationDetail from "./DestinationDetail";

export default function DestinationList() {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [editingDestination, setEditingDestination] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, []);

  useEffect(() => {
    const filtered = destinations.filter(
      (dest) =>
        dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDestinations(filtered);
  }, [destinations, searchTerm]);

  const fetchDestinations = async () => {
    try {
      const response = await fetch("/api/destinations");
      const result = await response.json();
      if (result.success) {
        setDestinations(result.data);
      }
    } catch (error) {
      console.error("获取目的地失败:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingDestination(null);
    setShowForm(true);
  };

  const handleEdit = (destination) => {
    setEditingDestination(destination);
    setShowForm(true);
  };

  const handleView = (destination) => {
    setSelectedDestination(destination);
    setShowDetail(true);
  };

  const handleDelete = async (id) => {
    if (!confirm("确定要删除这个目的地吗？")) return;

    try {
      const response = await fetch(`/api/destinations/${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (result.success) {
        fetchDestinations();
      }
    } catch (error) {
      console.error("删除目的地失败:", error);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingDestination(null);
    fetchDestinations();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "已发布":
        return "text-green-600 bg-green-100";
      case "草稿":
        return "text-yellow-600 bg-yellow-100";
      case "已下架":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (loading) {
    return <div>加载中...</div>;
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>目的地管理</CardTitle>
              <CardDescription>管理旅游目的地信息</CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              新增目的地
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索目的地名称或位置..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>位置</TableHead>
                <TableHead>类型</TableHead>
                <TableHead>天数</TableHead>
                <TableHead>价格</TableHead>
                <TableHead>状态</TableHead>
                <TableHead>更新时间</TableHead>
                <TableHead>操作</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDestinations.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell className="font-medium">
                    {destination.name}
                  </TableCell>
                  <TableCell>{destination.location}</TableCell>
                  <TableCell>{destination.type}</TableCell>
                  <TableCell>{destination.duration}天</TableCell>
                  <TableCell>¥{destination.price.adult}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        destination.status
                      )}`}
                    >
                      {destination.status}
                    </span>
                  </TableCell>
                  <TableCell>{destination.updatedAt}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(destination)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(destination)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(destination.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredDestinations.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              {searchTerm ? "未找到匹配的目的地" : "暂无目的地数据"}
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <DestinationForm
          destination={editingDestination}
          onSuccess={handleFormSuccess}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showDetail && selectedDestination && (
        <DestinationDetail
          destination={selectedDestination}
          onClose={() => setShowDetail(false)}
          onEdit={() => {
            setShowDetail(false);
            handleEdit(selectedDestination);
          }}
        />
      )}
    </div>
  );
}
