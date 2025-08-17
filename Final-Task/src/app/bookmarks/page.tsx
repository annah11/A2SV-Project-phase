"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import OpportunityCard from "@/components/OpportunityCard";
import { getBookmarksRaw, normalizeBookmark } from "@/lib/api/bookmarks";

export default function BookmarksPage() {
  const { data: session, status } = useSession();
  const [bookmarks, setBookmarks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== "authenticated") return;
    let cancelled = false;

    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { list, data } = await getBookmarksRaw();
        if (cancelled) return;
        const normalized = list.map(normalizeBookmark).filter((b) => b.id);
        setBookmarks(normalized);
        if (normalized.length === 0) {
          setError(
            "No bookmarks found. Try bookmarking some opportunities first!"
          );
        }
      } catch (e: any) {
        if (cancelled) return;
        if (e.message === "AUTH_401") {
          setError("Please sign in to view bookmarks.");
        } else if (e.message.startsWith("UPSTREAM_")) {
          setError("Failed to fetch bookmarks. Server error.");
        } else if (e.message.startsWith("Network error")) {
          setError("Network error while fetching bookmarks.");
        } else {
          setError("Failed to fetch bookmarks. Please try again.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [status]);

  if (status === "loading" || loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-800"></div>
          <span className="mt-4 text-lg text-gray-600">
            Loading bookmarks...
          </span>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-4">
          My Bookmarks
        </h1>
        <p className="text-gray-600 mb-6">Please sign in to view bookmarks.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/api/auth/signin"
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition text-base sm:text-lg"
          >
            Sign In
          </a>
          <Link
            href="/opportunities"
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-xl transition text-base sm:text-lg"
          >
            Browse Opportunities
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-2 sm:px-4 md:px-6 py-4">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
        <div className="w-full sm:w-auto text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 mb-2">
            My Bookmarked Opportunities
          </h1>
          {bookmarks.length > 0 && (
            <p className="text-gray-600 text-base">
              You have <span className="font-semibold">{bookmarks.length}</span>{" "}
              bookmarked job{bookmarks.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition text-base sm:text-lg w-full sm:w-auto justify-center"
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
          {error.includes("No bookmarks") && (
            <a
              href="/opportunities"
              className="inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition w-full sm:w-auto"
            >
              Browse Opportunities
            </a>
          )}
        </div>
      )}

      {!error && bookmarks.length > 0 && (
        <div className="max-w-3xl mx-auto px-2 sm:px-4 md:px-0">
          <div className="grid gap-6 grid-cols-1">
            {bookmarks.map((b) => (
              <OpportunityCard key={b.id} data={b} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
