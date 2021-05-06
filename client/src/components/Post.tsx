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
import avatar from "../images/avatar.png";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Sticky from "react-sticky-el";
import { Col, OverlayTrigger, Row } from "react-bootstrap";
import "./Post.css";
import Tooltip from "react-bootstrap/Tooltip";
// Able to send tweet and appear in feed - populate with dummy data that the user can comment, retweet and like

export const Post = () => {
  const [content, setContent] = useState("");

  const { data } = useCurrentUserQuery();
  const [createTweet] = useCreateTweetMutation();

  const handleSubmit = async (e: any) => {
    console.log("button clicked");
    console.log("this is the data from user: ", data);
    // e.preventDefault();
    try {
      await createTweet({
        variables: { content },
      });
    } catch (e) {
      console.log(e);
    }
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Media
    </Tooltip>
  );

  return (
    <Card>
      <Card.Header as="h5">Home</Card.Header>
      <Card.Body>
        <Card.Text style={{ display: "inline" }}>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={2} style={{ marginBottom: "20px" }}>
                <Image
                  src={avatar}
                  roundedCircle
                  style={{ width: "50px", height: "50px" }}
                />
              </Col>
              <Col sm={10}>
                <Form.Control
                  id="tweet-input"
                  value={content}
                  placeholder="What's happening?"
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Button className="float-right" variant="primary" type="submit">
                  Tweet
                </Button>
                <OverlayTrigger
                  placement="bottom"
                  delay={{ show: 250, hide: 0 }}
                  overlay={renderTooltip}
                >
                  <Button id="post-icon" variant="outline-primary">
                    <i className="bi bi-image float-right"></i>
                  </Button>
                </OverlayTrigger>
                <Button id="post-icon" variant="outline-primary">
                  <i className="bi bi-film"></i>
                </Button>
                <Button id="post-icon" variant="outline-primary">
                  <i className="bi bi-bar-chart-line"></i>
                </Button>
                <Button id="post-icon" variant="outline-primary">
                  <i className="bi bi-emoji-smile"></i>
                </Button>
                <Button id="post-icon" variant="outline-primary">
                  <i className="bi bi-calendar"></i>
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
