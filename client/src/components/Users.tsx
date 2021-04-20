import React from "react";
import { gql, useQuery } from "@apollo/client";

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      firstName
      lastName
      age
    }
  }
`;

// need to add users to db first

export default function Users() {
  return <div></div>;
}