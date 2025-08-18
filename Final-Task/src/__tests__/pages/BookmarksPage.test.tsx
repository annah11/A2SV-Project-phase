import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BookmarksPage from "@/app/bookmarks/page";
import { useSession } from "next-auth/react";

jest.mock("@/components/OpportunityCard", () => ({
  __esModule: true,
  default: ({ data }: { data: any }) => (
    <div data-testid={`opportunity-${data.id}`}>
      <h3>{data.title}</h3>
      <p>{data.location}</p>
    </div>
  ),
}));

jest.mock("@/lib/api/bookmarks", () => ({
  getBookmarksRaw: jest.fn(),
  normalizeBookmark: jest.fn((item) => item),
}));

jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props: any) => {
      return React.createElement("img", props);
    },
  };
});

const mockBookmarks = [
  { id: "bookmark-1", title: "Software Engineer", location: ["Addis Ababa"], description: "Test desc" },
  { id: "bookmark-2", title: "Data Analyst", location: ["Nairobi"], description: "Another desc" },
];

describe("BookmarksPage Component", () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;
  const { getBookmarksRaw } = require("@/lib/api/bookmarks");

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
      update: jest.fn(),
    });
  });

  it("shows loading state initially", () => {
    mockUseSession.mockReturnValue({
      data: {
        user: { name: "Test User" },
        accessToken: "mockAccessToken",
        refreshToken: "mockRefreshToken",
        expires: "2099-12-31T23:59:59.999Z",
      },
      status: "authenticated",
      update: jest.fn(),
    });
    getBookmarksRaw.mockImplementation(() => new Promise(() => {})); // Never resolves

    render(<BookmarksPage />);
    expect(screen.getByText("Loading bookmarks...")).toBeInTheDocument();
  });

  it("shows sign in message when user is not authenticated", () => {
    render(<BookmarksPage />);
    expect(screen.getByText("Please sign in to view bookmarks.")).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("shows bookmarks when user is authenticated and has bookmarks", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockResolvedValue({
      list: mockBookmarks,
      status: 200,
      data: {},
    });

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("My Bookmarked Opportunities")).toBeInTheDocument();
      expect(screen.getByText("You have 2 bookmarked jobs")).toBeInTheDocument();
      expect(screen.getByTestId("opportunity-bookmark-1")).toBeInTheDocument();
      expect(screen.getByTestId("opportunity-bookmark-2")).toBeInTheDocument();
    });
  });

  it("shows no bookmarks message when user has no bookmarks", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockResolvedValue({
      list: [],
      status: 200,
      data: {},
    });

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("No bookmarks found. Try bookmarking some opportunities first!")).toBeInTheDocument();
      expect(screen.getByText("Browse Opportunities")).toBeInTheDocument();
      expect(screen.getByText("Back to Home")).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockRejectedValue(new Error("Failed to fetch bookmarks. Please try again."));

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch bookmarks. Please try again.")).toBeInTheDocument();
    });
  });

  it("handles unauthorized error", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockRejectedValue(new Error("Please sign in to view bookmarks."));

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("Please sign in to view bookmarks.")).toBeInTheDocument();
    });
  });

  it("handles network error", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockRejectedValue(new Error("Failed to fetch bookmarks. Please try again."));

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("Failed to fetch bookmarks. Please try again.")).toBeInTheDocument();
    });
  });

  it("renders back to home button when authenticated", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockResolvedValue({
      list: [],
      status: 200,
      data: {},
    });

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("Back to Home")).toBeInTheDocument();
    });
  });

  it("renders bookmarks when present", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    getBookmarksRaw.mockResolvedValue({
      list: mockBookmarks,
      status: 200,
      data: {},
    });

    render(<BookmarksPage />);
    await waitFor(() => {
      expect(screen.getByText("My Bookmarked Opportunities")).toBeInTheDocument();
      expect(screen.getByText("You have 2 bookmarked jobs")).toBeInTheDocument();
      expect(screen.getByText("Software Engineer")).toBeInTheDocument();
      expect(screen.getByText("Data Analyst")).toBeInTheDocument();
    });
  });
});