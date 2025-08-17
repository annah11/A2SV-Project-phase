"use client";
import toggleBookmark from "@/app/api/actions/toggleBookmark";
import { useSession, signIn } from "next-auth/react";
import { useState, useRef } from "react";

export default function Bookmark({
  id,
  bookmarked,
}: {
  id: string;
  bookmarked: boolean;
}) {
  const { data: session, status } = useSession();
  const [isBookmarked, setIsBookmarked] = useState(bookmarked);
  const [isLoading, setIsLoading] = useState(false);
  const lastError = useRef<string | null>(null);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent parent Link / card navigation
    e.preventDefault();
    e.stopPropagation();

    if (status === "loading") return; // wait
    if (status === "unauthenticated" || !session) {
      signIn(); // open provider page, no manual router push
      return;
    }
    if (isLoading) return;

    setIsLoading(true);
    const prev = isBookmarked;
    setIsBookmarked(!prev); // optimistic
    try {
      const res = await toggleBookmark(id, prev);
      if ((res as any)?.conflict) {
        // Already in desired state – keep optimistic
        // Optionally setIsBookmarked(!prev) again (no-op)
      }
    } catch (e: any) {
      console.error("toggleBookmark error", e);
      lastError.current = e?.message;
      setIsBookmarked(prev); // rollback
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isBookmarked}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
      disabled={isLoading}
      className={`transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 ${
        isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      data-error={lastError.current || undefined}
      data-status={status}
    >
      {!isBookmarked ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="w-5 h-6 text-yellow-700"
          fill="currentColor"
        >
          <path d="M0 48C0 21.5 21.5 0 48 0l0 48 0 393.4 130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4 336 48 48 48 48 0 336 0c26.5 0 48 21.5 48 48l0 440c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488L0 48z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
          className="w-5 h-6 text-yellow-700"
          fill="currentColor"
        >
          <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
        </svg>
      )}
    </button>
  );
}
