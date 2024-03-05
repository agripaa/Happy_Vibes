import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../../../../../css/Option/OptionList/OptionSubmit.scss";
import {
  CheckReportPosting,
  CheckSubmitReport,
} from "../../../../../../libs/redux/CheckReducer/Check";
import { InitialValueDescriptionReportPost } from "../ReportPost/InitalValueReportPost";
import LoadingCircle from "../../../../../Loading/LoadingCircle";
export default function OptionSubmitReport() {
  const { checkSubmitReport } = useSelector((state) => state.check);
  const [loading, setLoading] = useState(false);
  const { Close, ArrowLeft, IconSuccessReport } = useSelector(
    (state) => state.icons
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
        dispatch(CheckSubmitReport({ popUp: false, index: 0, typeReport: "" }));
      }, 3000);
    }
  }, [loading]);
  return (
    <article className="Container-ReportOption flex flex-complete-center">
      {checkSubmitReport.typeReport === "Posting" ||
      checkSubmitReport.typeReport === "Account" ? (
        <SubmitReportPostingCrime
          ArrowLeft={ArrowLeft}
          Close={Close}
          checkSubmitReport={checkSubmitReport}
          loading={loading}
          setLoading={setLoading}
        />
      ) : checkSubmitReport.typeReport === "Spam" ||
        checkSubmitReport.typeReport === "ThisLike" ? (
        <SubmitReportSpamAndThisLike
          Close={Close}
          IconSuccessReport={IconSuccessReport}
          loading={loading}
          setLoading={setLoading}
        />
      ) : null}
    </article>
  );
}
// Submit report untuk List Pedoman
function SubmitReportPostingCrime({
  ArrowLeft,
  checkSubmitReport,
  Close,
  setLoading,
  loading,
}) {
  let fillReport =
    checkSubmitReport.typeReport === "Posting"
      ? InitialValueDescriptionReportPost[checkSubmitReport.index]
      : "";
  const dispatch = useDispatch();
  return (
    <Fragment>
      <section className="OptionSubmitReport bcolor-neutral-50 widthSubmitReport ">
        <header className="OptionSubmitReport-header flex flex-justify-between flex-align-center ">
          <img
            src={ArrowLeft}
            alt="back"
            className="cursor-pointer"
            role="button"
            onClick={() => {
              dispatch(CheckReportPosting(true));
              dispatch(
                CheckSubmitReport({ popUp: false, index: 0, typeReport: "" })
              );
            }}
          />
          <h2>Submit Report</h2>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer"
            role="button"
            onClick={() => {
              dispatch(CheckSubmitReport({ popUp: false, index: 0 }));
            }}
          />
        </header>
        <article className="OptionSubmitReport-content">
          <div className="OptionSubmitReport-WrapContent">
            <header className="content-header flex flex-complete-center ">
              <h3 className="heading-thin">{fillReport.title}</h3>
            </header>
            <section className="content-section">
              <p className="paragraph-semibold">Kami Menghapus : </p>
              <ul className="List-Content">
                {fillReport.description.map((value, index) => {
                  return (
                    <li key={index}>
                      <p className="paragraph-thin">{value}</p>
                    </li>
                  );
                })}
              </ul>
            </section>
            <section className="section-button">
              <button
                className="bcolor-primary-400 cursor-pointer "
                onClick={() => setLoading(true)}
              >
                {loading ? (
                  <LoadingCircle size="small" color="black" />
                ) : (
                  "Submit Report"
                )}
              </button>
            </section>
          </div>
        </article>
      </section>
    </Fragment>
  );
}
// Submit report Khusus Spam dan Tidak Menyukai Posting
function SubmitReportSpamAndThisLike({ Close, IconSuccessReport }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      <section className="OptionSubmitReport bcolor-neutral-50 widthSpamReport  ">
        <header className="OptionSubmitReport-header flex flex-complete-center ">
          <h2>Submit Report</h2>
          <img
            src={Close}
            alt="close"
            className="cursor-pointer closeSpam"
            role="button"
            onClick={() => {
              dispatch(
                CheckSubmitReport({ popUp: false, index: 0, typeReport: "" })
              );
            }}
          />
        </header>
        <article className="OptionSubmitReport-content">
          <div className="OptionSubmitReport-WrapContent">
            <header className="content-header flex flex-complete-center ">
              <img src={IconSuccessReport} alt="" />
            </header>
            <section className="content-section">
              <p
                className="paragraph-semibold"
                style={{ fontSize: "22px", textAlign: "center" }}
              >
                Terimakasih telah memberi tahu kami{" "}
              </p>
              <p
                className="paragraph-thin"
                style={{
                  fontSize: "16px",
                  letterSpacing: "0.5px",
                  paddingTop: "10px",
                  textAlign: "center",
                }}
              >
                Masukanmu sangat membantu kami menjaga kebahagiaan dalam
                komunitas
              </p>
            </section>
            <section className="section-button">
              <button
                className="bcolor-primary-400 cursor-pointer "
                onClick={() =>
                  dispatch(
                    CheckSubmitReport({
                      popUp: false,
                      index: 0,
                      typeReport: "",
                    })
                  )
                }
              >
                Close
              </button>
            </section>
          </div>
        </article>
      </section>
    </Fragment>
  );
}
