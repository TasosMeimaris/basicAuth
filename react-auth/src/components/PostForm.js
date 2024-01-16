import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function postCard(props) {
  return <post></post>;
}

export default function PostForm(props) {
  const date = new Date().toLocaleDateString("en-GB");
  return (
    <post>
      <div class="post">
        <div class="headerPost">
          <span>{props.name}</span>
        </div>
        <div class="main-text">
          <p>{props.text}.</p>
        </div>
        <div class="footer">
          <span>{date}</span>
        </div>
      </div>

      <Button type="submit" variant="warning">
        Submit
      </Button>
    </post>
  );
}
