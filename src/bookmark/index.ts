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

export function createBookmark({
  name,
  url,
  description = "",
  tags = [],
}: CreateBookmarkPayload): BookmarkType {
  const date = new Date().toISOString();
  return {
    id: getBookmarkId(),
    url,
    name,
    description,
    tags: toArray(unique(map((x) => x.toLowerCase(), tags))),
    createdAt: date,
    updatedAt: date,
  };
}

export function updateBookmark(
  bookmark: BookmarkType,
  updates: Omit<Partial<BookmarkType>, "id" | "createdAt" | "updatedAt">
) {
  return {
    ...bookmark,
    ...updates,
    updatedAt: new Date().toISOString(),
  };
}
