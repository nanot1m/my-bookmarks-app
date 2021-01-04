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
import { AddIcon } from "@chakra-ui/icons";
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
  console.log(errors);
  return errors;
};

export function CreateBookmark({
  onNewBookmark,
}: {
  onNewBookmark: (bookmark: BookmarkType) => void;
}) {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const initialFocusRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <IconButton
        size="sm"
        aria-label="New bookmakr"
        icon={<AddIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
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
          <ModalContent>
            <ModalHeader>Add bookmark</ModalHeader>
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
                  label="Description"
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
                Add
              </Button>
            </ModalFooter>
          </ModalContent>
        </Form>
      </Modal>
    </>
  );
}
