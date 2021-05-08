import React, { useEffect, useState } from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import { Loading } from "./Loading";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {
  useCurrentUserQuery,
  useDeleteTweetMutation,
  useTweetQuery,
  useUpdateTweetMutation,
} from "../generated/graphql";
import "./Home.css";
import { Dropdown } from "react-bootstrap";


export const Home = () => {
  const { loading, error, data } = useCurrentUserQuery();
  const { loading: loadingT, error: errorT, data: dataT } = useTweetQuery();
  const [
    deleteTweet,
    { loading: deleting, error: deleteError },
  ] = useDeleteTweetMutation();


  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (dataT === undefined) return <p>ERROR</p>;

  const currentUser = data?.currentUser?.username as string | undefined;

  const handleDelete = (id: number) => {
    deleteTweet({
      variables: { id: id },
    });
  };

  return (
    <Container style={{ marginTop: "50px" }}>
      <Row>
        <Col>
          <SideNavigation />
        </Col>

        <Col xs={6}>
          <Post />
          {data && data.currentUser ? (
            <CardColumns id="cardColumns" style={{ marginTop: "1rem" }}>
              {dataT.tweets.map((tweet: any) => (
                <Form>
                  <Card className="categoryCard" key={tweet.id}>
                    <Card.Header>
                      @{currentUser}
                      <Dropdown
                        style={{ display: "inline", marginLeft: "24rem" }}
                      >
                        <Dropdown.Toggle
                          variant="secondary"
                          id="dropdown-basic"
                        ></Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href={`/edit/${tweet.id}`}>
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            href="/home"
                            onClick={() => handleDelete(tweet.id)}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </Card.Header>
                    <Card.Body style={{ color: "black" }}>
                      <Card.Text>{tweet.content}</Card.Text>
                    </Card.Body>
                    <Card.Footer>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer>
                  </Card>
                </Form>
              ))}
            </CardColumns>
          ) : (
            <p>user not available</p>
          )}
        </Col>
        <Col>
          <Search />
        </Col>
      </Row>
    </Container>
  );
};
