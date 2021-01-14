import {
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { Field as FinalField, Form as FinalForm } from "react-final-form";

export interface FormProps<T> {
  initialValues: T;
  validate?(values: T): Partial<Record<keyof T, string>>;
  onSubmit(values: T): void;
  children: ReactNode;
}

type FilterStrings<UnionType> = UnionType extends string ? UnionType : never;

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

interface FieldInputProps<FieldValue, ElementType extends HTMLElement> {
  name: string;
  onBlur: (event?: React.FocusEvent<ElementType>) => void;
  onChange: (event: React.ChangeEvent<ElementType> | any) => void;
  onFocus: (event?: React.FocusEvent<ElementType>) => void;
  type?: string;
  value: FieldValue;
  checked?: boolean;
  multiple?: boolean;
}

export function createForm<FormValuesType>() {
  function Form(props: FormProps<FormValuesType>) {
    return (
      <FinalForm<FormValuesType>
        initialValues={props.initialValues}
        onSubmit={props.onSubmit}
        validate={props.validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>{props.children}</form>
        )}
      />
    );
  }

  function Field<
    TName extends FilterStrings<keyof FormValuesType>,
    TElement extends HTMLElement = HTMLElement
  >(props: FieldProps<FormValuesType, TName, TElement>) {
    return (
      <FinalField<FormValuesType[typeof props["name"]]>
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
