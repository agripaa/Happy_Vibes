import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../../../css/Option/OptionList/OptionReportAccount.scss";
import { InitalValueRepotAccount } from "./InitialValueReportAccount";
import { CheckReportAccount } from "../../../../../../libs/redux/CheckReducer/Check";

export default function OptionReportAccount() {
  const { Close, ArrowRight } = useSelector((state) => state.icons);
  const dispatch = useDispatch();
  return (
    <article className="OptionReportPost flex flex-complete-center">
      <div
        className="OptionReportPost-Bg"
        onClick={() => {
          dispatch(CheckReportAccount(false));
        }}
      ></div>
      <div className="OptionReportAccount-Container">
        <header className="flex flex-complete-center ">
          <h2>Report Account</h2>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            role="button"
            onClick={() => {
              dispatch(CheckReportAccount(false));
            }}
          />
        </header>
        <div className="OptionReportAccount-Section flex flex-justify-between">
          {InitalValueRepotAccount?.map((value, index) => {
            return (
              <section key={index}>
                <p>{value}</p>
                <img src={ArrowRight} alt="Arrow" />
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
