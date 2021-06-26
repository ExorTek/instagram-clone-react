import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { lazy, Suspense } from "react";
import * as ROUTES from "../../instagram-clone-react/src/constants/routes";
import { ToastContainer } from "react-toastify";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Router>
      <ToastContainer position="bottom-right" />
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          <Route path={ROUTES.LOGIN} component={Login} />
          <Route path={ROUTES.SIGN_UP} component={SignUp} />
          <Route path={ROUTES.DASHBOARD} component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
