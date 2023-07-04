import React from "react";
import "../../../../css/AlertDeleteAccount.scss";
import ImageAlert from "../../../../img/alert-red.svg";
import { useDispatch } from "react-redux";
import { DELETECHECK } from "../../../../Action/CheckAcconutDelete";
function AlertDeleteAccount() {
  const dispatch = useDispatch();

  return (
    <div className="AlertDeleteAccount">
      <div className="WrapContainerADA">
        <main className="SquareADA">
          <header className="HeaderADA">
            <div className="imgAlert">
              <img src={ImageAlert} alt="" />
            </div>
            <div className="TextHeaderAlert">
              <p>
                Are you sure for deletting your account? its deleted forever
              </p>
            </div>
          </header>
          <article className="ArticleADA">
            <section className="TextArticleADA">
              <p>
                Please note that failure to act within the next 48 hours will
                result in permanent account deletion. Once your account is
                deleted, all data associated with it will be irretrievable, and
                you will need to create a new account to access our services.
              </p>
            </section>
            <section className="ButtonArticleADA">
              <div className="containerButtonRed">
                <button className="ButtonRedADA">
                  Yes, i will delete my account
                </button>
              </div>
              <div className="containerButtonRegular">
                <button
                  className="ButtonRegularADA"
                  onClick={() => dispatch(DELETECHECK(false))}
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

export default AlertDeleteAccount;
