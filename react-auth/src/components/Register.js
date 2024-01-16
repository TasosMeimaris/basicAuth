import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Register() {
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState(false);

  const handleSubmit = (e) => {
    const configuration = {
      method: "post",
      url: "http://localhost:5001/register",
      data: {
        fName,
        lName,
        email,
        password,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        setRegister(true);
      })
      .catch((error) => {
        error = new Error();
      });

    // prevent the form from refreshing the whole page
    e.preventDefault();
  };
  return (
    <>
      <h2>Register</h2>
      <Form onSubmit={(e) => handleSubmit(e)}>
          {/* first name */}
          <Form.Group controlId="formBasicFName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="fName"
            name="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
            placeholder="Enter first Name"
          />
        </Form.Group>
          {/* last name */}
          <Form.Group controlId="formBasicLName">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="lName"
            name="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
            placeholder="Enter last name"
          />
        </Form.Group>
        {/* email */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </Form.Group>

        {/* password */}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        {/* submit button */}
        <Button
          variant="primary"
          type="submit"
          onClick={(e) => handleSubmit(e)}
        >
          Register
        </Button>
        {/* display success message */}
        {register ? (
          <p className="text-success">You Are Registered Successfully</p>
        ) : (
          <p className="text-danger">You Are Not Registered</p>
        )}
      </Form>
    </>
  );
}
