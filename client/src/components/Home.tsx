import React from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCurrentUserQuery } from "../generated/graphql";
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";
import "./Home.css";

export const Home = () => {
  // Need to get user that has just logged in - can use the authentication token
  const { data } = useCurrentUserQuery();
  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <SideNavigation />
        </Col>
        <Col xs={6}>
          {data && data.currentUser ? (
            <div>
              <p>the current user is: {data.currentUser.username}</p>{" "}
            </div>
          ) : (
            <p>The user is not currently logged in</p>
          )}
          <Post />
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
