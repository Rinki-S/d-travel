import { getAllDestinations, createDestination } from "@/lib/db";

// Mock the database functions
jest.mock("@/lib/db", () => ({
  getAllDestinations: jest.fn(),
  createDestination: jest.fn(),
}));

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
    })),
  },
}));

describe("/api/destinations", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Database operations", () => {
    it("should call getAllDestinations function", () => {
      const mockDestinations = [
        {
          id: "1",
          name: "测试目的地1",
          location: "测试地点1",
          status: "已发布",
        },
      ];

      getAllDestinations.mockReturnValue(mockDestinations);
      const result = getAllDestinations();

      expect(getAllDestinations).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockDestinations);
    });

    it("should call createDestination function", () => {
      const newDestination = {
        name: "新目的地",
        location: "新地点",
        description: "新描述",
        type: "自然风光",
        status: "草稿",
      };

      const createdDestination = {
        id: "3",
        ...newDestination,
        createdAt: new Date().toISOString(),
      };

      createDestination.mockReturnValue(createdDestination);
      const result = createDestination(newDestination);

      expect(createDestination).toHaveBeenCalledWith(newDestination);
      expect(result).toEqual(createdDestination);
    });

    it("should handle creation failure", () => {
      const newDestination = {
        name: "新目的地",
        location: "新地点",
      };

      createDestination.mockReturnValue(null);
      const result = createDestination(newDestination);

      expect(result).toBeNull();
    });

    it("should handle database errors", () => {
      getAllDestinations.mockImplementation(() => {
        throw new Error("Database error");
      });

      expect(() => getAllDestinations()).toThrow("Database error");
    });
  });
});
