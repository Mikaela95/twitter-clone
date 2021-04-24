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

const Users = () => {
  return (
    <div>
      <h1>something</h1>
    </div>);
};

export { Users };