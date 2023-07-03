export const CHECKDELETE = "CHECKDELETE";
export const CHECKDELETENAV = "CHECKDELETENAV";
export const CHECKBUGREPORTNAV = "CHECKBUGREPORTNAV";

let InitialState = {
  dltCheck: false,
  dltCheckNav: false,
  CheckBugReport: false,
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
    case CHECKBUGREPORTNAV:
      return {
        ...state,
        CheckBugReport: action.payload.checkBug,
      };
    default:
      return state;
  }
};

export default CheckDelete;
