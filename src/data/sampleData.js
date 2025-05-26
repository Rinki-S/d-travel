// 数据存储 - 使用 JSON 文件模拟数据库
export const destinations = [
  {
    id: "1",
    name: "北京故宫深度游",
    location: "北京",
    description: "探索紫禁城的历史文化，感受古代皇室生活",
    type: "文化古迹",
    duration: 3,
    maxGroupSize: 20,
    difficulty: "简单",
    season: "全年",
    highlights: ["故宫博物院", "天安门广场", "景山公园"],
    included: ["专业导游", "门票", "午餐"],
    notIncluded: ["住宿", "交通"],
    price: {
      adult: 680,
      child: 480,
    },
    images: ["/images/destinations/beijing-1.jpg"],
    status: "已发布",
    createdAt: "2024-01-15",
    updatedAt: "2024-03-10",
  },
  {
    id: "2",
    name: "桂林漓江风光",
    location: "桂林",
    description: "乘船游览漓江，欣赏桂林山水甲天下的绝美风光",
    type: "自然风光",
    duration: 4,
    maxGroupSize: 30,
    difficulty: "简单",
    season: "春秋",
    highlights: ["漓江竹筏", "阳朔西街", "印象刘三姐"],
    included: ["竹筏费用", "导游服务", "特色餐"],
    notIncluded: ["住宿", "往返交通"],
    price: {
      adult: 890,
      child: 650,
    },
    images: ["/images/destinations/guilin-1.jpg"],
    status: "已发布",
    createdAt: "2024-02-01",
    updatedAt: "2024-03-15",
  },
  {
    id: "3",
    name: "张家界森林公园",
    location: "湖南张家界",
    description: "体验阿凡达取景地的奇峰异石，感受大自然的鬼斧神工",
    type: "自然风光",
    duration: 5,
    maxGroupSize: 25,
    difficulty: "中等",
    season: "春夏秋",
    highlights: ["天门山玻璃栈道", "金鞭溪", "袁家界"],
    included: ["景区门票", "缆车费用", "专业导游"],
    notIncluded: ["住宿", "部分餐食"],
    price: {
      adult: 1280,
      child: 980,
    },
    images: ["/images/destinations/zhangjiajie-1.jpg"],
    status: "草稿",
    createdAt: "2024-03-01",
    updatedAt: "2024-03-20",
  },
];

// 其他示例数据
export const sampleTourProducts = [
  {
    id: "TP001",
    name: "北京经典三日游",
    destination: "北京",
    duration: 3,
    description: "游览故宫、天安门、长城等经典景点",
    status: "已发布",
    price: { adult: 1580, child: 1180 },
    schedules: [
      {
        id: "TS001",
        departureDate: "2024-06-01",
        maxCapacity: 30,
        currentBookings: 12,
      },
      {
        id: "TS002",
        departureDate: "2024-06-15",
        maxCapacity: 30,
        currentBookings: 8,
      },
    ],
  },
  {
    id: "TP002",
    name: "桂林阳朔四日游",
    destination: "桂林",
    duration: 4,
    description: "漓江风光+阳朔西街+十里画廊",
    status: "已发布",
    price: { adult: 2280, child: 1680 },
    schedules: [
      {
        id: "TS003",
        departureDate: "2024-05-20",
        maxCapacity: 25,
        currentBookings: 15,
      },
    ],
  },
];

export const sampleApplications = [
  {
    id: "APP001",
    scheduleId: "TS001",
    applicantName: "张三",
    contactPhone: "13888888888",
    contactEmail: "zhangsan@email.com",
    status: "已确认",
    totalAmount: 4740,
    depositAmount: 1000,
    balanceAmount: 3740,
    participants: [
      { name: "张三", idNumber: "110101199001011234", type: "成人" },
      { name: "李四", idNumber: "110101199002021234", type: "成人" },
      { name: "张小明", idNumber: "110101201001011234", type: "儿童" },
    ],
    applicationDate: "2024-04-15",
  },
];

export const samplePayments = [
  {
    id: "PAY001",
    applicationId: "APP001",
    paymentType: "订金",
    amount: 1000,
    paymentMethod: "微信支付",
    status: "已完成",
    paymentDate: "2024-04-15",
  },
];
