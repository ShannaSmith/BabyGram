import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
export default function PostCard({
  post,
  isProfile,
  removeLike,
  addLike,
  user,
}) {
  // call the addLike or the removeLike when we click on the heart!

  // We need to know if the logged in user has liked this particular post!
  // we search the array of objects that is post.likes to see if the logged in users
  // id exists in that array of objects
  const userLikedPost = post.likes.some((userId) => JSON.stringify(userId) === JSON.stringify(user._id));
  const clickHandler = userLikedPost
    ? () => removeLike(post._id)
    : () => addLike(post._id);

  // if the logged users id exists, the heart should be red, because the logged in user has liked the post
  // and the clicked handler should removeLike
  const likeColor = userLikedPost ? "red" : "grey";

  // if the logged users id doesn't exist in the post.likes array, then the heart should be
  // grey, because the user hasn't liked the post, and the click handler should be addLike
  return (
    <Card key={post._id} raised>
      {isProfile ? (
        ""
      ) : (
        <Card.Content textAlign="left">
          <Card.Header>
            <Link to={`/gallery/${post.user._id}`}>
              <Image
                size="large"
                avatar
                src={
                  post.user.photoUrl
                    ? post.user.photoUrl
                    : "https://react.semantic-ui.com/images/wireframe/square-image.png"
                }
              />
              {post.user.username}
            </Link>
          </Card.Header>
        </Card.Content>
      )}

      <Image src={`${post.photoUrl}`} wrapped ui={false} />
      <Card.Content>
        <Card.Description>{post.caption}</Card.Description>
      </Card.Content>
      <Card.Content extra textAlign={"right"}>
        <Icon
          name={"heart"}
          size="large"
          color={likeColor}
          onClick={clickHandler}
        />
        {post.likes.length} Likes
      </Card.Content>
    </Card>
  );
}
