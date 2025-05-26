"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";
import { X, Save } from "lucide-react";

export default function DestinationForm({ destination, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    type: "自然风光",
    duration: 1,
    maxGroupSize: 20,
    difficulty: "简单",
    season: "全年",
    highlights: [],
    included: [],
    notIncluded: [],
    price: { adult: 0, child: 0 },
    status: "草稿",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (destination) {
      setFormData(destination);
    }
  }, [destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = destination
        ? `/api/destinations/${destination.id}`
        : "/api/destinations";
      const method = destination ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        onSuccess();
      } else {
        alert(result.error || "操作失败");
      }
    } catch (error) {
      console.error("提交失败:", error);
      alert("操作失败");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePriceChange = (type, value) => {
    setFormData((prev) => ({
      ...prev,
      price: { ...prev.price, [type]: Number(value) },
    }));
  };

  const handleArrayChange = (field, value) => {
    const array = value.split("\n").filter((item) => item.trim());
    setFormData((prev) => ({ ...prev, [field]: array }));
  };

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>{destination ? "编辑目的地" : "新增目的地"}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">目的地名称 *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">位置 *</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>类型</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) => handleInputChange("type", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="自然风光">自然风光</SelectItem>
                    <SelectItem value="文化古迹">文化古迹</SelectItem>
                    <SelectItem value="主题乐园">主题乐园</SelectItem>
                    <SelectItem value="海滨度假">海滨度假</SelectItem>
                    <SelectItem value="山地探险">山地探险</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">天数</Label>
                <Input
                  id="duration"
                  type="number"
                  min="1"
                  value={formData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", Number(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="maxGroupSize">最大团队规模</Label>
                <Input
                  id="maxGroupSize"
                  type="number"
                  min="1"
                  value={formData.maxGroupSize}
                  onChange={(e) =>
                    handleInputChange("maxGroupSize", Number(e.target.value))
                  }
                />
              </div>
              <div className="space-y-2">
                <Label>难度</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) =>
                    handleInputChange("difficulty", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="简单">简单</SelectItem>
                    <SelectItem value="中等">中等</SelectItem>
                    <SelectItem value="困难">困难</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>适合季节</Label>
              <Select
                value={formData.season}
                onValueChange={(value) => handleInputChange("season", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="全年">全年</SelectItem>
                  <SelectItem value="春季">春季</SelectItem>
                  <SelectItem value="夏季">夏季</SelectItem>
                  <SelectItem value="秋季">秋季</SelectItem>
                  <SelectItem value="冬季">冬季</SelectItem>
                  <SelectItem value="春秋">春秋</SelectItem>
                  <SelectItem value="春夏秋">春夏秋</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adult-price">成人价格 (元)</Label>
                <Input
                  id="adult-price"
                  type="number"
                  min="0"
                  value={formData.price.adult}
                  onChange={(e) => handlePriceChange("adult", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="child-price">儿童价格 (元)</Label>
                <Input
                  id="child-price"
                  type="number"
                  min="0"
                  value={formData.price.child}
                  onChange={(e) => handlePriceChange("child", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="highlights">亮点 (每行一个)</Label>
              <Textarea
                id="highlights"
                rows={3}
                value={formData.highlights.join("\n")}
                onChange={(e) =>
                  handleArrayChange("highlights", e.target.value)
                }
                placeholder="景点1&#10;景点2&#10;景点3"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="included">包含项目 (每行一个)</Label>
                <Textarea
                  id="included"
                  rows={3}
                  value={formData.included.join("\n")}
                  onChange={(e) =>
                    handleArrayChange("included", e.target.value)
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notIncluded">不包含项目 (每行一个)</Label>
                <Textarea
                  id="notIncluded"
                  rows={3}
                  value={formData.notIncluded.join("\n")}
                  onChange={(e) =>
                    handleArrayChange("notIncluded", e.target.value)
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>状态</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="草稿">草稿</SelectItem>
                  <SelectItem value="已发布">已发布</SelectItem>
                  <SelectItem value="已下架">已下架</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-4">
              <Button type="button" variant="outline" onClick={onCancel}>
                取消
              </Button>
              <Button type="submit" disabled={loading}>
                <Save className="mr-2 h-4 w-4" />
                {loading ? "保存中..." : "保存"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
