import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookmark from "@/components/Bookmark/Bookmarks";
import { useSession } from "next-auth/react";

// Mock the toggleBookmark function
jest.mock("@/app/api/actions/toggleBookmark.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockToggleBookmark =
  require("@/app/api/actions/toggleBookmark.ts").default;

describe("Bookmark Component", () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
  const mockRouter = {
    refresh: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
  });

  it("renders bookmark button correctly", () => {
    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toBeInTheDocument();
    expect(bookmarkButton).toHaveAttribute("data-id", "bookmark-btn");
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "false");
  });

  it("shows unbookmarked state when bookmarked is false", () => {
    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "false");
  });

  it("shows bookmarked state when bookmarked is true", () => {
    render(<Bookmark id="test-id" bookmarked={true} />);

    const bookmarkButton = screen.getByRole("button");
    expect(bookmarkButton).toHaveAttribute("data-bookmarked", "true");
  });

  it("shows alert when user is not authenticated", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    expect(alertSpy).toHaveBeenCalledWith(
      "Please sign in to bookmark opportunities"
    );
    alertSpy.mockRestore();
  });

  it("calls toggleBookmark when user is authenticated", async () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockToggleBookmark.mockResolvedValue({ success: true });

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    await waitFor(() => {
      expect(mockToggleBookmark).toHaveBeenCalledWith("test-id", false);
    });
  });

  it("handles successful bookmark toggle", async () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockToggleBookmark.mockResolvedValue({ success: true });

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    await waitFor(() => {
      expect(mockToggleBookmark).toHaveBeenCalledWith("test-id", false);
    });
  });

  it("handles failed bookmark toggle", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockToggleBookmark.mockResolvedValue(null);

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Failed to update bookmark. Please try again."
      );
    });
    alertSpy.mockRestore();
  });

  it("handles toggle error", async () => {
    const user = userEvent.setup();
    const alertSpy = jest.spyOn(window, "alert").mockImplementation(() => {});
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockToggleBookmark.mockRejectedValue(new Error("Network error"));

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith(
        "Failed to update bookmark. Please try again."
      );
    });
    alertSpy.mockRestore();
  });

  it("disables button during loading state", async () => {
    const user = userEvent.setup();
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockToggleBookmark.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<Bookmark id="test-id" bookmarked={false} />);

    const bookmarkButton = screen.getByRole("button");
    await user.click(bookmarkButton);

    expect(bookmarkButton).toHaveClass("opacity-50");
    expect(bookmarkButton).toHaveClass("cursor-not-allowed");
  });
});
