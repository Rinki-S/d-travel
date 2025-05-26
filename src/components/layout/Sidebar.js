"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  MapPin,
  Package,
  FileText,
  CreditCard,
  Phone,
  Users,
  DollarSign,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar.jsx";

const navigation = [
  { name: "目的地管理", href: "/destinations", icon: MapPin },
  { name: "产品管理", href: "/products", icon: Package },
  { name: "申请管理", href: "/applications", icon: FileText },
  { name: "支付管理", href: "/payments", icon: CreditCard },
  { name: "催款管理", href: "/collections", icon: Phone },
  { name: "用户管理", href: "/users", icon: Users },
  { name: "财务管理", href: "/finance", icon: DollarSign },
  { name: "系统设置", href: "/settings", icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="px-4 py-2">
          <h1 className="text-lg font-semibold">旅游管理系统</h1>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>主要功能</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
