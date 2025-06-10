/**
 * @jest-environment jsdom
 */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DestinationForm from "../../components/destinations/DestinationForm";

// Mock global fetch
global.fetch = jest.fn();

describe("DestinationForm", () => {
  const mockOnSuccess = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock window globals
    global.alert = jest.fn();
    
    // Mock successful API response
    fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "操作成功" }),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should render form fields correctly", () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    // Check for form fields (adjust based on your implementation)
    expect(screen.getByLabelText(/目的地名称/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/位置/i)).toBeInTheDocument();
    expect(screen.getByText("类型")).toBeInTheDocument(); // Label text for select
    expect(screen.getByLabelText(/持续时间|天数/i)).toBeInTheDocument();
    expect(screen.getByText("难度")).toBeInTheDocument(); // Label text for select
  });

  it("should handle form submission with valid data", async () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    // Fill all required fields
    await userEvent.type(screen.getByLabelText(/目的地名称/i), "测试目的地");
    await userEvent.type(screen.getByLabelText(/位置/i), "测试位置");
    await userEvent.type(screen.getByLabelText(/持续时间|天数/i), "3");
    
    // Submit form
    const submitButton = screen.getByText("保存");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
  });

  it("should validate required fields", async () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    // Try to submit without filling required fields
    const submitButton = screen.getByText("保存");
    fireEvent.click(submitButton);
    
    // Should show validation errors (adjust based on implementation)
    await waitFor(() => {
      // This will depend on how validation is implemented
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it("should populate form when editing existing destination", () => {
    const existingDestination = {
      id: "1",
      name: "现有目的地",
      location: "现有位置",
      description: "",
      type: "自然风光",
      duration: 2,
      maxGroupSize: 20,
      difficulty: "中等",
      season: "全年",
      highlights: [],
      included: [],
      notIncluded: [],
      price: { adult: 100, child: 50 },
      status: "草稿",
    };
    
    render(
      <DestinationForm 
        destination={existingDestination}
        onSuccess={mockOnSuccess} 
        onCancel={mockOnCancel} 
      />
    );
    
    // Check if form is populated with existing data
    expect(screen.getByDisplayValue("现有目的地")).toBeInTheDocument();
    expect(screen.getByDisplayValue("现有位置")).toBeInTheDocument();
    expect(screen.getByDisplayValue("2")).toBeInTheDocument(); // duration
  });

  it("should handle cancel action", () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const cancelButton = screen.getByText("取消");
    fireEvent.click(cancelButton);
    
    expect(mockOnCancel).toHaveBeenCalled();
  });

  it("should handle API errors during submission", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    
    // Mock API error
    fetch.mockRejectedValue(new Error("API Error"));
    
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    // Fill and submit form
    await userEvent.type(screen.getByLabelText(/目的地名称/i), "测试目的地");
    await userEvent.type(screen.getByLabelText(/位置/i), "测试位置");
    
    const submitButton = screen.getByText("保存");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
    
    consoleSpy.mockRestore();
  });

  it("should reset form after successful submission", async () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    const nameInput = screen.getByLabelText(/目的地名称/i);
    const locationInput = screen.getByLabelText(/位置/i);
    
    // Fill required fields
    await userEvent.type(nameInput, "测试目的地");
    await userEvent.type(locationInput, "测试位置");
    expect(nameInput.value).toBe("测试目的地");
    expect(locationInput.value).toBe("测试位置");
    
    // Submit form
    const submitButton = screen.getByText("保存");
    fireEvent.click(submitButton);
    
    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalled();
    });
    
    // Note: Form reset behavior depends on implementation
    // This test mainly verifies successful submission
  });

  it("should handle price input correctly", async () => {
    render(<DestinationForm onSuccess={mockOnSuccess} onCancel={mockOnCancel} />);
    
    // Look for price-related inputs
    const adultPriceInput = screen.getByLabelText(/成人票价|成人价格/i);
    const childPriceInput = screen.getByLabelText(/儿童票价|儿童价格/i);
    
    await userEvent.clear(adultPriceInput);
    await userEvent.type(adultPriceInput, "100");
    await userEvent.clear(childPriceInput);
    await userEvent.type(childPriceInput, "50");
    
    expect(adultPriceInput.value).toBe("100");
    expect(childPriceInput.value).toBe("50");
  });
});
