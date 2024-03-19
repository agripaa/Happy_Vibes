import { useDispatch, useSelector } from "react-redux";
import { setUploadImage } from "../../../../../../../libs/redux/StoryReducer/StoryReducer";
import { useEffect, useState } from "react";

export default function ButtonEditImage() {
  const components = useSelector((state) => state.icons);
  const [uploadImageText, uploadImageTextSet] = useState("");
  const dispatch = useDispatch();

  const [dataImage, dataImageSet] = useState("");
  const [sizeImage, sizeImageSet] = useState({
    w: 0,
    h: 0,
  });
  function handleUpdloadFile(e) {
    const file = e.target.files[0];
    uploadImageTextSet(e.target.value);
    if (file) {
      const dataFile = URL.createObjectURL(file);
      dataImageSet(dataFile);
    }
  }

  function getAspectRatioImage() {
    const image = new Image();
    image.src = dataImage;
    image.onload = () => {
      sizeImageSet({
        w: image.width,
        h: image.height,
      });
    };

    let parsingAspectRatioImage =
      sizeImage.w > sizeImage.h
        ? "16 / 9"
        : sizeImage.w < sizeImage.h
        ? "9 / 16"
        : "1 / 1";
    dispatch(
      setUploadImage({ image: dataImage, aspectRatio: parsingAspectRatioImage })
    );
  }

  useEffect(() => {
    getAspectRatioImage();
  }, [dataImage]);

  return (
    <div className="ChooseEditImage">
      <label
        htmlFor="imageStory"
        className="WrapButtonImageStory bcolor-primary-400 cursor-pointer"
      >
        <div className="ButtonImageStory">
          <img src={components.IconUploadImgStory} alt="" />
          <span> Upload Image</span>
        </div>
      </label>
      <input
        type="file"
        id="imageStory"
        onChange={handleUpdloadFile}
        style={{ display: "none" }}
      />
      <p className="paragraph-semibold">{uploadImageText}</p>
    </div>
  );
}
