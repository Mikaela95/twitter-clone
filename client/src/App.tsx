import React from "react";
import { Users } from "./components/Users";

// Instance of the apollo client
/* const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:4000/graphql"
}); */

function App() {
  return (
    <div>
      <Users />
    </div>
  );
}

export default App;
