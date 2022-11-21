import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import SignUp from "./routes/SignUp";
import MyTimeTable from "./routes/MyTimeTable";
import PasswdSearch from "./routes/PasswdSearch";
import MainPage from "./routes/mainpage";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Edit_TimeTable from "./components/Edit_TimaTable";
import { UserTableProvider } from "./context/UserTableContext";
import { UserInfoProvider } from "./context/UserInfoContext";
import "./App.css";


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

  return (
    <UserInfoProvider>
      <UserTableProvider>
        <Router>
          <Routes>
            <Route path="/" element={
              <MainPage />
            }>
            </Route>
            <Route path="/MyTimeTable" element={
              <MyTimeTable />
            }>
            </Route>
            <Route path="/SignUp" element={<SignUp />}>
            </Route>
            <Route path="/Login" element={<Login />}>
            </Route>
            <Route path="/PasswdSearch" element={<PasswdSearch />}>
            </Route>
          </Routes>
          {/* <Copyright/> */}
        </Router>
      </UserTableProvider>
    </UserInfoProvider>)
}

export default App;
