"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import OpportunityCard from "@/components/OpportunityCard";
import { JobPost } from "@/type/type";
import Link from "next/link";

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<JobPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;

    const fetchBookmarks = async () => {
      try {
        setError(null);
        const res = await fetch("/api/bookmarks");

        if (!res.ok) {
          if (res.status === 401) {
            setError("Please sign in to view bookmarks");
          } else {
            setError("Failed to fetch bookmarks. Please try again.");
          }
          return;
        }

        const data = await res.json();

        // Handle different possible response structures
        let bookmarkData: JobPost[] = [];

        if (Array.isArray(data)) {
          bookmarkData = data;
        } else if (data && typeof data === "object") {
          // Check if data has a nested array (common API pattern)
          if (data.data && Array.isArray(data.data)) {
            bookmarkData = data.data;
          } else if (data.bookmarks && Array.isArray(data.bookmarks)) {
            bookmarkData = data.bookmarks;
          } else if (data.items && Array.isArray(data.items)) {
            bookmarkData = data.items;
          } else {
            // Try to find any array in the response
            for (const key in data) {
              if (Array.isArray(data[key])) {
                bookmarkData = data[key];
                break;
              }
            }
          }
        }

        setBookmarks(bookmarkData);

        if (bookmarkData.length === 0) {
          setError(
            "No bookmarks found. Try bookmarking some opportunities first!"
          );
        }
      } catch (error) {
        console.error("Error fetching bookmarks:", error);
        setError("Failed to fetch bookmarks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-800"></div>
          <span className="ml-3 text-gray-600">Loading bookmarks...</span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center py-8">
          <h1 className="text-2xl font-bold text-indigo-900 mb-4">
            My Bookmarks
          </h1>
          <p className="text-red-500 mb-4">Please sign in to view bookmarks.</p>
          <div className="flex gap-3 justify-center">
            <a
              href="/api/auth/signin"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
            >
              Sign In
            </a>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with navigation */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-indigo-900">
            My Bookmarked Opportunities
          </h1>
          {bookmarks.length > 0 && (
            <p className="text-gray-600 mt-2">
              You have {bookmarks.length} bookmarked job
              {bookmarks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Home
        </Link>
      </div>

      {error && (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">{error}</p>
          {error.includes("No bookmarks found") && (
            <div className="flex gap-3 justify-center">
              <a
                href="/opportunities"
                className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
              >
                Browse Opportunities
              </a>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition"
              >
                Back to Home
              </Link>
            </div>
          )}
        </div>
      )}

      {!error && bookmarks.length > 0 && (
        <div className="grid gap-6 md:grid-cols-2">
          {bookmarks.map((bookmark) => (
            <OpportunityCard key={bookmark.id} data={bookmark} />
          ))}
        </div>
      )}
    </div>
  );
}
