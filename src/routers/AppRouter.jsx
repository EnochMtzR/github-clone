import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "../components/Main";
import NotFound from "../components/NotFound";

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route path="/" component={Main} exact={true} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
