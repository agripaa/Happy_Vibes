import React from "react";
import "../../../../css/AlertReportPosting.scss";
import ImageAlert from "../../../../img/alert-red.svg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CheckBugReportPost } from "../../../../libs/redux/CheckReducer/Check";

function AlertReportPosting() {
  const dispatch = useDispatch();
  const { postId } = useSelector((state) => state.check);

  async function handleReport() {
    try {
      await axios
        .post(`http://localhost:5000/report/${postId}/posting`, null, {
          withCredentials: true,
        })
        .then(({ data }) => {
          toast.success(data.msg);
        });
    } catch (err) {}
  }

  return (
    <div className="AlertReportPosting">
      <div className="WrapContainerARP">
        <main className="SquareARP">
          <header className="HeaderARP">
            <div className="imgAlert">
              <img src={ImageAlert} alt="" />
            </div>
            <div className="TextHeaderAlert">
              <p>Are you sure for Report this Posting?</p>
            </div>
          </header>
          <article className="ArticleARP">
            <section className="TextArticleARP">
              <p>
                I agree that this post is intended or contains toxic, bullying,
                harsh words, hoaxes and others. Which can make the public or
                other users consumed by this post. With this I want to file a
                report on this post so that it is deleted
              </p>
            </section>
            <section className="ButtonArticleARP">
              <div className="containerButtonRed">
                <button className="ButtonRedARP" onClick={handleReport}>
                  Yes, i will Report this posting
                </button>
              </div>
              <div className="containerButtonRegular">
                <button
                  className="ButtonRegularARP"
                  onClick={() => dispatch(CheckBugReportPost(false))}
                >
                  No, i will not Report
                </button>
              </div>
            </section>
          </article>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AlertReportPosting;
