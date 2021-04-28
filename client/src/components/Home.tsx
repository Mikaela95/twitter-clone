import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import background from "../images/background_overlayed.png";
import animatedLogo from "../images/animated_logo.gif";
import Button from "react-bootstrap/Button";
import "./Home.css";

export const Home = () => {
  return (
    <Container fluid>
      <Row>
        <Col id="no-gutter">
          <div id="twitter-background">
            <Image src={background} fluid />
          </div>
        </Col>
        <Col>
          <div id="greeting">
            <Row>
              <Image id="bird" src={animatedLogo} alt="chirping bird" />
            </Row>
            <Row>
              <h1 id="heading">Happening now</h1>
            </Row>
            <Row>
              <h3 id="heading2">Join Twitter today.</h3>
            </Row>
            <Row>
              <Link to="/register">
                <Button id="primary-button" variant="primary" block>
                  Sign up
                </Button>
              </Link>
              <Link to="/login">
                <Button id="primary-button" variant="outline-primary" block>
                  Log in
                </Button>
              </Link>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
