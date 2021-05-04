import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useCreateTweetMutation,
  useCurrentUserQuery,
} from "../generated/graphql";
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Able to send tweet and appear in feed - populate with dummy data that the user can comment, retweet and like

export const Post = () => {
  const [content, setContent] = useState("");

  const { data } = useCurrentUserQuery();
  const [createTweet] = useCreateTweetMutation();

  const handleSubmit = async (e: any) => {
    console.log("button clicked");
    console.log("this is the data from user: ", data);
    e.preventDefault();
    try {
      await createTweet({
        variables: { content },
      });
    } catch (e) {
      console.log(e);
    }
  };

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
          <Form onSubmit={handleSubmit}>
            <Form.Control
              id="tweet-input"
              value={content}
              placeholder="What's happening?"
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
            <Button variant="primary" type="submit">
              Tweet
            </Button>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
