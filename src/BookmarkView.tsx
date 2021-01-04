import { Box, Heading, HStack, Link, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { BookmarkType } from "./bookmark";

export function BookmarkView({ bookmark }: { bookmark: BookmarkType }) {
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
