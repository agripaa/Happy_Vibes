import { useState } from "react";
import { useSelector } from "react-redux";
import ChooseVariantColor from "./VarianBgColor";
import ChooseVariantText from "./VarianFontWeight";
export default function ButtonEditText({ disableButton }) {
  const [showVariantColor, showVariantColorSet] = useState(false);
  const [showVariantText, showVariantTextSet] = useState(false);
  const components = useSelector((state) => state.icons);
  const variantColor = [
    {
      text: "Orange",
      bgColor: "orange",
    },
    {
      text: "Pink",
      bgColor: "Pink",
    },
    {
      text: "Dark",
      bgColor: "#121212",
    },
    {
      text: "Light",
      bgColor: "white",
    },
  ];
  const variantFont = [
    {
      text: "Light",
      weightFont: 400,
    },
    {
      text: "Regular",
      weightFont: 500,
    },
    {
      text: "Medium",
      weightFont: 600,
    },
    {
      text: "Bold",
      weightFont: 700,
    },
    {
      text: "Extra Bold",
      weightFont: 800,
    },
  ];
  return (
    <div className="ChooseEditText">
      <div className="ChangeBgColor">
        <button
          type="button"
          disabled={disableButton.length ? false : true}
          className="button-choose"
          onClick={() => showVariantColorSet(!showVariantColor)}
        >
          <img src={components.IconChangeBgStory} alt="changeBgColor" />
          Change Background
        </button>
        {showVariantColor && <ChooseVariantColor listVariant={variantColor} />}
      </div>
      <div className="changeFont">
        <button
          type="button"
          disabled={disableButton.length ? false : true}
          className="button-choose"
          onClick={() => showVariantTextSet(!showVariantText)}
        >
          <img
            src={components.IconChangeFontStory}
            alt="changeFont"
            style={{ opacity: "0.5" }}
          />
          Change Font
        </button>
        {showVariantText && <ChooseVariantText listVariant={variantFont} />}
      </div>
    </div>
  );
}
