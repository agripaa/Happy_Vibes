import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LikeButton = ({ postId, updatePost }) => {
  const [liked, setLiked] = useState(false);
  const components = useSelector((state) => state.ComponentImagePostReducer);

  useEffect(() => {
    fetchLikeStatus();
  }, []);

  const fetchLikeStatus = async () => {
    try {
      const {data} = await axios.get(`http://localhost:5000/like/${postId}`, {
        withCredentials: true,
      });
      setLiked(data.result);
    } catch (error) {
      console.error('Error while fetching like status:', error);
    }
  };

  const handleLike = async () => {
    try {
        await axios.post(
          'http://localhost:5000/like',
          { postId: postId  },
          { withCredentials: true }
        );

      updatePost(postId);
      setLiked(!liked);
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
