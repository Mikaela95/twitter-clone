import React from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCurrentUserQuery } from "../generated/graphql";

export const Home = () => {
  const { data } = useCurrentUserQuery();
  // Need to get user that has just logged in - can use the authentication token

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <SideNavigation />
        </Col>
        <Col xs={6}>
          {data && data.currentUser ? (
            <p>the current user is: {data.currentUser.username}</p>
          ) : <p>The user is not currently logged in</p>}
          <Post />
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
