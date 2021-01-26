import { nanoid } from "nanoid";

import { map, toArray, unique } from "../collection";

export type BookmarkId = string & { __type__: "BookmarkId" };
function getBookmarkId() {
  return nanoid() as BookmarkId;
}

export type BookmarkType = {
  id: BookmarkId;
  name: string;
  url: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type CreateBookmarkPayload = {
  name: string;
  url: string;
  description?: string;
  tags?: string[];
};

function processUrl(url: string) {
  const split = url.split("//");
  if (split.length === 1) {
    return `https://${url}`;
  }
  return url;
}

function processTags(tags: string[]): string[] {
  return toArray(unique(map((x) => x.toLowerCase(), tags)));
}

export function createBookmark({
  name,
  url,
  description = "",
  tags = [],
}: CreateBookmarkPayload): BookmarkType {
  const date = new Date().toISOString();
  return {
    id: getBookmarkId(),
    url: processUrl(url),
    name,
    description,
    tags: processTags(tags),
    createdAt: date,
    updatedAt: date,
  };
}

export function updateBookmark(
  bookmark: BookmarkType,
  updates: Omit<Partial<BookmarkType>, "id" | "createdAt" | "updatedAt">
): BookmarkType {
  return {
    ...bookmark,
    ...updates,
    url: processUrl(updates.url ?? bookmark.url),
    tags: processTags(updates.tags ?? bookmark.tags),
    updatedAt: new Date().toISOString(),
  };
}
