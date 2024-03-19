import React, { Fragment } from "react";
import "../../../../css/Option/OptionUpload.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  CheckMyPostUser,
  CheckUploadStory,
} from "../../../../libs/redux/CheckReducer/Check";

export default function OptionUpload({ popCome }) {
  const dispatch = useDispatch();
  return (
    <Fragment>
      {popCome && (
        <article
          className={`OptionUpload flex flex-justify-evenly bcolor-neutral-20 ${
            popCome && `activeOptionUpload`
          }`}
        >
          <section
            className="OptionUpload-Story"
            onClick={() => dispatch(CheckUploadStory(true))}
          >
            <p className="paragraph-semibold">Story</p>
          </section>
          <section
            className="OptionUpload-Post"
            onClick={() => dispatch(CheckMyPostUser(true))}
          >
            <p className="paragraph-semibold">Post</p>
          </section>
        </article>
      )}
    </Fragment>
  );
}
