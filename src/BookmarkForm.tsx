import {
  Button,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { AddIcon, EditIcon } from "@chakra-ui/icons";
import React, { useRef } from "react";
import { BookmarkType, createBookmark } from "./bookmark";
import { createForm } from "./form";

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
  return errors;
};

export function BookmarkForm({
  title,
  bookmark,
  isOpen,
  onClose,
  onSubmit,
}: {
  title: string;
  bookmark?: BookmarkType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookmark: BookmarkType) => void;
}) {
  const initialFocusRef = useRef<HTMLInputElement>(null);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Form
        onSubmit={(values) => {
          const payload = {
            name: values.name,
            description: values.description,
            url: values.url,
            tags: values.tags.split(/[\s,]+/).filter(Boolean),
          };
          onSubmit(
            bookmark ? { ...bookmark, ...payload } : createBookmark(payload)
          );
          onClose();
        }}
        initialValues={{
          description: bookmark?.description ?? "",
          name: bookmark?.name ?? "",
          tags: bookmark?.tags.join(", ") ?? "",
          url: bookmark?.url ?? "",
        }}
        validate={validateNewBookmarkForm}
      >
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Field
                name="name"
                label="Name"
                id="bookmark-name"
                isRequired
                render={(input) => <Input ref={initialFocusRef} {...input} />}
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
                label="Tags"
                id="bookmark-tags"
                render={(input) => <Textarea {...input} />}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Form>
    </Modal>
  );
}

export function CreateBookmarkButton({
  onBookmarkCreate,
}: {
  onBookmarkCreate: (bookmark: BookmarkType) => void;
}) {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="New bookmakr"
        icon={<AddIcon />}
        onClick={onOpen}
      />

      <BookmarkForm
        title="New bookmark"
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={onBookmarkCreate}
      />
    </>
  );
}

export function EditBookmarkButton({
  bookmark,
  onBookmarkUpdate,
}: {
  bookmark: BookmarkType;
  onBookmarkUpdate: (bookmark: BookmarkType) => void;
}) {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="New bookmakr"
        icon={<EditIcon />}
        onClick={onOpen}
      />
      <BookmarkForm
        title="Edit bookmark"
        bookmark={bookmark}
        onClose={onClose}
        isOpen={isOpen}
        onSubmit={onBookmarkUpdate}
      />
    </>
  );
}
