import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import HomeScreen from "./Home/HomeScreen";
import InfoScreen from "./Info/InfoScreen";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/flights" />
        </Route>
        <Route exact path="/flights" component={HomeScreen}></Route>
        <Route exact path="/flights/:index" component={InfoScreen} />
      </Switch>
    </Router>
  );
}

export default App;
