/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DestinationForm from "@/components/destinations/DestinationForm";
import DestinationList from "@/components/destinations/DestinationList";

// Mock fetch globally
global.fetch = jest.fn();

// Mock window methods
Object.defineProperty(window, "alert", {
  value: jest.fn(),
  writable: true,
});

Object.defineProperty(window, "confirm", {
  value: jest.fn(),
  writable: true,
});

// Mock console.error
Object.defineProperty(console, "error", {
  value: jest.fn(),
  writable: true,
});

const setupMockFetch = (responses) => {
  let callCount = 0;
  fetch.mockImplementation(() => {
    const response = responses[callCount] || responses[responses.length - 1];
    callCount++;
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve(response),
    });
  });
};

describe("Destination Management Integration", () => {
  beforeEach(() => {
    fetch.mockClear();
    window.alert.mockClear();
    window.confirm.mockClear();
  });

  it("should create a new destination and update the list", async () => {
    // Mock API responses
    const initialDestinations = [
      {
        id: "1",
        name: "现有目的地",
        location: "现有地点",
        type: "自然风光",
        status: "已发布",
        price: { adult: 100, child: 50 },
      },
    ];

    const newDestination = {
      id: "2",
      name: "新目的地",
      location: "新地点",
      type: "历史文化",
      status: "草稿",
      price: { adult: 200, child: 100 },
    };

    const updatedDestinations = [...initialDestinations, newDestination];

    setupMockFetch([
      { success: true, data: initialDestinations }, // Initial load
      { success: true, data: newDestination }, // Create new destination
      { success: true, data: updatedDestinations }, // Updated list
    ]);

    const mockOnSuccess = jest.fn();

    // Render the form
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={jest.fn()} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText("目的地名称 *"), "新目的地");
    await userEvent.type(screen.getByLabelText("位置 *"), "新地点");
    await userEvent.type(screen.getByLabelText("描述"), "新描述");

    // Submit the form
    const submitButton = screen.getByText("保存");
    await userEvent.click(submitButton);

    // Wait for the API call to complete
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith("/api/destinations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "新目的地",
          location: "新地点",
          description: "新描述",
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
        }),
      });
    });

    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it("should handle form validation errors", async () => {
    render(<DestinationForm onSuccess={jest.fn()} onCancel={jest.fn()} />);

    // Try to submit without filling required fields
    const submitButton = screen.getByText("保存");
    await userEvent.click(submitButton);

    // Should not call the API
    expect(fetch).not.toHaveBeenCalled();
  });

  it("should handle API errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    render(<DestinationForm onSuccess={jest.fn()} onCancel={jest.fn()} />);

    // Fill out the form
    await userEvent.type(screen.getByLabelText("目的地名称 *"), "测试目的地");
    await userEvent.type(screen.getByLabelText("位置 *"), "测试地点");
    await userEvent.type(screen.getByLabelText("描述"), "测试描述");

    // Submit the form
    const submitButton = screen.getByText("保存");
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith("操作失败");
    });
  });

  it("should filter destinations by search term", async () => {
    const mockDestinations = [
      {
        id: "1",
        name: "北京故宫",
        location: "北京",
        type: "历史文化",
        status: "已发布",
        price: { adult: 60, child: 30 },
      },
      {
        id: "2",
        name: "上海外滩",
        location: "上海",
        type: "城市风光",
        status: "已发布",
        price: { adult: 0, child: 0 },
      },
    ];

    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ success: true, data: mockDestinations }),
    });

    render(<DestinationList />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
      expect(screen.getByText("上海外滩")).toBeInTheDocument();
    });

    // Search for Beijing
    const searchInput = screen.getByPlaceholderText("搜索目的地或位置...");
    await userEvent.type(searchInput, "北京");

    // Should only show Beijing destination
    expect(screen.getByText("北京故宫")).toBeInTheDocument();
    expect(screen.queryByText("上海外滩")).not.toBeInTheDocument();
  });

  it("should handle destination deletion workflow", async () => {
    window.confirm.mockReturnValue(true);

    const mockDestinations = [
      {
        id: "1",
        name: "要删除的目的地",
        location: "测试地点",
        type: "自然风光",
        status: "草稿",
        price: { adult: 100, child: 50 },
      },
    ];

    setupMockFetch([
      { success: true, data: mockDestinations }, // Initial load
      { success: true }, // Delete response
    ]);

    render(<DestinationList />);

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText("要删除的目的地")).toBeInTheDocument();
    });

    // Click delete button (find the red colored button)
    const allButtons = screen.getAllByRole("button");
    const deleteButton = allButtons.find((btn) =>
      btn.className.includes("text-red-600")
    );
    await userEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      '确定要删除目的地 "要删除的目的地" 吗？'
    );
  });
});
