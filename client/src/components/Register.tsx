import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Image from "react-bootstrap/Image";
import { useCreateUserMutation } from "../generated/graphql";
import blueBird from "../images/2021_twitter_logo_blue.png";

/* type IProps = {
  test: number
} */

export const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const [register] = useCreateUserMutation();

  let history = useHistory();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await register({
        variables: {
          username,
          password,
        },
      });
      setValid(true);
      history.push("/login");
    } catch (e) {
      setValid(false);
      console.error(e);
    }
  };

  return (
    <div>
      <Container style={{ maxWidth: "24%", marginTop: "10rem" }}>
        <Image src={blueBird} style={{ width: "37px", marginBottom: "2rem" }} />
        <h1 id="heading">Sign up to Twitter</h1>
        {!valid && (
          <Alert variant="danger">
            The username is already taken. Please choose a different one and try
            again.
          </Alert>
        )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Choose a username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter username"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Choose a password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button id="primary-button" type="submit" variant="primary" block>
            Sign up
          </Button>
        </Form>
      </Container>
    </div>
  );
};
