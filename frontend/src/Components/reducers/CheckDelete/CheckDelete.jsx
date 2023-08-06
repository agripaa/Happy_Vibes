export const CHECKDELETE = "CHECKDELETE";
export const CHECKDELETENAV = "CHECKDELETENAV";
export const CHECKEDITPROFIL = "CHECKEDITPROFIL";
export const CHECKBUGREPORTNAV = "CHECKBUGREPORTNAV";
export const CHECKBUGREPORTPOSTING = "CHECKBUGREPORTPOSTING";
export const CHECKDELETEPOSTING = "CHECKDELETEPOSTING";

let InitialState = {
  dltCheck: false,
  dltCheckNav: false,
  CheckBugReport: false,
  CheckBugReportPosting: false,
  checkEdit: false,
  dltCheckPosting: false,
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
    case CHECKEDITPROFIL:
      return {
        ...state,
        checkEdit: action.payload.checkEdit,
      };
    case CHECKDELETEPOSTING:
      return {
        ...state,
        dltCheckPosting: action.payload.dltCheckPosting,
      };
    case CHECKBUGREPORTPOSTING:
      return {
        ...state,
        CheckBugReportPosting: action.payload.CheckBugReportPosting,
      };
    default:
      return state;
  }
};

export default CheckDelete;
