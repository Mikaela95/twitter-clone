import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from 'react-bootstrap/Form'

// Able to send tweet and appear in feed - populate with dummy data that the user can comment, retweet and like

export const Post = () => {
  return (
    <Card>
      <Card.Header as="h5">Home</Card.Header>
      <Card.Body>
        <Card.Title>User image to come</Card.Title>
        <Card.Text>
          <Form.Control id="tweet-input" type="password" placeholder="What's happening?" />
        </Card.Text>
        <Button variant="primary" type="submit">Tweet</Button>
      </Card.Body>
    </Card>
  );
};
