/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserModel = /* GraphQL */ `
  mutation CreateUserModel(
    $input: CreateUserModelInput!
    $condition: ModelUserModelConditionInput
  ) {
    createUserModel(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      timeCreated
      dateCreated
      city
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateUserModel = /* GraphQL */ `
  mutation UpdateUserModel(
    $input: UpdateUserModelInput!
    $condition: ModelUserModelConditionInput
  ) {
    updateUserModel(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      timeCreated
      dateCreated
      city
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteUserModel = /* GraphQL */ `
  mutation DeleteUserModel(
    $input: DeleteUserModelInput!
    $condition: ModelUserModelConditionInput
  ) {
    deleteUserModel(input: $input, condition: $condition) {
      id
      firstName
      lastName
      email
      phone
      timeCreated
      dateCreated
      city
      country
      createdAt
      updatedAt
      __typename
    }
  }
`;
