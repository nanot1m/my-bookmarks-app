import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Link,
  Tag,
  Text,
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
            size="xs"
            aria-label="Delete bookmark"
            icon={<DeleteIcon />}
            onClick={() => onBookmarkDelete(bookmark.id)}
          />
        </VStack>
      </Flex>
    </Box>
  );
}
