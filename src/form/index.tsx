import { Form as FinalForm, Field as FinalField } from "react-final-form";
import React, { ReactNode } from "react";
import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";

export interface FormProps<T> {
  initialValues: T;
  validate?(values: T): Partial<Record<keyof T, string>>;
  onSubmit(values: T): void;
  children: ReactNode;
}

type FilterStrings<T> = T extends string ? T : never;

export interface FieldProps<
  TValues,
  TName extends FilterStrings<keyof TValues>,
  TElement extends HTMLElement
> {
  name: TName;
  isRequired?: boolean;
  id?: string;
  label: string;
  render(input: FieldInputProps<TValues[TName], TElement>): ReactNode;
}

interface FieldInputProps<FieldValue, T extends HTMLElement> {
  name: string;
  onBlur: (event?: React.FocusEvent<T>) => void;
  onChange: (event: React.ChangeEvent<T> | any) => void;
  onFocus: (event?: React.FocusEvent<T>) => void;
  type?: string;
  value: FieldValue;
  checked?: boolean;
  multiple?: boolean;
}

export function createForm<T>() {
  function Form(props: FormProps<T>) {
    return (
      <FinalForm<T>
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>{props.children}</form>
        )}
      />
    );
  }

  function Field<
    TName extends FilterStrings<keyof T>,
    TElement extends HTMLElement = HTMLElement
  >(props: FieldProps<T, TName, TElement>) {
    return (
      <FinalField<T[typeof props["name"]]>
        name={props.name}
        render={({ input, meta }) => (
          <FormControl
            id={props.id}
            isRequired={props.isRequired}
            isInvalid={meta.touched && meta.error}
          >
            <FormLabel>{props.label}</FormLabel>
            {props.render(input)}
            <FormErrorMessage>
              <FormErrorIcon /> {meta.error}
            </FormErrorMessage>
          </FormControl>
        )}
      />
    );
  }

  return { Form, Field };
}
