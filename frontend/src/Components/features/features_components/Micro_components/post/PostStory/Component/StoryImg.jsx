import { useSelector } from "react-redux";
import PreviewStory from "../../../../../../img/PreviewStory.png";

export default function PostStoryImage({ dataTextStoryImageText }) {
  const dataImageStory = useSelector((state) => state.story);
  return (
    <figure className="PreviewStoryImage">
      <div
        className="BgImgStory"
        style={{ aspectRatio: dataImageStory.imageStory.aspectRatio }}
      >
        <img
          src={
            dataImageStory.imageStory?.image
              ? dataImageStory.imageStory.image
              : PreviewStory
          }
          alt=""
        />
        <p className="paragraph-regula color-white">{dataTextStoryImageText}</p>
      </div>
    </figure>
  );
}
