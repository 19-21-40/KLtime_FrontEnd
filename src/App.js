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
import MainPage from "./routes/mainpage";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";


// function Copyright(){
//   return(
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright ⓒ"}
//       19+21=40,{new Date().getFullYear}
//       {"."}
//     </Typography>
//   );
// }

function App() {

  return (<Router>
    <Routes>
      <Route path="/MyTimeTable" element={<MyTimeTable/>}>
      </Route>
      <Route path="/MainPage" element={<MainPage/>}>
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
    {/* <Copyright/> */}
  </Router>)
}

export default App;
