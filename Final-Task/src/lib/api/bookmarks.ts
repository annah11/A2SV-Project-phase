import { getSession } from "next-auth/react";

const BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://akil-backend.onrender.com";

function pickArray(data: any): any[] {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  for (const k of ["data", "items", "bookmarks", "results"]) {
    if (Array.isArray(data?.[k])) return data[k];
  }
  for (const k of Object.keys(data || {})) {
    if (Array.isArray(data[k])) return data[k];
  }
  return [];
}

async function authHeaders() {
  const session = await getSession();
  const token = (session as any)?.accessToken;
  if (!token) throw new Error("AUTH_NO_TOKEN");
  return { Authorization: `Bearer ${token}` };
}

export async function getBookmarksRaw(): Promise<{
  list: any[];
  status: number;
  data: any;
}> {
  const headers = await authHeaders();
  const res = await fetch(`${BASE}/bookmarks`, { headers });
  const status = res.status;
  let data: any = null;
  try {
    data = await res.json();
  } catch {}
  if (!res.ok) {
    if (status === 401 || status === 403) throw new Error("AUTH_401");
    throw new Error(`UPSTREAM_${status}`);
  }
  return { list: pickArray(data), status, data };
}

export function normalizeBookmark(item: any) {
  return {
    id: item.id || item.eventID || item._id,
    title: item.title || item.name || "Untitled",
    description: item.description || item.details || "",
    company: item.company || item.organization || item.org || "Unknown",
    location: item.location || "",
    ...item,
  };
}
