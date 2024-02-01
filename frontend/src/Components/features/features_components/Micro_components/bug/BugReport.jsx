import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CHECKBUG } from "../../../../redux/CheckReducer/Check";
import LoadingCircle from "../../../Loading/LoadingCircle";

function BugReport() {
  const components = useSelector((state) => state.icons);
  const dispatch = useDispatch();
  const [doneBugReport, setDoneBugReport] = useState(false);
  const [values, setValues] = useState({
    title: "",
    type_bug: "",
    report: "",
  });

  async function sendBugReport(e) {
    e.preventDefault();
    const { title, type_bug, report } = values;
    setDoneBugReport(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type_bug", type_bug);
    formData.append("report", report);

    try {
      await axios
        .post("http://localhost:5000/bugreport", formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        })
        .then(({ data }) => {
          setDoneBugReport(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (err) {
      console.error(err);
    }
  }

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }
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
          <form onSubmit={sendBugReport}>
            <main className="main-BugReport">
              <div className="TitleForm-BugReport">
                <label htmlFor="">
                  <p>Title : </p>
                </label>
                <div className="InputTitle">
                  <input type="text" onChange={handleChange} name="title" />
                </div>
                <div className="input_type-bug">
                  <label htmlFor="">
                    <p>Type Bug : </p>
                  </label>
                  <div className="InputTitle">
                    <select name="type_bug" id="" onChange={handleChange}>
                      <option value="">
                        <b>What's Trouble?</b>
                      </option>
                      <option value="function">Function</option>
                      <option value="design">Design</option>
                      <option value="other">Other...</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="TextForm-BugReport">
                <label htmlFor="">
                  <p>What is it?</p>
                </label>
                <div className="InputDesc">
                  <textarea
                    name="report"
                    onChange={handleChange}
                    value={values.report}
                    id=""
                  ></textarea>
                </div>
              </div>
              <div className="Button-BugReport">
                <button type="submit" className="bcolor-primary-40">
                  {!doneBugReport ? "Submit" : <LoadingCircle size="small" />}
                </button>
              </div>
            </main>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BugReport;
