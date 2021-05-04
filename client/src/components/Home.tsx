import React from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import { Loading } from "./Loading";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useCurrentUserQuery, useTweetQuery } from "../generated/graphql";
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";
import "./Home.css";

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
          {data && data.currentUser ? (
            dataT.tweets.map((tweet: any) => <p>{tweet.id}</p>)
          ) : (
            <>something else</>
          )}
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
