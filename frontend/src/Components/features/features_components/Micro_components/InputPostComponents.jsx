import React from "react";
import "../../../css/PostStatus.scss";
import { useSelector } from "react-redux";
import PostSubmit from "./MiniMicro_Components/PostSubmit";
import PostCropImageSubmit from "./MiniMicro_Components/PostCropImageSubmit";
function InputPostComponents() {
  const postComponent = useSelector((state) => state.PostReducer);
  return (
    <div className="ContainerPostStatus">
      <div className="wrapPostStatus flex flex-complete-center">
        {postComponent.getImage ? <PostCropImageSubmit /> : <PostSubmit />}
      </div>
    </div>
  );
}

export default InputPostComponents;
