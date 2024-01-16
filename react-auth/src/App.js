import { Container, Col, Row } from "react-bootstrap";
import {Route, Routes } from "react-router-dom";
import Account from "./components/Account";
import FreeComponent from "./components/FreeComponent";
import AuthComponent from "./components/AuthComponent";
import ProtectedRoutes from "./ProtectedRoutes";
import Wall from "./components/Wall";

function App() {
  return (
    <Container>
      <Row>
      <Col className="text-center">
        <header>
          <section id="navigation">
            <a href="/">Home</a>
            <a href="/free">Free Component</a>
            <a href="/auth">Auth Component</a>
            <a href="/wall">Post wall</a>
          </section>
          </header>
        </Col>
      </Row>
      <Routes>
        <Route path="/wall" element={<Wall />} />
        <Route path="/" element={<Account />} />
        <Route path="/free" element={<FreeComponent />} />
        <Route path="/auth" element={<ProtectedRoutes>
              <AuthComponent />
            </ProtectedRoutes>} />
      </Routes>
    </Container>
  );
}

export default App;
