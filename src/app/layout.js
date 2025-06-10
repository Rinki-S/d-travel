import "./globals.css";

export const metadata = {
  title: "旅游信息管理系统",
  description: "基于 Next.js 的旅游信息管理系统",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
