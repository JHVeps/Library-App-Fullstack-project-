import { BrowserRouter } from "react-router-dom";
import MainRoutes from "../mainroutes/MainRoutes";

import "./App.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <MainRoutes />
      </BrowserRouter>
    </div>
  );
};
export default App;
