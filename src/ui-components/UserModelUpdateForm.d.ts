/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type UserModelUpdateFormInputValues = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    timeCreated?: number;
    dateCreated?: string;
    city?: string;
    country?: string;
};
export declare type UserModelUpdateFormValidationValues = {
    firstName?: ValidationFunction<string>;
    lastName?: ValidationFunction<string>;
    email?: ValidationFunction<string>;
    phone?: ValidationFunction<string>;
    timeCreated?: ValidationFunction<number>;
    dateCreated?: ValidationFunction<string>;
    city?: ValidationFunction<string>;
    country?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type UserModelUpdateFormOverridesProps = {
    UserModelUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    firstName?: PrimitiveOverrideProps<TextFieldProps>;
    lastName?: PrimitiveOverrideProps<TextFieldProps>;
    email?: PrimitiveOverrideProps<TextFieldProps>;
    phone?: PrimitiveOverrideProps<TextFieldProps>;
    timeCreated?: PrimitiveOverrideProps<TextFieldProps>;
    dateCreated?: PrimitiveOverrideProps<TextFieldProps>;
    city?: PrimitiveOverrideProps<TextFieldProps>;
    country?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type UserModelUpdateFormProps = React.PropsWithChildren<{
    overrides?: UserModelUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    userModel?: any;
    onSubmit?: (fields: UserModelUpdateFormInputValues) => UserModelUpdateFormInputValues;
    onSuccess?: (fields: UserModelUpdateFormInputValues) => void;
    onError?: (fields: UserModelUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: UserModelUpdateFormInputValues) => UserModelUpdateFormInputValues;
    onValidate?: UserModelUpdateFormValidationValues;
} & React.CSSProperties>;
export default function UserModelUpdateForm(props: UserModelUpdateFormProps): React.ReactElement;
