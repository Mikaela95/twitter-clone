import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import "./App.css";
import { Users } from "./components/Users"


// Instance of the apollo client
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Users/>
      </div>
    </ApolloProvider>
  );
}

export default App;
