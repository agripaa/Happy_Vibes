import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHECKBUG } from "../../../../Action/CheckAcconutDelete";

function BugReport() {
  const components = useSelector((state) => state.ComponentImagePostReducer);
  const dispatch = useDispatch();
  return (
    <div className="Container-BugReportPop">
      <div className="wrap-BugReport">
        <div className="square-BugReport">
          <header className="Header-BugReport">
            <div className="textHeader-BugReport">
              <h1>Bug Report</h1>
            </div>
            <div className="ImgHeader-BugReport">
              <img
                src={components.Close}
                alt=""
                onClick={() => dispatch(CHECKBUG(false))}
              />
            </div>
          </header>
          <main className="main-BugReport">
            <form action="" className="FormBugReport">
              <div className="TitleForm-BugReport">
                <label htmlFor="">
                  <p>Title</p>
                </label>
                <div className="InputTitle">
                  <input type="text" />
                </div>
              </div>
              <div className="TextForm-BugReport">
                <label htmlFor="">
                  <p>What is it?</p>
                </label>
                <div className="InputDesc">
                  <textarea name="" id=""></textarea>
                </div>
              </div>
              <div className="Button-BugReport">
                <button type="submit" className="bcolor-primary-40">
                  Submit
                </button>
              </div>
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default BugReport;
