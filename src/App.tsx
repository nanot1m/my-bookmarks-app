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
import { BookmarkType } from "./bookmark";
import { AppState } from "./storage";
import { BookmarkView } from "./BookmarkView";
import { CreateBookmarkPopover } from "./CreateBookmarkPopover";

const customTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

type AppAction = { type: "NewBookmark"; payload: BookmarkType };

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "NewBookmark":
      return {
        ...state,
        bookmarks: state.bookmarks.concat(action.payload),
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
      matchSorter(bookmarks, filter, {
        keys: ["name", "tags", "description"],
      }),
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
          <CreateBookmarkPopover
            onNewBookmark={(bookmark) => {
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
            <BookmarkView key={bookmark.id} bookmark={bookmark} />
          ))}
        </VStack>
      </Container>
    </ChakraProvider>
  );
}

export default App;
