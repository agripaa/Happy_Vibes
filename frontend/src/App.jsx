import "./App.css";
import "./Components/css/Option/OptionBug.scss";
import "./Components/css/myLibrary.scss";
import "./Components/css/utils/GlobalPosting.scss";
import "./Components/css/utils/OptionReport.scss";
import PopOptions from "./Components/features/popOptions/PopOptions";
import RootRouting from "./route/route";

function App() {
  return (
    <>
      <PopOptions />
      <RootRouting />
    </>
  );
}

export default App;
