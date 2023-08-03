import React from "react";
import "../../../../css/AlertDeletePosting.scss";
import ImageAlert from "../../../../img/alert-red.svg";
import { useDispatch } from "react-redux";
import {
  CheckDeletePosting,
  DELETECHECK,
} from "../../../../Action/CheckAcconutDelete";
import axios from "axios";
import { useNavigate } from "react-router";

function AlertDeletePosting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function deletePosting() {
    try {
      await axios
        .delete("http://localhost:5000/delete/user", { withCredentials: true })
        .then(() => {
          navigate("/");
        });
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="AlertDeletePosting">
      <div className="WrapContainerADP">
        <main className="SquareADP">
          <header className="HeaderADP">
            <div className="imgAlert">
              <img src={ImageAlert} alt="" />
            </div>
            <div className="TextHeaderAlert">
              <p>
                Are you sure for deletting your Posting? its deleted forever
              </p>
            </div>
          </header>
          <article className="ArticleADP">
            <section className="TextArticleADP">
              <p>
                Please note that failure to act within the next 48 hours will
                result in permanent posting deletion. Once your posting is
                deleted, all data associated with it will be irretrievable, and
                you will need to create a new posting to access our services.
              </p>
            </section>
            <section className="ButtonArticleADP">
              <div className="containerButtonRed">
                <button className="ButtonRedADP" onClick={deletePosting}>
                  Yes, i will delete my posting
                </button>
              </div>
              <div className="containerButtonRegular">
                <button
                  className="ButtonRegularADP"
                  onClick={() => dispatch(CheckDeletePosting(false))}
                >
                  No, i will not deleted
                </button>
              </div>
            </section>
          </article>
        </main>
      </div>
    </div>
  );
}

export default AlertDeletePosting;
