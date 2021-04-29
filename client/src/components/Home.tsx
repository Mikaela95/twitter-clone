import React from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export const Home = () => {
  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <SideNavigation />
        </Col>
        <Col xs={6}>
          <Post />
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
