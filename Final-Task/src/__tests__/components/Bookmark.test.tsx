import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Bookmark from "@/components/Bookmark/Bookmarks";
import { useSession } from "next-auth/react";

jest.mock("@/app/api/actions/toggleBookmark.ts", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockToggleBookmark = require("@/app/api/actions/toggleBookmark.ts").default;

describe("Bookmark Component", () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

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

  it("shows sign in for unauthenticated user", async () => {
    render(<Bookmark id="test-id" bookmarked={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it("calls toggleBookmark and shows success", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" }, accessToken: "tok" },
      status: "authenticated",
    });
    mockToggleBookmark.mockResolvedValue({ status: "added" });

    render(<Bookmark id="test-id" bookmarked={false} />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(mockToggleBookmark).toHaveBeenCalledWith("test-id", false, "tok");
      expect(screen.getByText(/bookmark updated/i)).toBeInTheDocument();
    });
  });

  it("shows error feedback on failure", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" }, accessToken: "tok" },
      status: "authenticated",
    });
    mockToggleBookmark.mockRejectedValue(new Error("Network error"));

    render(<Bookmark id="test-id" bookmarked={false} />);
    fireEvent.click(screen.getByRole("button"));

    await waitFor(() => {
      expect(screen.getByText(/failed to update bookmark/i)).toBeInTheDocument();
    });
  });

  it("disables button during loading", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" }, accessToken: "tok" },
      status: "authenticated",
    });
    mockToggleBookmark.mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 100))
    );

    render(<Bookmark id="test-id" bookmarked={false} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(button).toBeDisabled();
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
