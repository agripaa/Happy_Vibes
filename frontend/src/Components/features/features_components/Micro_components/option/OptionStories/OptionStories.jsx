import { FuncManageOptionsStories } from "@redux/StoryReducer/StoryReducer";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function OptionStories() {
  const { isManageOptionStories } = useSelector((state) => state?.story);
  const dispatch = useDispatch();
  return (
    <div className="DisplayOptionStories">
      <div className="DeleteStories">
        <p>Delete Stories</p>
      </div>
      <div
        className="ManageStories"
        onClick={(e) => dispatch(FuncManageOptionsStories(true))}
      >
        <p>Manage Stories</p>
      </div>
    </div>
  );
}
