import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import SignUp from "./routes/SignUp";
import Home from "./routes/Home"
import MyTimeTable from "./routes/MyTimeTable";
import MyPage from "./routes/MyPage";
import PasswdSearch from "./routes/PasswdSearch";
import Userinfo from "./routes/UserInfoTest";

function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<MyTimeTable/>}>
      </Route>
      <Route path="/SignUp" element={<SignUp />}>
      </Route>
      <Route path="/Login" element={<Login />}>
      </Route>
      <Route path="/MyPage" element={<MyPage />}>
      </Route>
      <Route path="/PasswdSearch" element={<PasswdSearch />}>
      </Route>
      <Route path="/Userinfo" element={<Userinfo />}>
      </Route>
    </Routes>
  </Router>)
}

export default App;
