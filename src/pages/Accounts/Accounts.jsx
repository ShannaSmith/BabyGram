import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Image, Grid, Header } from "semantic-ui-react";
import PageHeader from "../../components/Header/Header";
import userService from "../../utils/userService";

export default function Accounts({ user, handleLogout }) {
  const [grantedUsers, setGrantedUsers] = useState([]);
  const navigate = useNavigate();

  async function getGrantedUsers() {
    try {
      const data = await userService.getGrantedUsers();
      setGrantedUsers(data.map(u => u.owner));
    } catch (err) {
      console.log("err==>>", err);
    }
  }

  useEffect(() => {
    getGrantedUsers();
  }, []);
  
  return (
    <>
    <Grid centered>
    
         
          <Header as="h1" color="teal" textAlign="center"> Account Page</Header>
    
      <List>
        {grantedUsers.map((u, i) => (
          <List.Item onClick={() => navigate(`/profile/${u.username}`)} key={i}>
            <Image avatar src={u.photoUrl} />
            <List.Content>
              <List.Header as="a">{u.username}</List.Header>
              <List.Description>{u.bio}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
      </Grid>
    </>
  );
}
