import { BookmarkType } from "../bookmark";

export interface IStorage {
  getState(): Promise<AppState>;
  setState(state: AppState): void;
}

export interface AppState {
  bookmarks: BookmarkType[];
}

export function getInitialState(): AppState {
  return {
    bookmarks: [],
  };
}
