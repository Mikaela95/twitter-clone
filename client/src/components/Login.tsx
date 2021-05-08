import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import blueBird from "../images/2021_twitter_logo_blue.png";
import Image from "react-bootstrap/Image";
import "./Login.css";
import { useLoginMutation } from "../generated/graphql";
import { useHistory } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import { setAccessToken } from "../accessToken";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [valid, setValid] = useState(true);

  const [login] = useLoginMutation();

  let history = useHistory();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      let response = await login({
        variables: {
          username,
          password,
        },
      });
      setValid(true);

      // if it exists - this returns the access token
      if (response && response.data) {
        let test = response.data.loginUser.accessToken
        console.log(test);
      }

      // Hacky
      if (response && response.data) {
        localStorage.setItem("accessToken", response.data.loginUser.accessToken)
        let x = localStorage.getItem("accessToken")
        // setAccessToken(x!)
        history.push("/home");
      }

      /* const value = response.data!.loginUser.accessToken;
      console.log("this is the value", value);

      const test2 = localStorage.setItem("jwt", value);
      console.log("set access token in local storage", test2);

      // currently returns undefined
      const test = setAccessToken(value);
      console.log("after setting access token", test); */

      // history.push("/home");
    } catch (e) {
      setValid(false);
      console.error(e);
    }
  };

  return (
    <div>
      <Container style={{ maxWidth: "24%", marginTop: "10rem" }}>
        <Image src={blueBird} style={{ width: "37px", marginBottom: "2rem" }} />
        <h1 id="heading">Log in to Twitter</h1>
        {!valid && (
          <Alert variant="danger">
            The username and password you entered did not match our records.
            Please double-check and try again.
          </Alert>
        )}
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
          <div>
            <Button variant="link" style={{ float: "left" }}>
              Forgot password?
            </Button>
            <Button variant="link" style={{ float: "right" }} onClick={() => {history.push("/register")}}>
              Sign up for Twitter
            </Button>
          </div>
        </Form>
      </Container>
    </div>
  );
};
