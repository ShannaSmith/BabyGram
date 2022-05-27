import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { useParams } from "react-router-dom";

import PostGallery from "../../components/PostGallery/PostGallery";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import Loading from "../../components/Loader/Loader";
import postsAPI from "../../utils/postService";


export default function UserPostGallery({ user }) {
  const [posts, setPosts] = useState([]); // <- likes are inside of the each post in the posts array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userId } = useParams();

  // R read in crud
  async function getPosts() {
    try {
      const data = await postsAPI.getMyPosts(userId);
      setPosts([...data.posts]);
      setLoading(false);
    } catch (err) {
      setError(err.message);
    }
  }

  // useEffect runs once
  // the component is first rendered (whenever you first view the component)
  // Component Lifecycle in react
  useEffect(() => {
      
    getPosts();
  }, []);

  const addLike = async (postId) => {
    try {
      await postsAPI.addLike(postId);
      await getPosts();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeLike = async (postId) => {
    try {
      await postsAPI.removeLike(postId);
      await getPosts();
    } catch (err) {
      setError(err.message);
    }
  };   

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
    <Grid centered>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 450 }}>
          <PostGallery
            posts={posts}
            numPhotosCol={1}
            isProfile={false}
            loading={loading}
            addLike={addLike}
            removeLike={removeLike}
            user={user}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
