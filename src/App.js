import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import Home from "./routes/Home"
import MyTimeTable from "./routes/MyTimeTable";
import MyPage from "./routes/MyPage";
function App() {
  return (<Router>
    <Routes>
      <Route path="/" element={<MyTimeTable/>}>
      </Route>
      <Route path="/Login" element={<Login />}>
      </Route>
      <Route path="/MyPage" element={<MyPage />}>
      </Route>
    </Routes>
  </Router>)
}

export default App;
