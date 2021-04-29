import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import blueBird from "../images/2021_twitter_logo_blue.png";
import Image from "react-bootstrap/Image";
import "./Login.css";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div>
      <Container style={{ maxWidth: "24%", marginTop: "10rem" }}>
        <Image src={blueBird} style={{ width: "37px", marginBottom: "2rem" }} />
        <h1 id="heading">Log in to Twitter</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formGroupEmail">
            <Form.Label>Phone, email or username</Form.Label>
            <Form.Control
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              placeholder="Enter phone, email or username"
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
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
            Log in
          </Button>
          <p>Forgot password?</p>
          <p>Sign up for Twitter</p>
        </Form>
      </Container>
    </div>
  );
};
