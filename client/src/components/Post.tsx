import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useCurrentUserQuery } from "../generated/graphql";
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";

// Able to send tweet and appear in feed - populate with dummy data that the user can comment, retweet and like

export const Post = () => {
  const { data } = useCurrentUserQuery();

  return (
    <Card>
      <Card.Header as="h5">Home</Card.Header>
      <Card.Body>
        <Card.Title>
          <Image
            src={profileImage}
            roundedCircle
            style={{ width: "50px", height: "50px" }}
          />
        </Card.Title>
        <Card.Text>
          <Form.Control
            id="tweet-input"
            placeholder="What's happening?"
          />
        </Card.Text>
        <Button variant="primary" type="submit">
          Tweet
        </Button>
      </Card.Body>
    </Card>
  );
};
