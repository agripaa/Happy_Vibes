import React, { Fragment } from "react";
import "../../../../../css/Option/OptionList/OptionList.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckReportAccount,
  CheckReportPosting,
} from "../../../../../libs/redux/CheckReducer/Check";
import OptionReportPost from "./ReportPost/OptionReportPost";
import OptionReportAccount from "./ReportAccount/OptionReportAccount";

export default function OptionList() {
  const dispatch = useDispatch();
  const { checkReportPosting, checkReportAccount } = useSelector(
    (state) => state.check
  );
  return (
    <Fragment>
      <article className="optionList flex flex-justify-between ">
        <section
          className="optionList-ReportPost cursor-pointer"
          onClick={() => dispatch(CheckReportPosting(true))}
        >
          <p className="color-danger-50">Report Post</p>
        </section>
        <section className="optionList-Unfollow cursor-pointer">
          <p className="color-danger-50">Unfollow</p>
        </section>
        <section
          className="optionList-ReportAccount cursor-pointer"
          role="button"
          onClick={() => dispatch(CheckReportAccount(true))}
        >
          <p className="color-danger-50">Report Account</p>
        </section>
        <section className="optionList-Bookmark cursor-pointer">
          <p>Bookmark</p>
        </section>
        <section className="optionList-CopyLink cursor-pointer">
          <p>Copy Link</p>
        </section>
        <section className="optionList-ShareTo cursor-pointer">
          <p>Share To</p>
        </section>
      </article>
      {checkReportPosting ? <OptionReportPost /> : null}
      {checkReportAccount ? <OptionReportAccount /> : null}
    </Fragment>
  );
}
