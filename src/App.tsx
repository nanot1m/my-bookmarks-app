import React, { useEffect, useMemo, useReducer, useState } from "react";
import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Input,
  Text,
  VStack,
  useToast,
  Link,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/icons";
import { FaFileAlt, FaFileDownload } from "react-icons/fa";
import { GoMarkGithub } from "react-icons/go";
import { FileSystemHandle } from "browser-nativefs";
import { matchSorter } from "match-sorter";

import { BookmarkId, BookmarkType } from "./bookmark";
import { AppState } from "./storage";
import { BookmarkView } from "./BookmarkView";
import { CreateBookmarkButton } from "./BookmarkForm";
import { loadFromFile, saveToFile } from "./storage/file-system-storage";

type AppAction =
  | { type: "NewBookmark"; payload: BookmarkType }
  | { type: "UpdateBookmark"; payload: BookmarkType }
  | { type: "DeleteBookmark"; payload: BookmarkId }
  | { type: "SetState"; payload: AppState };

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
    case "SetState":
      return action.payload;
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
  const [fileHandle, setFileHandle] = useState<FileSystemHandle>();
  const toast = useToast();

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

  async function handleFileOpen() {
    try {
      const file = await loadFromFile();
      setFileHandle(file.handle);
      dispatch({ type: "SetState", payload: file.state });
    } catch (ex) {
      if (ex.code !== DOMException.ABORT_ERR) {
        toast({
          title: "Error",
          description: ex.message,
          status: "error",
          isClosable: true,
        });
      }
    }
  }

  async function handleFileSave() {
    try {
      const result = await saveToFile(state, fileHandle?.name, fileHandle);
      setFileHandle(result.fileHandle);
      toast({
        title: "Saved",
        description: "Bookmarks saved to " + result.fileHandle.name,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (ex) {
      if (ex.code !== DOMException.ABORT_ERR) {
        toast({
          title: "Error",
          description: ex.message,
          status: "error",
          isClosable: true,
        });
      }
    }
  }

  return (
    <Container py={8}>
      <Box
        as="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading as="h1">My bookmarks.</Heading>
        <HStack>
          <IconButton
            aria-label="Open file"
            title="Open file"
            icon={<Icon as={FaFileAlt} />}
            onClick={handleFileOpen}
          />
          <IconButton
            aria-label="Save to file"
            title="Save to file"
            icon={<Icon as={FaFileDownload} />}
            onClick={handleFileSave}
          />
          <CreateBookmarkButton
            onBookmarkCreate={(bookmark) => {
              dispatch({ type: "NewBookmark", payload: bookmark });
            }}
          />
        </HStack>
      </Box>
      <Box mb={10}>
        <Text color="gray.500">{fileHandle?.name}</Text>
      </Box>
      <Input
        placeholder="Search"
        value={filter}
        onChange={(e) => setFilterValue(e.target.value)}
        mb={8}
      />
      {sorted.length === 0 && (
        <Box textAlign="center" color="gray.500">
          No bookmarks yet. Let's add the first bookmark!
        </Box>
      )}
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
      <Box as="footer" mt={10} display="flex" justifyContent="flex-end">
        <Link
          href="https://github.com/nanot1m/my-bookmarks-app"
          isExternal
          color="gray.500"
        >
          <Icon as={GoMarkGithub} /> nanot1m
        </Link>
      </Box>
    </Container>
  );
}

export default App;
