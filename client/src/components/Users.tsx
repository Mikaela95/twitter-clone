import React, { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";


// useEffect will wait for this data to be recieved

const Users = () => {
  /* const { error, loading, data } = useQuery(LOAD_USERS);

  // Run once -> wait for data to change before rerunning
  useEffect(() => {
    console.log(data);
  }, [data]); */

  return (
    <div>
      <h1>something</h1>
    </div>
  );
};

export { Users };
