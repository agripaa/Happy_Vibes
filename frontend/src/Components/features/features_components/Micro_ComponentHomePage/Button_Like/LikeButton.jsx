import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LikeButton = ({ postId, liked, updateLikes, updatePost }) => {
  const components = useSelector((state) => state.ComponentImagePostReducer);

  const handleLike = async (e) => {
    e.preventDefault();
    try {
      if (liked) {
        await axios.delete(
          'http://localhost:5000/like',
          { data: { postId: postId } },
          { withCredentials: true }
        ).then(() => {
            updatePost(postId);
        })
      } else {
        await axios.post(
          'http://localhost:5000/like',
          { postId: postId },
          { withCredentials: true }
        );
      }
      updateLikes(!liked);
    } catch (error) {
      console.error('Error while handling like:', error);
    }
  };

  return (
    <>
      {liked ? (
          <img
          src={components.ImageLikeLove}
          alt=""
          role="button"
          onClick={handleLike}
        />
          ) : (
              <img
                src={components.ImageLove}
                alt=""
                role="button"
                className="LikeLove"
                onClick={handleLike}
              />
      )}
    </>
  );
};

export default LikeButton;
