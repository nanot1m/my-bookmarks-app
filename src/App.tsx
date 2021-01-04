import {
  Box,
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import { matchSorter } from "match-sorter";
import React, { useEffect, useMemo, useReducer, useState } from "react";
import { BookmarkId, BookmarkType } from "./bookmark";
import { AppState } from "./storage";
import { BookmarkView } from "./BookmarkView";
import { CreateBookmarkButton } from "./BookmarkForm";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

type AppAction =
  | { type: "NewBookmark"; payload: BookmarkType }
  | { type: "UpdateBookmark"; payload: BookmarkType }
  | { type: "DeleteBookmark"; payload: BookmarkId };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "NewBookmark":
      return {
        ...state,
        bookmarks: state.bookmarks.concat(action.payload),
      };
    case "UpdateBookmark": {
      const updatedBookmarkIndex = state.bookmarks.findIndex(
        (b) => b.id === action.payload.id
      );
      const updatedBookmarks: BookmarkType[] = [
        ...state.bookmarks.slice(0, updatedBookmarkIndex),
        action.payload,
        ...state.bookmarks.slice(updatedBookmarkIndex + 1),
      ];
      return {
        ...state,
        bookmarks: updatedBookmarks,
      };
    }
    case "DeleteBookmark":
      return {
        ...state,
        bookmarks: state.bookmarks.filter((b) => b.id !== action.payload),
      };
  }
}

function App({
  initialState,
  onStateChange,
}: {
  initialState: AppState;
  onStateChange(state: AppState): void;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [filter, setFilterValue] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      onStateChange(state);
    }, 100);
    return () => clearTimeout(id);
  }, [onStateChange, state]);

  const { bookmarks } = state;
  const sorted = useMemo(
    () =>
      matchSorter(
        bookmarks.slice().sort((a, b) => (a.updatedAt < b.updatedAt ? -1 : 1)),
        filter,
        { keys: ["name", "tags", "description"] }
      ),
    [filter, bookmarks]
  );

  return (
    <ChakraProvider theme={customTheme}>
      <Container py={8}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={12}
        >
          <Heading as="h1">My bookmarks.</Heading>
          <CreateBookmarkButton
            onBookmarkCreate={(bookmark) => {
              dispatch({ type: "NewBookmark", payload: bookmark });
            }}
          />
        </Box>
        <Input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilterValue(e.target.value)}
          mb={8}
        />
        <VStack spacing={4} align="stretch">
          {sorted.map((bookmark) => (
            <BookmarkView
              key={bookmark.id}
              bookmark={bookmark}
              onBookmarkUpdate={(bookmark) =>
                dispatch({ type: "UpdateBookmark", payload: bookmark })
              }
              onBookmarkDelete={(id) =>
                dispatch({ type: "DeleteBookmark", payload: id })
              }
            />
          ))}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
