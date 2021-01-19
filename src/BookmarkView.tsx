import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image as ChakraImage,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tag,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { BookmarkId, BookmarkType } from "./bookmark";
import { EditBookmarkButton } from "./BookmarkForm";

function getFaviconUrl(uri: string) {
  const url = new URL(uri);
  return `${url.origin}/favicon.ico`;
}

function Favicon({ url }: { url: string }) {
  const [ready, setReady] = useState(false);
  const image = useRef(new Image());

  useEffect(() => {
    let cancelled = false;
    image.current.src = url;
    image.current.onload = () => {
      if (!cancelled) setReady(true);
    };
    return () => {
      setReady(false);
      cancelled = true;
    };
  }, [url]);

  return (
    <Box
      background="gray.50"
      width="24px"
      height="24px"
      rounded="full"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <ChakraImage
        boxSize="16px"
        src={url}
        alt="Favicon"
        transition="opacity 0.2s ease-in"
        opacity={Number(ready)}
      />
    </Box>
  );
}

export function BookmarkView({
  bookmark,
  onBookmarkUpdate,
  onBookmarkDelete,
}: {
  bookmark: BookmarkType;
  onBookmarkUpdate: React.ComponentProps<
    typeof EditBookmarkButton
  >["onBookmarkUpdate"];
  onBookmarkDelete: (id: BookmarkId) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box border="1px" borderColor="gray.200" borderRadius={8} px={4} py={2}>
      <Flex justify="space-between">
        <Box>
          <Link isExternal href={bookmark.url}>
            <Heading as="h3" size="m" display="flex" alignItems="center">
              <Favicon url={getFaviconUrl(bookmark.url)} />
              <Box ml={2}>{bookmark.name}</Box>
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
        <VStack>
          <EditBookmarkButton
            bookmark={bookmark}
            onBookmarkUpdate={onBookmarkUpdate}
          />
          <IconButton
            aria-label="Delete bookmark"
            icon={<DeleteIcon />}
            onClick={onOpen}
          />
        </VStack>
      </Flex>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalBody>
            Deleting bookmark: <strong>{bookmark.name}</strong>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} mr={3}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => {
                onBookmarkDelete(bookmark.id);
                onClose();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
