import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";
import './ProfilePage.css'
import userService from "../../utils/userService";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import ProfileBio from "../../components/ProfileBio/ProfileBio";

export default function ProfilePage() {
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const [grantedUsers, setGrantedUsers] = useState([]);
  const [deniedUsers, setDeniedUsers] = useState([]);

  const [loggedInUser, setLoggedInUser] = useState(null);

  async function getAllUsers() {
    try {
      const data = await userService.getAllUsers(username);
      setGrantedUsers(data.grantedUsers);
      setDeniedUsers(data.deniedUsers);
    } catch (err) {
      console.log("err==>>", err);
      setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
    }
  }

  useEffect(() => {
    getAllUsers();
  }, []);


  useEffect(() => {
    async function getProfile() {
      try {
        const data = await userService.getProfile(username);
        setUser(() => data.user);
      } catch (err) {
        console.log("err==>>", err);
        setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
      }
    }

    getProfile();
  }, [username]);
  useEffect(() => {
    async function getLoggedInUser() {
      try {
        const data = await userService.getLoggedInUser();
        setLoggedInUser(data);
      } catch (err) {
        console.log("err==>>", err);
        setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
      }
    }

    getLoggedInUser();
  }, [username]);

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />;
      </>
    );
  }

  return (
    <Grid>
      {user && <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>}

      {loggedInUser?.username === username && (
        <Grid.Row centered>
          <Grid.Row centered>
            <h1>Granted Users</h1>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Revoke</th>
                  </tr>
                </thead>
                <tbody>
                  {grantedUsers.map((u, i) => (
                    <tr key={i}>
                      <td>{u.username}</td>
                      <td>
                        <button
                          onClick={async () => {
                            await userService.revokeAccess(u._id);
                            await getAllUsers();
                          }}
                        >
                          Revoke
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid.Row>

          <Grid.Row centered>
            <h1>Denied Users</h1>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Grant Access</th>
                  </tr>
                </thead>
                <tbody>
                  {deniedUsers.map((u, i) => (
                    <tr key={i}>
                      <td>{u.username}</td>
                      <td>
                        <button
                          onClick={async () => {
                            await userService.grantAccess(u._id);
                            await getAllUsers();
                          }}
                        >
                          Grant
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Grid.Row>
        </Grid.Row>
      )}
    </Grid>
  );
}
