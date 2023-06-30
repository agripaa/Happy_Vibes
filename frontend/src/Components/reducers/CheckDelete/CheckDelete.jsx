export const CHECKDELETE = "CHECKDELETE";
export const CHECKDELETENAV = "CHECKDELETENAV";

let InitialState = {
  dltCheck: false,
  dltCheckNav: false,
};
const CheckDelete = (state = InitialState, action) => {
  switch (action.type) {
    case CHECKDELETE:
      return {
        ...state,
        dltCheck: action.payload.checkdlt,
      };
    case CHECKDELETENAV:
      return {
        ...state,
        dltCheckNav: action.payload.checkdltNav,
      };
    default:
      return state;
  }
};

export default CheckDelete;
