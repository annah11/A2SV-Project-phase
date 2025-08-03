import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import BookmarksPage from "@/app/bookmarks/page";
import { useSession } from "next-auth/react";

// Mock the OpportunityCard component
jest.mock("@/components/OpportunityCard", () => {
  return function MockOpportunityCard({ data }: { data: any }) {
    return (
      <div data-testid={`opportunity-${data.id}`}>
        <h3>{data.title}</h3>
        <p>{data.location}</p>
      </div>
    );
  };
});

// Mock fetch
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe("BookmarksPage Component", () => {
  const mockUseSession = useSession as jest.MockedFunction<typeof useSession>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSession.mockReturnValue({
      data: null,
      status: "unauthenticated",
    });
  });

  it("shows loading state initially", () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });
    mockFetch.mockImplementation(
      () => new Promise(() => {}) // Never resolves to keep loading state
    );

    render(<BookmarksPage />);

    expect(screen.getByText("Loading bookmarks...")).toBeInTheDocument();
  });

  it("shows sign in message when user is not authenticated", () => {
    render(<BookmarksPage />);

    expect(
      screen.getByText("Please sign in to view bookmarks.")
    ).toBeInTheDocument();
    expect(screen.getByText("Sign In")).toBeInTheDocument();
    expect(screen.getByText("Back to Home")).toBeInTheDocument();
  });

  it("shows bookmarks when user is authenticated and has bookmarks", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    const mockBookmarks = {
      success: true,
      data: [
        {
          id: "bookmark-1",
          title: "Software Developer",
          location: "Addis Ababa",
          description: "Test description",
        },
        {
          id: "bookmark-2",
          title: "Data Analyst",
          location: "Nairobi",
          description: "Another test description",
        },
      ],
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockBookmarks,
    } as Response);

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("My Bookmarked Opportunities")
      ).toBeInTheDocument();
      expect(
        screen.getByText("You have 2 bookmarked jobs")
      ).toBeInTheDocument();
      expect(screen.getByTestId("opportunity-bookmark-1")).toBeInTheDocument();
      expect(screen.getByTestId("opportunity-bookmark-2")).toBeInTheDocument();
    });
  });

  it("shows no bookmarks message when user has no bookmarks", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "No bookmarks found. Try bookmarking some opportunities first!"
        )
      ).toBeInTheDocument();
      expect(screen.getByText("Browse Opportunities")).toBeInTheDocument();
      expect(screen.getByText("Back to Home")).toBeInTheDocument();
    });
  });

  it("handles API error gracefully", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    mockFetch.mockResolvedValue({
      ok: false,
      status: 500,
    } as Response);

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch bookmarks. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("handles unauthorized error", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
    } as Response);

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Please sign in to view bookmarks")
      ).toBeInTheDocument();
    });
  });

  it("handles network error", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    mockFetch.mockRejectedValue(new Error("Network error"));

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(
        screen.getByText("Failed to fetch bookmarks. Please try again.")
      ).toBeInTheDocument();
    });
  });

  it("renders back to home button when authenticated", async () => {
    mockUseSession.mockReturnValue({
      data: { user: { name: "Test User" } },
      status: "authenticated",
    });

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: [] }),
    } as Response);

    render(<BookmarksPage />);

    await waitFor(() => {
      expect(screen.getByText("Back to Home")).toBeInTheDocument();
    });
  });
});
