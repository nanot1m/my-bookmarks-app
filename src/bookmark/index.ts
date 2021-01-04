import { nanoid } from "nanoid";
import { map, toArray, unique } from "../collection";

type BookmarkId = string & { __type__: "BookmarkId" };
function getBookmarkId() {
  return nanoid() as BookmarkId;
}

export type Bookmark = {
  id: BookmarkId;
  name: string;
  url: string;
  description: string;
  tags: string[];
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
}: CreateBookmarkPayload): Bookmark {
  return {
    id: getBookmarkId(),
    url,
    name,
    description,
    tags: toArray(unique(map((x) => x.toLowerCase(), tags))),
  };
}
