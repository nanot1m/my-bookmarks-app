import { AddIcon, EditIcon } from "@chakra-ui/icons";
import {
  Button,
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
import { useRef } from "react";

import { BookmarkType, createBookmark, updateBookmark } from "./bookmark";
import { createForm } from "./form";
import { IconButton } from "./IconButton";

type CreateBookmarkFormPayload = {
  name: string;
  url: string;
  description: string;
  tags: string;
};

const { Form, Field } = createForm<CreateBookmarkFormPayload>();

function validateNewBookmarkForm(form: CreateBookmarkFormPayload) {
  const errors = {} as Partial<Record<keyof typeof form, string>>;
  if ((form.name?.trim() || "").length === 0) {
    errors.name = "Name can not be empty";
  }
  if ((form.url?.trim() || "").length === 0) {
    errors.url = "URL can not be empty";
  }
  return errors;
}

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

  function handleSubmit(values: CreateBookmarkFormPayload): void {
    const vals = {
      name: values.name,
      description: values.description,
      url: values.url,
      tags: values.tags.split(/[\s,]+/).filter(Boolean),
    };
    onSubmit(bookmark ? updateBookmark(bookmark, vals) : createBookmark(vals));
    onClose();
  }

  const initialValues = {
    description: bookmark?.description ?? "",
    name: bookmark?.name ?? "",
    tags: bookmark?.tags.join(", ") ?? "",
    url: bookmark?.url ?? "",
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <Form
        onSubmit={handleSubmit}
        initialValues={initialValues}
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
        aria-label="Add bookmark"
        title="Add bookmark"
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
