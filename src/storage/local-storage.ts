import { getInitialState, IStorage } from "./index";

const LS_KEY = "MyBookmarksAppState";

export const localStorageProvider: IStorage = {
  async getState() {
    const strState = localStorage.getItem(LS_KEY);
    return strState ? JSON.parse(strState) : getInitialState();
  },
  setState(state) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  },
};
