import React from "react";

import "../../css/Option/TestOptions.scss";
import OptionMore from "../features_components/Micro_components/option/OptionMore";
import OptionExplore from "../features_components/Micro_components/option/OptionUpload";
import OptionList from "../features_components/Micro_components/option/option-List/OptionList";
import OptionReportPost from "../features_components/Micro_components/option/option-List/ReportPost/OptionReportPost";
import OptionReportAccount from "../features_components/Micro_components/option/option-List/ReportAccount/OptionReportAccount";
export default function TestOptions() {
  return (
    <div className="Container_Test flex ">
      <OptionMore Optionse={true} responseCheck={true} />
      <OptionList />
      {/* <OptionReportPost /> */}
      {/* <OptionReportAccount /> */}
    </div>
  );
}
