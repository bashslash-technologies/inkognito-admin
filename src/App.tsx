import React, { Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Spinner } from "evergreen-ui";

const LoginComponent = lazy(() => import("./pages/auth/login"));
const LayoutComponent = lazy(() => import("./components/layout"));

interface Props {}

const LoadingComponent = (props: Props) => {
  return (
    <Fragment>
      <Fragment>
        <div
          style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner />
        </div>
      </Fragment>
    </Fragment>
  );
};

const App = (props: Props) => {
  return (
    <Fragment>
      <BrowserRouter>
        <Suspense fallback={LoadingComponent({})}>
          <Switch>
            <Route
              name={"Login"}
              path={"/login"}
              exact={true}
              render={(props: any) => <LoginComponent {...props} />}
            />
            <Route
              path={"/"}
              render={(props) => <LayoutComponent {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
