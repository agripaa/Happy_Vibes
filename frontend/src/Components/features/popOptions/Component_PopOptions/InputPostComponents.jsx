import React from "react";
import "../../../css/Post/PostStatus.scss";
import { useSelector } from "react-redux";
import PostSubmit from "../../features_components/Micro_components/post/PostSubmit";
import PostCropImageSubmit from "../../features_components/Micro_components/post/PostCropImageSubmit";
function InputPostComponents() {
  const postComponent = useSelector((state) => state.images);
  const checkCrop = useSelector((state) => state.check);
  return (
    <div className="ContainerPostStatus">
      <div className="wrapPostStatus flex flex-complete-center">
        {postComponent.getImage && !checkCrop.checkImageTrueCrop ? (
          <PostCropImageSubmit />
        ) : checkCrop.checkImageTrueCrop || !postComponent.getImage ? (
          <PostSubmit />
        ) : null}
      </div>
    </div>
  );
}

export default InputPostComponents;
