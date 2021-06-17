import { fileOpen, fileSave, FileSystemHandle } from "browser-nativefs";
import { get as idbGet, set as idbSet } from "idb-keyval";

import { AppState, upgradeState } from "./index";

const IDB_FILE_HANDLE_KEY = "idb_file_handle_key";

export async function saveFileHandle(handle: FileSystemHandle): Promise<void> {
  await idbSet(IDB_FILE_HANDLE_KEY, handle);
}

export function restoreFileHandle(): Promise<FileSystemHandle | undefined> {
  return idbGet(IDB_FILE_HANDLE_KEY);
}

export async function saveToFile(
  state: AppState,
  name: string = "Untitled",
  handle?: FileSystemHandle
) {
  const blob = new Blob([JSON.stringify(state)], {
    type: "application/json",
  });
  const fileHandle = await fileSave(
    blob,
    {
      fileName: name,
      description: "My bookmarks file",
      extensions: [".mbms"],
    },
    handle
  );
  return { fileHandle };
}

export type LoadedFile = {
  state: AppState;
  name: string;
  handle?: FileSystemHandle;
};

export async function loadFromFile() {
  const blob = await fileOpen({
    description: "My bookmarks file",
    extensions: [".mbms"],
  });
  return {
    state: upgradeState(JSON.parse(await blob.text())),
    name: blob.name,
    handle: blob.handle,
  };
}
