// Test utilities for mocking and common test setups

export const mockDestination = {
  id: "mock-id-1",
  name: "测试目的地",
  location: "测试地点",
  description: "这是一个测试目的地的描述",
  type: "自然风光",
  duration: 3,
  maxGroupSize: 15,
  difficulty: "中等",
  season: "春季",
  highlights: ["美丽的风景", "丰富的文化", "特色美食"],
  included: ["住宿", "早餐", "导游服务"],
  notIncluded: ["午餐", "晚餐", "个人消费"],
  price: { adult: 1200, child: 800 },
  images: ["/images/test1.jpg", "/images/test2.jpg"],
  status: "已发布",
  createdAt: "2024-01-01T00:00:00.000Z",
  updatedAt: "2024-01-01T00:00:00.000Z",
};

export const mockDestinations = [
  mockDestination,
  {
    id: "mock-id-2",
    name: "另一个测试目的地",
    location: "另一个测试地点",
    description: "另一个测试目的地的描述",
    type: "历史文化",
    duration: 2,
    maxGroupSize: 20,
    difficulty: "简单",
    season: "全年",
    highlights: ["历史古迹", "文化体验"],
    included: ["门票", "讲解"],
    notIncluded: ["交通", "餐饮"],
    price: { adult: 800, child: 400 },
    images: ["/images/test3.jpg"],
    status: "草稿",
    createdAt: "2024-01-02T00:00:00.000Z",
    updatedAt: "2024-01-02T00:00:00.000Z",
  },
];

// Mock fetch response helper
export const mockFetchResponse = (data, ok = true, status = 200) => ({
  ok,
  status,
  json: () => Promise.resolve(data),
});

// Mock fetch implementation
export const setupMockFetch = (responses) => {
  if (Array.isArray(responses)) {
    let callCount = 0;
    global.fetch = jest.fn(() => {
      const response = responses[callCount] || responses[responses.length - 1];
      callCount++;
      return Promise.resolve(response);
    });
  } else {
    global.fetch = jest.fn(() => Promise.resolve(responses));
  }
};

// Common test cleanup
export const cleanupMocks = () => {
  if (global.fetch && typeof global.fetch.mockClear === "function") {
    global.fetch.mockClear();
  }
  jest.clearAllMocks();
};

// Mock console methods to avoid test output pollution
export const mockConsole = () => {
  const originalConsole = { ...console };
  beforeEach(() => {
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    // eslint-disable-next-line no-console
    console.log.mockRestore();
    // eslint-disable-next-line no-console
    console.warn.mockRestore();
    // eslint-disable-next-line no-console
    console.error.mockRestore();
  });

  return originalConsole;
};

// Mock browser APIs
export const mockBrowserAPIs = () => {
  // Mock window.alert
  Object.defineProperty(window, "alert", {
    writable: true,
    value: jest.fn(),
  });

  // Mock window.confirm
  Object.defineProperty(window, "confirm", {
    writable: true,
    value: jest.fn(() => true),
  });

  // Mock localStorage
  const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  };
  Object.defineProperty(window, "localStorage", {
    value: localStorageMock,
  });

  return {
    alert: window.alert,
    confirm: window.confirm,
    localStorage: localStorageMock,
  };
};

// Custom render function with providers (if needed in the future)
import { render } from "@testing-library/react";

export const renderWithProviders = (ui, options = {}) => {
  // This can be extended to include providers like theme, router, etc.
  return render(ui, options);
};
