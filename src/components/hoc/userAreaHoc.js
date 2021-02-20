import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';


const UserAreaHOC = (props) => {
  return (
    <>
      <Navbar bg="light" variant="light">
        <Nav className="mr-auto">
          <LinkContainer to="/user_area/profile">
            <Nav.Link>Profile</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/articles">
            <Nav.Link>Artikel</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/user_area/create">
            <Nav.Link>Creeren</Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar>
      <div>
        {props.children}
      </div>
    </>
  )
}

export default UserAreaHOC;
