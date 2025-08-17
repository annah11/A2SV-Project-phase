"use client";
import { getSession } from "next-auth/react";

const BASE = process.env.NEXT_PUBLIC_API_BASE || "https://akil-backend.onrender.com";

export default async function toggleBookmark(id: string, currently: boolean) {
  const session = await getSession();
  const token = (session as any)?.accessToken;
  if (!token) throw new Error("Not authenticated");
  const method = currently ? "DELETE" : "POST";
  const res = await fetch(`${BASE}/bookmarks/${id}`, {
    method,
    headers: { Authorization: `Bearer ${token}` }
  });

  if (res.status === 409) return { status: currently ? "removed" : "added", conflict: true };
  if (!res.ok) throw new Error(`Bookmark toggle failed (${res.status})`);
  return { status: currently ? "removed" : "added" };
}
