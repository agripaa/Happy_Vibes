import React from "react";
import OptionProfile from "../features_components/Micro_components/option/OptionProfile";
import "../../css/Option/TestOptions.scss";
export default function TestOptions() {
  return (
    <div className="Container_Test">
      <OptionProfile Optionse={true} responseCheck={true} />
    </div>
  );
}
