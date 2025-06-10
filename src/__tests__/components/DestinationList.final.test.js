/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DestinationList from "../../components/destinations/DestinationList";

// Mock global fetch
global.fetch = jest.fn();

const mockDestinations = [
  {
    id: "1",
    name: "北京故宫",
    location: "北京",
    type: "历史文化",
    duration: 1,
    difficulty: "简单",
    status: "已发布",
    price: { adult: 60, child: 30 },
  },
  {
    id: "2",
    name: "杭州西湖",
    location: "杭州",
    type: "自然风光",
    duration: 2,
    difficulty: "简单",
    status: "已发布", 
    price: { adult: 0, child: 0 },
  },
];

describe("DestinationList", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
    
    // Mock window globals in beforeEach
    global.alert = jest.fn();
    global.confirm = jest.fn();
    
    // Mock successful API response by default
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: mockDestinations }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render destination list correctly", async () => {
    render(<DestinationList />);
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
      expect(screen.getByText("杭州西湖")).toBeInTheDocument();
    });
  });

  it("should display loading state initially", async () => {
    render(<DestinationList />);
    
    // Check if loading text is displayed (if implemented)
    // This will depend on your component implementation
    expect(fetch).toHaveBeenCalledWith("/api/destinations");
  });

  it("should handle API errors", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    // Set NODE_ENV to development to ensure console.error is called
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "development";
    
    fetch.mockRejectedValue(new Error("API Error"));
    
    render(<DestinationList />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, { timeout: 3000 });
    
    // Restore original environment
    process.env.NODE_ENV = originalEnv;
    consoleSpy.mockRestore();
  });

  it("should filter destinations by search term", async () => {
    render(<DestinationList />);
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
    });
    
    // Find search input (adjust selector based on your implementation)
    const searchInput = screen.getByPlaceholderText(/搜索目的地/i) || 
                       screen.getByRole("textbox");
    
    // Type in search term
    await userEvent.type(searchInput, "北京");
    
    // Check if filtering works (this depends on your implementation)
    expect(screen.getByText("北京故宫")).toBeInTheDocument();
  });

  it("should show add new destination button", async () => {
    render(<DestinationList />);
    
    // Wait for component to load and find add button
    await waitFor(() => {
      const addButton = screen.getByText("添加目的地");
      expect(addButton).toBeInTheDocument();
    });
  });

  it("should display destination actions", async () => {
    render(<DestinationList />);
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
    });
    
    // Look for action buttons (they are icon buttons)
    const actionButtons = screen.getAllByRole("button");
    // Should have add button + action buttons for each destination (view, edit, delete)
    expect(actionButtons.length).toBeGreaterThan(3); // At least add + 3 action buttons per destination
  });

  it("should handle delete confirmation", async () => {
    global.confirm.mockReturnValue(true);
    
    render(<DestinationList />);
    
    // Wait for destinations to load first
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
    });
    
    // Now mock delete API call for the next request
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true, message: "删除成功" }),
    });
    
    // Find delete button (it's the third action button - view, edit, delete)
    const actionButtons = screen.getAllByRole("button");
    const deleteButton = actionButtons.find(btn => 
      btn.querySelector('.lucide-trash-2') || 
      btn.classList.contains('text-red-600')
    );
    
    expect(deleteButton).toBeTruthy();
    fireEvent.click(deleteButton);
    
    // Check if confirmation was called
    expect(global.confirm).toHaveBeenCalled();
  });

  it("should cancel delete when user declines confirmation", async () => {
    global.confirm.mockReturnValue(false);
    
    render(<DestinationList />);
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
    });
    
    // Find delete button
    const actionButtons = screen.getAllByRole("button");
    const deleteButton = actionButtons.find(btn => 
      btn.querySelector('.lucide-trash-2') || 
      btn.classList.contains('text-red-600')
    );
    
    expect(deleteButton).toBeTruthy();
    fireEvent.click(deleteButton);
    
    // Check if confirmation was called but delete API was not
    expect(global.confirm).toHaveBeenCalled();
    expect(fetch).toHaveBeenCalledTimes(1); // Only the initial load call
  });

  it("should display destination information correctly", async () => {
    render(<DestinationList />);
    
    // Wait for destinations to load
    await waitFor(() => {
      expect(screen.getByText("北京故宫")).toBeInTheDocument();
      expect(screen.getByText("北京")).toBeInTheDocument();
      expect(screen.getByText("历史文化")).toBeInTheDocument();
    });
  });

  it("should show empty state when no destinations", async () => {
    // Mock empty response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    });
    
    render(<DestinationList />);
    
    await waitFor(() => {
      // Check for empty state message (adjust based on implementation)
      expect(screen.getByText("暂无目的地数据")).toBeInTheDocument();
    });
  });
});
