import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
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
import React from "react";

import { BookmarkId, BookmarkType } from "./bookmark";
import { EditBookmarkButton } from "./BookmarkForm";

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
