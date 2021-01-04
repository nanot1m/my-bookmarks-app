import {
  Box,
  Button,
  ChakraProvider,
  Container,
  extendTheme,
  Heading,
  HStack,
  IconButton,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Tag,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { matchSorter } from "match-sorter";
import React, { useMemo, useRef, useState } from "react";
import { Bookmark as BookmarkType, createBookmark } from "./bookmark";
import { createForm } from "./form";
import ReactFocusLock from "react-focus-lock";

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

function BookmarkView({ bookmark }: { bookmark: BookmarkType }) {
  return (
    <Box border="1px" borderColor="gray.200" borderRadius={8} px={4} py={2}>
      <Link isExternal href={bookmark.url}>
        <Heading as="h3" size="m">
          {bookmark.name}
        </Heading>
      </Link>
      <Text mb={1}>{bookmark.description}</Text>
      <HStack>
        {bookmark.tags.map((tag) => (
          <Tag key={tag} size="sm">
            {tag}
          </Tag>
        ))}
      </HStack>
    </Box>
  );
}

type CreateBookmarkFormPayload = {
  name: string;
  url: string;
  description: string;
  tags: string;
};

const { Form, Field } = createForm<CreateBookmarkFormPayload>();

const validateNewBookmarkForm = (
  form: CreateBookmarkFormPayload
): Partial<Record<"name" | "url" | "description" | "tags", string>> => {
  const errors = {} as Partial<Record<keyof typeof form, string>>;
  if ((form.name?.trim() || "").length === 0) {
    errors.name = "Name can not be empty";
  }
  if ((form.url?.trim() || "").length === 0) {
    errors.url = "URL can not be empty";
  }
  console.log(errors);
  return errors;
};

function CreateBookmarkPopover({
  onNewBookmark,
}: {
  onNewBookmark: (bookmark: BookmarkType) => void;
}) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const initialFocusRef = useRef<HTMLInputElement>(null);
  return (
    <Popover
      placement="auto-start"
      isLazy
      initialFocusRef={initialFocusRef}
      closeOnBlur={false}
      onOpen={onOpen}
      isOpen={isOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <IconButton size="sm" aria-label="New bookmakr" icon={<AddIcon />} />
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <ReactFocusLock returnFocus persistentFocus={false}>
            <Form
              onSubmit={(values) => {
                onNewBookmark(
                  createBookmark({
                    name: values.name,
                    description: values.description,
                    url: values.url,
                    tags: values.tags.split(/[\s,]+/),
                  })
                );
                onClose();
              }}
              initialValues={{ description: "", name: "", tags: "", url: "" }}
              validate={validateNewBookmarkForm}
            >
              <PopoverArrow />
              <PopoverHeader>New bookmakr</PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <VStack>
                  <Field
                    name="name"
                    label="Name"
                    id="bookmark-name"
                    isRequired
                    render={(input) => (
                      <Input ref={initialFocusRef} {...input} />
                    )}
                  />
                  <Field
                    name="url"
                    label="URL"
                    id="bookmark-url"
                    isRequired
                    render={(input) => <Input {...input} />}
                  />
                  <Field
                    name="description"
                    label="Description"
                    id="bookmark-description"
                    render={(input) => <Textarea {...input} />}
                  />
                  <Field
                    name="tags"
                    label="Description"
                    id="bookmark-tags"
                    render={(input) => <Textarea {...input} />}
                  />
                </VStack>
              </PopoverBody>
              <PopoverFooter justifyContent="flex-end" display="flex">
                <Button colorScheme="blue" type="submit">
                  Add
                </Button>
              </PopoverFooter>
            </Form>
          </ReactFocusLock>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

const customTheme = extendTheme({
  config: {
    useSystemColorMode: true,
  },
});

function App() {
  const [bookmarks, setBookmarks] = useState(myBookmarks);
  const [filter, setFilterValue] = useState("");

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
              setBookmarks((bookmarks) => bookmarks.concat(bookmark));
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
