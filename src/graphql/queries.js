/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserModel = /* GraphQL */ `
  query GetUserModel($id: ID!) {
    getUserModel(id: $id) {
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
export const listUserModels = /* GraphQL */ `
  query ListUserModels(
    $filter: ModelUserModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
