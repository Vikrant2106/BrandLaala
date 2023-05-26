import { Navigate, json } from "react-router-dom";

function LogoutAuthProtector({ children }) {

  const isLoggedIn = JSON.parse(localStorage.getItem("UD"))?.username !==undefined ?true :false

  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return children;
}

export default LogoutAuthProtector;