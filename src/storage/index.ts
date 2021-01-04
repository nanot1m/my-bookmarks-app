import { BookmarkType } from "../bookmark";

export const APP_VERSION = 1;

export interface IStorageProvider {
  getState(): Promise<AppState>;
  setState(state: AppState): void;
}

export interface AppState {
  version: number;
  bookmarks: BookmarkType[];
}

export function getInitialState(version: number = APP_VERSION): AppState {
  return {
    version,
    bookmarks: [],
  };
}

export interface IStorageManager {
  getState(): Promise<AppState>;
  setState(state: AppState): void;
}

export function createStorageManager(
  storageProvider: IStorageProvider
): IStorageManager {
  return {
    async getState() {
      try {
        const stateFromStorage = await storageProvider.getState();
        if (stateFromStorage.version !== APP_VERSION) {
          const upgradedState = upgradeState(stateFromStorage);
          storageProvider.setState(upgradedState);
          return upgradedState;
        }
        return stateFromStorage;
      } catch (ex) {
        return getInitialState(APP_VERSION);
      }
    },
    setState(state) {
      storageProvider.setState(state);
    },
  };
}

type StateUpdate = (state: AppState) => AppState;

const UPGRADES: Record<number, StateUpdate> = {
  0: (state: AppState) => {
    state.bookmarks.forEach((bookmark) => {
      const date = new Date().toISOString();
      bookmark.createdAt = bookmark.updatedAt = date;
    });
    state.version = 1;
    return state;
  },
};

function upgradeState(state: AppState): AppState {
  while (state.version !== APP_VERSION) {
    const version = Number(state.version ?? 0);
    if (version in UPGRADES) {
      state = UPGRADES[version](state);
    } else {
      state = getInitialState(APP_VERSION);
    }
  }
  return state;
}
