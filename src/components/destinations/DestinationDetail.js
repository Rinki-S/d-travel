"use client";

import { X, MapPin, Clock, Users, Star } from "lucide-react";
import { Button } from "@/components/ui/button.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.jsx";

export default function DestinationDetail({ destination, onClose }) {
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

  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{destination.name}</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span className="text-lg">{destination.location}</span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span>{destination.duration}天</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span>最多{destination.maxGroupSize}人</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-gray-500" />
                  <span>{destination.difficulty}</span>
                </div>
              </div>

              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                    destination.status
                  )}`}
                >
                  {destination.status}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">价格信息</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>成人价格：</span>
                    <span className="font-medium text-lg text-green-600">
                      ¥{destination.price.adult}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>儿童价格：</span>
                    <span className="font-medium text-lg text-green-600">
                      ¥{destination.price.child}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">其他信息</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>类型：{destination.type}</div>
                  <div>适合季节：{destination.season}</div>
                  <div>创建时间：{destination.createdAt}</div>
                  <div>更新时间：{destination.updatedAt}</div>
                </div>
              </div>
            </div>
          </div>

          {/* 描述 */}
          {destination.description && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">目的地描述</h4>
              <p className="text-gray-700 leading-relaxed">
                {destination.description}
              </p>
            </div>
          )}

          {/* 亮点 */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">旅游亮点</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {destination.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 包含和不包含项目 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {destination.included && destination.included.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">包含项目</h4>
                <div className="space-y-2">
                  {destination.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {destination.notIncluded && destination.notIncluded.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3">不包含项目</h4>
                <div className="space-y-2">
                  {destination.notIncluded.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
