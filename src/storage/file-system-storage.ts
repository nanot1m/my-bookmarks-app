import { fileSave, fileOpen, FileSystemHandle } from "browser-nativefs";
import { AppState, upgradeState } from "./index";

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
