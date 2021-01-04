import { StrictMode } from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ColorModeScript } from "@chakra-ui/react";
import { localStorageProvider } from "./storage/local-storage";
import { createBookmark } from "./bookmark";

localStorageProvider.getState().then((state) => {
  ReactDOM.render(
    <StrictMode>
      <ColorModeScript />
      <App initialState={state} onStateChange={localStorageProvider.setState} />
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

  localStorageProvider.setState({ bookmarks: myBookmarks });
  window.location.reload();
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
