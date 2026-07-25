import LeftPanel from "../components/LeftPanel";
import LoginCard from "../components/LoginCard";

import "../styles/login.css";
import "../styles/leftpanel.css";
import "../styles/logincard.css";

const Login = () => {
  return (
    <div className="login-page">
      <LeftPanel />
      <LoginCard />
    </div>
  );
};

export default Login;