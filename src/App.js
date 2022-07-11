import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Login from "./routes/Login"
import Home from "./routes/Home"
import TimeTable from "./routes/TimeTable";

function App() {
  return <Router>
    <Switch>
      <Route path="/">
        <TimeTable />
      </Route>
      <Route path="/Login">
        <Login />
      </Route>
    </Switch>
  </Router>
}

export default App;
