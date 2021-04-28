import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import twitterBackground from "../images/twitter_background.png";
import "./Home.css";

/* type IProps = {
  test: number
} */

export const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col id="no-gutter">
          <Image id="twitter-background" src={twitterBackground} fluid />
        </Col>
        <Col>2 of 2</Col>
      </Row>
    </Container>
  );
};
