import { CHECKPOST } from "../reducers/PostReducer/PostCheck";

export const CheckMyPostUser = (check) => {
  return (dispatch) => {
    dispatch({
      type: CHECKPOST,
      payload: {
        checkpst: check,
      },
    });
  };
};
