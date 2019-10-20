import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomeScreen from "./Home/HomeScreen";
import InfoScreen from "./Info/InfoScreen";

// TODO: REDIRECT - '/' TO '/flights/' ___ OR ___ TO '/departures' AND '/arrivals'??

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeScreen} />
        <Route exact path="/flights/:index" component={InfoScreen} />
      </Switch>
    </Router>
  );
}

export default App;
