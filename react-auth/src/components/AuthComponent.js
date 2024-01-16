import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

const cookies = new Cookies();
  const token = cookies.get("TOKEN");

export default function AuthComponent() {
  
  const [message, setMessage] = useState("");

  useEffect(() => {
    const configuration = {
      method: "get",
      url: "http://localhost:5001/auth-endpoint",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    // make the API call
    axios(configuration)
      .then((result) => {
        // assign the message in our result to the message we initialized above
        setMessage(result.data.message);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const logout = () => {
     // destroy the cookie
     cookies.remove("TOKEN", { path: "/" });
     window.location.href = "/";
  }
  return (
    <div className="text-center">
      <h1>Auth Component</h1>
      <h3 className="text-danger">{message}</h3>
      <Button type="submit" variant="danger" onClick={() => logout()}>
   Logout
</Button>


    </div>
  );
}
