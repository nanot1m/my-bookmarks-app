import { Icon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Collapse,
  Container,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FileSystemHandle } from "browser-nativefs";
import { matchSorter } from "match-sorter";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  AiFillFileAdd,
  AiFillFileText,
  AiOutlineDownload,
} from "react-icons/ai";
import { GoMarkGithub } from "react-icons/go";

import { BookmarkId, BookmarkType } from "./bookmark";
import { CreateBookmarkButton } from "./BookmarkForm";
import { BookmarkView } from "./BookmarkView";
import { IconButton } from "./IconButton";
import { AppState } from "./storage";
import {
  loadFromFile,
  saveFileHandle,
  saveToFile,
} from "./storage/file-system-storage";

type AppAction =
  | { type: "NewBookmark"; payload: BookmarkType }
  | { type: "UpdateBookmark"; payload: BookmarkType }
  | { type: "DeleteBookmark"; payload: BookmarkId }
  | { type: "SetState"; payload: AppState }
  | { type: "CreateNewFile" };

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
    case "CreateNewFile":
      return {
        ...state,
        bookmarks: [],
      };
  }
}

function App({
  initialState,
  initialFileHandle,
  onStateChange,
}: {
  initialState: AppState;
  initialFileHandle: FileSystemHandle | undefined;
  onStateChange(state: AppState): void;
}) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [filter, setFilterValue] = useState("");
  const [fileHandle, setFileHandle] = useState(initialFileHandle);
  const [autoSaveIsEnabled, setAutoSaveEnabled] = useState(false);

  const toast = useToast();

  useEffect(() => {
    const id = setTimeout(() => {
      onStateChange(state);
    }, 100);
    return () => clearTimeout(id);
  }, [onStateChange, state]);

  useEffect(() => {
    if (autoSaveIsEnabled) {
      saveToFile(state, fileHandle?.name, fileHandle).catch((ex) => {
        if (ex.code !== DOMException.ABORT_ERR) {
          toast({
            title: "Error",
            description: ex.message,
            status: "error",
            isClosable: true,
          });
        }
      });
    }
  }, [autoSaveIsEnabled, fileHandle, state, toast]);

  const { bookmarks } = state;
  const sortedBookmarks = useMemo(
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
      if (file.handle) {
        saveFileHandle(file.handle);
      }
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

  async function handleNewFile() {
    try {
      const result = await saveToFile({ ...state, bookmarks: [] });
      dispatch({ type: "CreateNewFile" });
      setFileHandle(result.fileHandle);
      saveFileHandle(result.fileHandle);
      setAutoSaveEnabled(false);
      toast({
        title: "New file created",
        description: `New file "${result.fileHandle.name}" created`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (ex) {
      if (ex.code !== DOMException.ABORT_ERR) {
        toast({
          title: "Failed to create a new file",
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
        mb={2}
      >
        <Heading as="h1">My bookmarks.</Heading>
        <HStack>
          <IconButton
            aria-label="New file"
            title="New file"
            icon={<Icon as={AiFillFileAdd} />}
            onClick={handleNewFile}
          />
          <IconButton
            aria-label="Open file"
            title="Open file"
            icon={<Icon as={AiFillFileText} />}
            onClick={handleFileOpen}
          />
          <IconButton
            aria-label="Save to file"
            title="Save to file"
            icon={<Icon as={AiOutlineDownload} />}
            onClick={handleFileSave}
          />
        </HStack>
      </Box>
      <Collapse in={Boolean(fileHandle)} animateOpacity>
        {fileHandle && (
          <Box display="flex" justifyContent="space-between" pb={2}>
            <Text>{fileHandle.name}</Text>
            <Checkbox
              checked={autoSaveIsEnabled}
              onChange={(e) => setAutoSaveEnabled(e.target.checked)}
            >
              Autosave
            </Checkbox>
          </Box>
        )}
      </Collapse>
      <HStack>
        <Input
          placeholder="Search"
          value={filter}
          onChange={(e) => setFilterValue(e.target.value)}
          mb={8}
          mt={8}
        />

        <CreateBookmarkButton
          onBookmarkCreate={(bookmark) => {
            dispatch({ type: "NewBookmark", payload: bookmark });
          }}
        />
      </HStack>
      {sortedBookmarks.length === 0 && (
        <Box textAlign="center" color="gray.500">
          No bookmarks yet. Let's add the first bookmark!
        </Box>
      )}
      <VStack spacing={4} align="stretch">
        {sortedBookmarks.map((bookmark) => (
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
