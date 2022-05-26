import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Image, Icon } from "semantic-ui-react";
import "./Header.css";
export default function PageHeader({ user, handleLogout }) {
  return (
    <Segment clearing>
      <Header as="h2" floated="right">
        { <Link to="/">
          <Icon name="home"></Icon>
        </Link> }
        <Link to="" onClick={handleLogout}>
          Logout
        </Link>
      </Header>



      <Header as="h2" floated="left">
        <Link className="navBarLink" to={`/profile/${user?.username}`}>
          <Image
            src={
              user?.photoUrl
                ? user?.photoUrl
                : "https://react.semantic-ui.com/images/wireframe/square-image.png"
            }
            avatar
          ></Image>
        </Link>
        
        {/* <Link className="navBarLink" to="/feeds">
          Feed
        </Link> */}
        
        <Link className="navBarLink" to={`/gallery/${user?._id}`}>
          Gallery
        </Link> 
       
        <Link className="navBarLink" to={`/profile/${user.username}`}>
          Profile
        </Link>  
        
        <Link className="navBarLink" to={`/account/${user.username}`}>
          Accounts
        </Link>             
      </Header>
    </Segment>
  );
}