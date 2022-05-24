import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import userService from "../../utils/userService";
import postService from "../../utils/postService";
import PageHeader from "../../components/Header/Header";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import ProfileBio from "../../components/ProfileBio/ProfileBio";
import PostGallery from "../../components/PostGallery/PostGallery";

export default function ProfilePage(props) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
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
        setLoading(() => false);
        setUser(() => data.user);
        setPosts(() => data.posts);
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
        console.log("logged in user==>>", data);
        setLoggedInUser(data);
        // setLoading(() => false);
        // setUser(() => data.user);
        // setPosts(() => data.posts);
      } catch (err) {
        console.log("err==>>", err);
        setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
      }
    }

    getLoggedInUser();
  }, [username]);  

  console.log("all users==>>", user, 'uuu', username);

  if (error) {
    return (
      <>
        <ErrorMessage error={error} />;
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <ProfileBio user={user} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column style={{ maxWidth: 750 }}>
          <PostGallery
            isProfile={true}
            posts={posts}
            numPhotosCol={3}
            user={props.user}
            addLike={postService.addLike}
            removeLike={postService.removeLike}
          />
        </Grid.Column>
      </Grid.Row>

      {loggedInUser?.username === username && <Grid.Row centered>
        <Grid.Row centered>
          <h1>Granted Users</h1>
          <div>
            <table>
              <thead>
                <th>Username</th>
                <th>Revoke</th>
              </thead>
              <tbody>
                {grantedUsers.map((u) => (
                  <tr>
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
                <th>Username</th>
                <th>Grant Access</th>
              </thead>
              <tbody>
                {deniedUsers.map((u) => (
                  <tr>
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
      </Grid.Row>}

    </Grid>
  );
}
