import { PresignedPost } from 'aws-sdk/clients/s3';
import { useEffect } from 'react';
import {Grid} from 'semantic-ui-react'
import userService from '../../utils/userService';

export default function ProfilePage(){
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const {username} = useParams();
    async function getProfile() {
        try{
            const data = await userService.getProfile(username);
            console.log(data, "<==data ");
            setLoading(() => false);
            setUser(() => datauser);
            setPosts(() => data.posts);
        } catch (err) {
            console.log(err);
            setError("Profile Doesn't exists, CHECK YOUR TERMINAL FOR EXPRESS!");
        }
    }
    useEffect(()=> {
        getProfile();
    }, []);
    if (error){
        return(
            <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <ErrorMessage error={error}/>;
            </>
        );
    }
    if(loading){
        return(
            <>
            <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            <Loading />
            </>
        );
    }
   return(
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <PageHeader handleLogout={props.handleLogout} user={props.user}/>
            </Grid.Column>
          </Grid.Row>
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
                addLike={addLike}
                removeLike={removeLike}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      );
}