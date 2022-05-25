import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";

export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        {/* <Link to="/">
          <Icon name="home"></Icon>
        </Link> */}
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>



      <Header as="h2" floated="left">
        <Link to={`/profile/${user?.username}`}>
            {/* change image during styling */}
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
{" "}
        <Link to="/">
          <Icon name="home"></Icon>
        </Link>
        {" "}
        <Link to="/feeds">
          Feeds
        </Link>
        {" "}
        <Link to={`/gallery/${user?._id}`}>
          Gallery
        </Link> 
        {" "}
        <Link to={`/profile/${user.username}`}>
          Profile
        </Link>               
      </Header>
    </Segment>
  );
}