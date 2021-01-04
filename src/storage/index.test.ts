import { createStorageManager, getInitialState } from ".";

describe("createStorageManager", () => {
  test("createStorageManager saves state", () => {
    const state = getInitialState();
    const setState = jest.fn();
    const storageManager = createStorageManager({
      getState: () => Promise.resolve(state),
      setState,
    });

    storageManager.setState(state);

    expect(setState).toBeCalledTimes(1);
    expect(setState).toBeCalledWith(state);
  });
});
