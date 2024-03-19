import { useDispatch } from "react-redux";
import { setTextStoryinBgColor } from "../../../../../../../libs/redux/StoryReducer/StoryReducer";

export default function ChooseVariantColor({ listVariant }) {
  const dispatch = useDispatch();
  return (
    <div className="chooseColor">
      {listVariant?.map((color, index) => {
        return (
          <p
            onClick={() => dispatch(setTextStoryinBgColor(color.bgColor))}
            key={index}
            className="paragraph-semibold cursor-pointer"
          >
            {color.text}
          </p>
        );
      })}
    </div>
  );
}
