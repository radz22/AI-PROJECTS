import "./App.css";
import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { getFromLocalStorage } from "./services/localstorage/localStorageService";
const Home = lazy(() =>
  import("./pages/Home").then((module) => ({ default: module.Home }))
);
const Signin = lazy(() =>
  import("./pages/Signin").then((module) => ({ default: module.Signin }))
);
const Signup = lazy(() =>
  import("./pages/Signup").then((module) => ({ default: module.Signup }))
);
const Settings = lazy(() =>
  import("./pages/Settings").then((module) => ({ default: module.Settings }))
);
const ResetPassword = lazy(() =>
  import("./pages/ResetPassword").then((module) => ({
    default: module.ResetPassword,
  }))
);
const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword").then((module) => ({
    default: module.ForgotPassword,
  }))
);
function App() {
  const login = getFromLocalStorage("login");

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={login ? <Home /> : <Signin />} />
            <Route path="/page/signup" element={<Signup />} />
            <Route path="/page/settings" element={<Settings />} />
            <Route path="/page/resetpassword" element={<ResetPassword />} />
            <Route
              path="/page/forgotpassword/:id"
              element={<ForgotPassword />}
            />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
