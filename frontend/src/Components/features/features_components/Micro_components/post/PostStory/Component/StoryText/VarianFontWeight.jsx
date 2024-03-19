import { useDispatch } from "react-redux";
import { setTextStoryinFontWeight } from "../../../../../../../libs/redux/StoryReducer/StoryReducer";

export default function ChooseVariantText({ listVariant }) {
  const dispatch = useDispatch();
  return (
    <div className="chooseFont">
      {listVariant?.map((font, index) => {
        return (
          <p
            onClick={() => dispatch(setTextStoryinFontWeight(font.weightFont))}
            key={index}
            style={{ fontWeight: font.weightFont }}
            className="paragraph-semibold cursor-pointer"
          >
            {font.text}
          </p>
        );
      })}
    </div>
  );
}
