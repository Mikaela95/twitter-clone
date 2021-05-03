import React from "react";
import Spinner from "react-bootstrap/Spinner";

export const Loading = () => {
  return (
    <Spinner
      className="d-flex justify-content-center"
      animation="border"
      role="status"
      variant="primary"
    >
      <span className="sr-only">Loading...</span>
    </Spinner>
  );
};
