import { useSelector } from "react-redux";

export default function PostStorytext({ dataTextStoryText }) {
  const dataTextStory = useSelector((state) => state.story);
  const invisibleColorFont =
    dataTextStory.textStory?.bgColor === "#121212" ? "white" : "black";
  return (
    <figure className="PreviewStoryText">
      <div
        className="BgtextStory"
        style={{
          backgroundColor: dataTextStory.textStory.bgColor,
        }}
      >
        <p
          style={{
            color: invisibleColorFont,
            fontWeight: dataTextStory.textStory?.fontWeight,
          }}
        >
          {dataTextStoryText}
        </p>
      </div>
    </figure>
  );
}
