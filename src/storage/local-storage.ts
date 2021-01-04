import { APP_VERSION, getInitialState, IStorageProvider } from "./index";

const LS_KEY = "MyBookmarksAppState";

export const localStorageProvider: IStorageProvider = {
  async getState() {
    const strState = localStorage.getItem(LS_KEY);
    return strState ? JSON.parse(strState) : getInitialState(APP_VERSION);
  },
  setState(state) {
    localStorage.setItem(LS_KEY, JSON.stringify(state));
  },
};
