import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useUpdateTweetMutation } from "../generated/graphql";
import Button from "react-bootstrap/Button";
import { useHistory } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

interface IProps {
  match: any;
}

export const Edit = ({ match }: IProps) => {
  const [content, setContent] = useState("");
  const [editTweet] = useUpdateTweetMutation();

  let history = useHistory();
  // Cast the value id as a number - TS
  const id: number = +match.params.id;

  const handleEdit = async (e: any) => {
    e.preventDefault();
    try {
      let response = await editTweet({
        variables: {
          id: id,
          contentUpdate: content,
        },
      });
      // console.log(response);
      // Add refresh
      history.push("/home");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form onSubmit={handleEdit}>
      <Form.Row style={{ margin: "20px -5px" }}>
        <Col>
          <Form.Control
            placeholder="Tweet"
            key={match.params.id}
            name="projectedExpense"
            value={content}
            onChange={(e) => {
              e.preventDefault();
              setContent(e.target.value);
            }}
            required
          />
        </Col>
        <Button type="submit">Submit</Button>
      </Form.Row>
    </Form>
  );
};
