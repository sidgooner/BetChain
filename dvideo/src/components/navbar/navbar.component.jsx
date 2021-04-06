import React from 'react'

import { Navbar, Nav, NavDropdown, FormControl, Form, Button } from 'react-bootstrap'

import './navbar.styles.scss'
const Navbar1 = () => {
  return (

    <Navbar bg="dark" variant='dark' expand="lg">
      <Navbar.Brand href="/">BetChain</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/contests">Contests</Nav.Link>
          <Nav.Link href="/rules">Rules</Nav.Link>
          <Nav.Link href="/points">Point System</Nav.Link>

        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>

  )
}

export default Navbar1;