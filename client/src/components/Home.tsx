import React from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import { Loading } from "./Loading";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCurrentUserQuery, useTweetQuery } from "../generated/graphql";
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";
import "./Home.css";
import { useEffect } from "react";
import { useState } from "react";

export const Home = () => {
  // Need to get user that has just logged in - can use the authentication token
  const { loading, error, data } = useCurrentUserQuery();
  const { loading: loadingT, error: errorT, data: dataT } = useTweetQuery();

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (dataT === undefined) return <p>ERROR</p>;

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
          <CardGroup>
            <Row md={4} style={{ justifyContent: "space-evenly" }}>
              {dataT.tweets.map((tweet: any) => (
                <Card className="categoryCard" key={tweet._id}>
                  <Card.Body style={{ color: "black" }}>
                    <Card.Title>Some title</Card.Title>
                    <Card.Text>{tweet.content}</Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <small className="text-muted">
                      Last updated 3 mins ago
                    </small>
                  </Card.Footer>
                </Card>
              ))}
            </Row>
          </CardGroup>
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
