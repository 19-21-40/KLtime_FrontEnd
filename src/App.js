import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import Home from "./routes/Home"
import MyTimeTable from "./routes/MyTimeTable";

function App() {
  return <Router>
    <Switch>
      <Route path="/">
        <MyTimeTable />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
    </Switch>
  </Router>
}

export default App;
