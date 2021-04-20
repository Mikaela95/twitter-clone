import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./App.css";

const client = new ApolloClient({
  uri: "https://localhost:4000",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>My first Apollo app 🎉</h1>
      </div>
    </ApolloProvider>
  );
}

export default App;
