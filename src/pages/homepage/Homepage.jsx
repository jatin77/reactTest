import React from "react";
import styled from "styled-components";
import UserList from "../../components/users/userList/UserList";
import UserDetail from "../../components/users/userList/userDetail/UserDetail";
import Logout from "../../components/logout/Logout";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-gap: 2rem;
  .userList {
    grid-row: 1/3;
  }
  .userDetail {
    grid-column: 2;
  }
`;

const Homepage = () => {
  return (
    <div className="container mx-auto pb-5">
      <Wrapper>
        <div className="userList">
          <UserList />
        </div>
        <div className="mt-8">
          <Logout />
        </div>
        <div className="userDetail">
          <UserDetail />
        </div>
      </Wrapper>
    </div>
  );
};

export default Homepage;
