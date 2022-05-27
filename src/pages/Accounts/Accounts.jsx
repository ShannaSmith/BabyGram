import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { List, Image, Grid, Header } from "semantic-ui-react";
import userService from "../../utils/userService";

export default function Accounts() {
  const [grantedUsers, setGrantedUsers] = useState([]);
  const navigate = useNavigate();

  async function getGrantedUsers() {
    try {
      const data = await userService.getGrantedUsers();
      setGrantedUsers(data.map(u => u.owner));
    } catch (err) {
    }
  }

  useEffect(() => {
    getGrantedUsers();
  }, []);
  
  return (
    <>
    <Grid centered>
    
         
          <Header as="h1" color="teal" textAlign="center"> Account Page</Header>
    <Grid.Row float="left">
      <Grid.Column>
      <List>
        {grantedUsers.map((u, i) => (
          <List.Item onClick={() => navigate(`/profile/${u.username}`)} key={i}>
            <Image avatar src={u.photoUrl} />
            <List.Content>
              <List.Header className="accountName" as="a">{u.username}</List.Header>
              <List.Description className="accountTag">{u.bio}</List.Description>
            </List.Content>
          </List.Item>
        ))}
      </List>
      </Grid.Column>
      </Grid.Row>
      </Grid>
    </>
  );
}
