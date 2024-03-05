import React from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../../../../css/Option/OptionList/OptionReportPost.scss";
import {
  CheckReportPosting,
  CheckSubmitReport,
} from "../../../../../../libs/redux/CheckReducer/Check";
import { InitalValueRepotPost } from "./InitalValueReportPost";
export default function OptionReportPost() {
  const { Close, ArrowRight } = useSelector((state) => state.icons);
  const dispatch = useDispatch();
  return (
    <article className="Container-ReportOption flex flex-complete-center">
      <div className="OptionReportPost-Container">
        <header className="flex flex-complete-center ">
          <h2>Repost Post</h2>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            role="button"
            onClick={() => {
              dispatch(CheckReportPosting(false));
            }}
          />
        </header>
        <div className="OptionReportPost-Section flex flex-justify-between">
          <section
            onClick={() => {
              dispatch(
                CheckSubmitReport({
                  popUp: true,
                  index: 0,
                  typeReport: "Confirm",
                })
              );
              dispatch(CheckReportPosting(false));
            }}
          >
            <p className="paragraph-semibold">Ini Spam</p>
            <img src={ArrowRight} alt="Arrow" />
          </section>
          {InitalValueRepotPost?.map((value, index) => {
            return (
              <section
                key={index}
                onClick={() => {
                  dispatch(
                    CheckSubmitReport({
                      popUp: true,
                      index,
                      typeReport: "Posting",
                    })
                  );
                  dispatch(CheckReportPosting(false));
                }}
              >
                <p className="paragraph-semibold">{value}</p>
                <img src={ArrowRight} alt="Arrow" />
              </section>
            );
          })}
          <section
            onClick={() => {
              dispatch(
                CheckSubmitReport({
                  popUp: true,
                  index: 0,
                  typeReport: "Confirm",
                })
              );
              dispatch(CheckReportPosting(false));
            }}
          >
            <p className="paragraph-semibold">Saya hanya tidak menyukainya</p>
            <img src={ArrowRight} alt="Arrow" />
          </section>
        </div>
      </div>
    </article>
  );
}
