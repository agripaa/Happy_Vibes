import React from "react";
import "../../../../css/Alert/AlertDeletePosting.scss";
import ImageAlert from "../../../../img/alert-red.svg";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { useNavigate } from "react-router";
import { CheckDeletePosting } from "../../../../libs/redux/CheckReducer/Check";

function AlertDeletePosting() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { postId } = useSelector((state) => state.check);

  // async function deletePosting() {
  //   try {
  //     await axios
  //       .delete(`http://localhost:5000/posting/${postId}`, {
  //         withCredentials: true,
  //       })
  //       .then(() => {
  //         window.location.reload();
  //       });
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

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
                {/* <button className="ButtonRedADP" onClick={deletePosting}> */}
                <button className="ButtonRedADP">
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
