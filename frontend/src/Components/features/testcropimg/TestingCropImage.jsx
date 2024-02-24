import React, { useState } from "react";
function TestingCropImage() {
  const [imgcrop, setImgCrop] = useState(null);
  async function handleImage(e) {
    console.log(e.target.files[0]);
    console.log(URL.createObjectURL(e.target.files[0]));
  }
  function HandleSubmit(e) {
    e.preventDefault();
    console.log("ok");
  }
  return (
    <div>
      <form onSubmit={HandleSubmit}>
        <input type="file" accept="image/*" onChange={handleImage} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TestingCropImage;
