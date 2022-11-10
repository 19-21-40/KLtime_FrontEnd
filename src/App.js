import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import SignUp from "./routes/SignUp";
import MyTimeTable from "./routes/MyTimeTable";
import MyPage from "./routes/MyPage";
import PasswdSearch from "./routes/PasswdSearch";
import MainPage from "./routes/mainpage";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import Klas from "./routes/Klas";
import Edit_TimeTable from "./components/Edit_TimaTable";
import { UserTableProvider } from "./context/UserTableContext";


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
      <Route path="/" element={<MainPage/>}>
      </Route>
      <Route path="/MyTimeTable" element={
      
      <UserTableProvider>
      <MyTimeTable/>
      </UserTableProvider>}>
      </Route>
      {/* <Route path="/EditTimeTable" element={<Edit_TimeTable/>}>
      </Route> */}
      <Route path="/SignUp" element={<SignUp />}>
      </Route>
      <Route path="/Login" element={<Login />}>
      </Route>
      <Route path="/MyPage" element={<MyPage />}>
      </Route>
      <Route path="/PasswdSearch" element={<PasswdSearch />}>
      </Route>
      <Route path="/Klas" element={<Klas />}>
      </Route>
    </Routes>
    {/* <Copyright/> */}
  </Router>)
}

export default App;
