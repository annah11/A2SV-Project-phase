// src/app/api/actions/getBookmarks.ts
import { getBookmarksLogic } from "@/lib/actions/getBookmarksLogic";

export default async function getBookmarks() {
  return await getBookmarksLogic();
}
