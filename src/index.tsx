import { ChakraProvider, ColorModeScript, extendTheme } from "@chakra-ui/react";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { createBookmark } from "./bookmark";
import reportWebVitals from "./reportWebVitals";
import { APP_VERSION, createStorageManager, getInitialState } from "./storage";
import { restoreFileHandle } from "./storage/file-system-storage";
import { localStorageProvider } from "./storage/local-storage";

const storageManager = createStorageManager(localStorageProvider);

async function restoreAppState() {
  const [fileHandle, state] = await Promise.all([
    restoreFileHandle(),
    storageManager.getState(),
  ]);
  return {
    state,
    fileHandle,
  };
}

restoreAppState().then(({ state, fileHandle }) => {
  const customTheme = extendTheme({
    config: {
      useSystemColorMode: true,
    },
  });

  ReactDOM.render(
    <StrictMode>
      <ColorModeScript />
      <ChakraProvider theme={customTheme}>
        <App
          initialState={state}
          initialFileHandle={fileHandle}
          onStateChange={storageManager.setState}
        />
      </ChakraProvider>
    </StrictMode>,
    document.getElementById("root")
  );
});

declare global {
  interface Window {
    setTestBookmarks(): void;
  }
}

window.setTestBookmarks = function () {
  const myBookmarks = [
    createBookmark({
      name: "google",
      url: "https://www.google.com",
      description: "big search engine",
      tags: ["google", "search"],
    }),
    createBookmark({
      name: "instagram",
      url: "https://www.instagram.com/",
      description: "share photoes and videos",
      tags: ["photo", "video", "image", "social", "media"],
    }),
    createBookmark({
      name: "youtube",
      url: "https://www.youtube.com",
      tags: ["google", "video"],
    }),
  ];

  localStorageProvider.setState({
    ...getInitialState(APP_VERSION),
    bookmarks: myBookmarks,
  });
  window.location.reload();
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
