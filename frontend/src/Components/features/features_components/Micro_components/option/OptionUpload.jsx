import React, { Fragment } from "react";
import "../../../../css/Option/OptionUpload.scss";
export default function OptionUpload({ popCome }) {
  return (
    <Fragment>
      {popCome && (
        <article
          className={`OptionUpload flex flex-justify-evenly bcolor-neutral-20 ${
            popCome && `activeOptionUpload`
          }`}
        >
          <section className="OptionUpload-Story">
            <p className="paragraph-semibold">Story</p>
          </section>
          <section className="OptionUpload-Post">
            <p className="paragraph-semibold">Post</p>
          </section>
        </article>
      )}
    </Fragment>
  );
}
