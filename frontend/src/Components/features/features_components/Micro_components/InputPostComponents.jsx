import React from "react";
import "../../../css/PostStatus.scss";
import { useSelector } from "react-redux";
import PostSubmit from "./MiniMicro_Components/PostSubmit";
import PostCropImageSubmit from "./MiniMicro_Components/PostCropImageSubmit";
function InputPostComponents() {
  const postComponent = useSelector((state) => state.PostReducer);
  const checkCrop = useSelector((state) => state.CheckMyPostReducer);
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
