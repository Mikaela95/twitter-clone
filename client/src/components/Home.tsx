import React, { useState } from "react";
import { SideNavigation } from "./SideNavigation";
import { Search } from "./Search";
import { Post } from "./Post";
import { Loading } from "./Loading";
import { ModalWindow } from "./ModalWindow";
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
import Image from "react-bootstrap/Image";
import profileImage from "../images/Mikaela_Verhoosel.jpg";
import { useHistory, Link } from "react-router-dom";
import "./Home.css";

export const Home = () => {
  // Need to get user that has just logged in - can use the authentication token
  const [edit, setEdit] = useState(false);
  const { loading, error, data } = useCurrentUserQuery();
  const { loading: loadingT, error: errorT, data: dataT } = useTweetQuery();
  const [
    deleteTweet,
    { loading: deleting, error: deleteError },
  ] = useDeleteTweetMutation();
  

  if (loading) return <Loading />;
  if (error) return <p>ERROR: {error.message}</p>;
  if (dataT === undefined) return <p>ERROR</p>;

  const handleDelete = () => {
    if (deleting) return;
    deleteTweet({
      variables: { id: dataT.tweets[0].id },
    });
  };

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
            <CardColumns id="cardColumns" style={{ marginTop: "1rem" }}>
              {dataT.tweets.map((tweet: any) => (
                <Form onSubmit={handleDelete}>
                  <Card className="categoryCard" key={tweet.id}>
                    <Card.Body style={{ color: "black" }}>
                      <Card.Title>Some title</Card.Title>
                      <Card.Text>{tweet.content}</Card.Text>
                      {console.log("this is the returned tweet", tweet)}
                    </Card.Body>
                    <Card.Footer>
                      <Button type="submit">Delete</Button>
                      <Link to={`/edit/${tweet.id}`}>
                        <Button variant="warning">Edit</Button>
                      </Link>
                      <small className="text-muted">
                        Last updated 3 mins ago
                      </small>
                    </Card.Footer>
                  </Card>
                </Form>
              ))}
            </CardColumns>
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
