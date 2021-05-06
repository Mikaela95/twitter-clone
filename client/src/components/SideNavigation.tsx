import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./SideNavigation.css";
import blueBird from "../images/2021_twitter_logo_blue.png";
import Image from "react-bootstrap/Image";
import { useLogoutMutation } from "../generated/graphql";
import { useHistory, Link } from "react-router-dom";

export const SideNavigation = () => {
  const [logout] = useLogoutMutation();

  let history = useHistory();

  /* const handleLogout = () => {
    logout()
    console.log("logout button")
  } */

  // Hack
  
  return (
    <Container style={{ margin: "0px" }}>
      <Col>
        <Row>
          <Image src={blueBird} style={{ width: "36px", marginLeft: "5px" }} />
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-house"></i>
            </span>
            Home
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-hash"></i>
            </span>
            Explore
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-bell"></i>
            </span>
            Notifications
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-envelope"></i>
            </span>
            Messages
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-bookmark"></i>
            </span>
            Bookmarks
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-file-text"></i>
            </span>
            Lists
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-person"></i>
            </span>
            Profile
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            <span className="btn-icon">
              <i className="bi bi-three-dots"></i>
            </span>
            More
          </Button>
        </Row>
        <Row>
          <Button onClick={() => {
            localStorage.setItem("accessToken", "");
            history.push("/");
          }} variant="outline-dark btn-lg" id="btn-outline-dark" >
            <span className="btn-icon">
              <i className="bi bi-person"></i>
            </span>
            Logout
          </Button>
        </Row>
        <Row>
          <Button variant="outline-dark btn-lg" id="btn-outline-dark">
            Tweet
          </Button>
        </Row>
      </Col>
    </Container>
  );
};
