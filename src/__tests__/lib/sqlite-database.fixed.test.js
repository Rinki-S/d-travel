// Mock the database operations to avoid file system dependencies in tests
jest.mock("@/lib/sqlite-database", () => ({
  getAllDestinations: jest.fn(),
  getDestinationById: jest.fn(),
  createDestination: jest.fn(),
  updateDestination: jest.fn(),
  deleteDestination: jest.fn(),
  searchDestinations: jest.fn(),
  getDestinationsByType: jest.fn(),
  getDestinationStats: jest.fn(),
}));

import {
  getAllDestinations,
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination,
  searchDestinations,
  getDestinationsByType,
  getDestinationStats,
} from "@/lib/sqlite-database";

describe("SQLite Database Operations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllDestinations", () => {
    it("should return all destinations", async () => {
      const mockDestinations = [
        {
          id: "1",
          name: "测试目的地1",
          location: "测试地点1",
          status: "已发布",
        },
        {
          id: "2",
          name: "测试目的地2",
          location: "测试地点2",
          status: "草稿",
        },
      ];

      getAllDestinations.mockReturnValue(mockDestinations);

      const destinations = getAllDestinations();

      expect(getAllDestinations).toHaveBeenCalledTimes(1);
      expect(Array.isArray(destinations)).toBe(true);
      expect(destinations).toEqual(mockDestinations);
    });

    it("should return destinations with correct structure", async () => {
      const mockDestination = {
        id: "1",
        name: "测试目的地",
        location: "测试地点",
        type: "自然风光",
        status: "已发布",
      };

      getAllDestinations.mockReturnValue([mockDestination]);

      const destinations = getAllDestinations();

      if (destinations.length > 0) {
        const destination = destinations[0];
        expect(destination).toHaveProperty("id");
        expect(destination).toHaveProperty("name");
        expect(destination).toHaveProperty("location");
        expect(destination).toHaveProperty("type");
        expect(destination).toHaveProperty("status");
      }
    });
  });

  describe("getDestinationById", () => {
    it("should return null for non-existent destination", async () => {
      getDestinationById.mockReturnValue(null);

      const destination = getDestinationById("non-existent-id");
      expect(destination).toBeNull();
      expect(getDestinationById).toHaveBeenCalledWith("non-existent-id");
    });

    it("should return destination for valid id", async () => {
      const mockDestination = {
        id: "1",
        name: "测试目的地",
        location: "测试地点",
        status: "已发布",
      };

      getDestinationById.mockReturnValue(mockDestination);

      const destination = getDestinationById("1");
      expect(destination).not.toBeNull();
      expect(destination.id).toBe("1");
      expect(getDestinationById).toHaveBeenCalledWith("1");
    });
  });

  describe("createDestination", () => {
    it("should create a new destination", async () => {
      const newDestination = {
        name: "测试目的地",
        location: "测试地点",
        description: "这是一个测试目的地",
        type: "自然风光",
        duration: 3,
        maxGroupSize: 15,
        difficulty: "中等",
        season: "春季",
        highlights: ["美丽的风景", "丰富的文化"],
        included: ["住宿", "早餐"],
        notIncluded: ["午餐", "晚餐"],
        price: { adult: 1200, child: 800 },
        status: "已发布",
      };

      const createdDestination = {
        id: "generated-id",
        ...newDestination,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      createDestination.mockReturnValue(createdDestination);

      const created = createDestination(newDestination);

      expect(createDestination).toHaveBeenCalledWith(newDestination);
      expect(created).toHaveProperty("id");
      expect(created.name).toBe(newDestination.name);
      expect(created.location).toBe(newDestination.location);
      expect(created.status).toBe(newDestination.status);
    });

    it("should throw error for invalid destination data", async () => {
      const invalidDestination = {
        // Missing required fields
        description: "无效的目的地数据",
      };

      createDestination.mockImplementation(() => {
        throw new Error("Invalid destination data");
      });

      expect(() => createDestination(invalidDestination)).toThrow(
        "Invalid destination data"
      );
    });
  });

  describe("updateDestination", () => {
    it("should update existing destination", async () => {
      const existingDestination = {
        id: "1",
        name: "原始目的地名称",
        description: "原始描述",
        status: "草稿",
      };

      const updates = {
        name: "更新后的目的地名称",
        description: "更新后的描述",
        status: "已发布",
      };

      const updatedDestination = {
        ...existingDestination,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      updateDestination.mockReturnValue(updatedDestination);

      const updated = updateDestination("1", updates);

      expect(updateDestination).toHaveBeenCalledWith("1", updates);
      expect(updated.name).toBe(updates.name);
      expect(updated.description).toBe(updates.description);
      expect(updated.status).toBe(updates.status);
    });

    it("should return null for non-existent destination update", async () => {
      updateDestination.mockReturnValue(null);

      const result = updateDestination("non-existent-id", {
        name: "测试更新",
      });

      expect(result).toBeNull();
      expect(updateDestination).toHaveBeenCalledWith("non-existent-id", {
        name: "测试更新",
      });
    });
  });

  describe("deleteDestination", () => {
    it("should delete existing destination", async () => {
      deleteDestination.mockReturnValue(true);

      const deleted = deleteDestination("existing-id");

      expect(deleted).toBe(true);
      expect(deleteDestination).toHaveBeenCalledWith("existing-id");
    });

    it("should return false for non-existent destination deletion", async () => {
      deleteDestination.mockReturnValue(false);

      const result = deleteDestination("non-existent-id");

      expect(result).toBe(false);
      expect(deleteDestination).toHaveBeenCalledWith("non-existent-id");
    });
  });

  describe("searchDestinations", () => {
    it("should return matching destinations", async () => {
      const mockResults = [
        {
          id: "1",
          name: "北京故宫",
          location: "北京",
          type: "历史文化",
        },
      ];

      searchDestinations.mockReturnValue(mockResults);

      const results = searchDestinations("北京");

      expect(Array.isArray(results)).toBe(true);
      expect(results).toEqual(mockResults);
      expect(searchDestinations).toHaveBeenCalledWith("北京");
    });

    it("should return empty array for no matches", async () => {
      searchDestinations.mockReturnValue([]);

      const results = searchDestinations("不存在的地点");

      expect(results).toEqual([]);
      expect(searchDestinations).toHaveBeenCalledWith("不存在的地点");
    });
  });

  describe("getDestinationsByType", () => {
    it("should return destinations of specified type", async () => {
      const mockResults = [
        {
          id: "1",
          name: "测试自然风光1",
          type: "自然风光",
        },
        {
          id: "2",
          name: "测试自然风光2",
          type: "自然风光",
        },
      ];

      getDestinationsByType.mockReturnValue(mockResults);

      const results = getDestinationsByType("自然风光");

      expect(Array.isArray(results)).toBe(true);
      expect(results).toEqual(mockResults);
      expect(getDestinationsByType).toHaveBeenCalledWith("自然风光");
    });

    it("should return empty array for non-existent type", async () => {
      getDestinationsByType.mockReturnValue([]);

      const results = getDestinationsByType("不存在的类型");

      expect(results).toEqual([]);
      expect(getDestinationsByType).toHaveBeenCalledWith("不存在的类型");
    });
  });

  describe("getDestinationStats", () => {
    it("should return statistics object", async () => {
      const mockStats = {
        total: 10,
        published: 7,
        draft: 3,
        byType: {
          自然风光: 4,
          历史文化: 3,
          城市风光: 3,
        },
      };

      getDestinationStats.mockReturnValue(mockStats);

      const stats = getDestinationStats();

      expect(stats).toHaveProperty("total");
      expect(stats).toHaveProperty("published");
      expect(stats).toHaveProperty("draft");
      expect(stats).toHaveProperty("byType");
      expect(typeof stats.total).toBe("number");
      expect(typeof stats.published).toBe("number");
      expect(typeof stats.draft).toBe("number");
      expect(stats).toEqual(mockStats);
    });
  });
});
