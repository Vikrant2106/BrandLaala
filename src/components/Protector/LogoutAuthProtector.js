import { Navigate, json } from "react-router-dom";

function LogoutAuthProtector({ children }) {
    
  var data = localStorage.getItem("UD") != 'undefined' ?JSON.parse(localStorage.getItem("UD"))?.username : undefined;
  const isLoggedIn = data !==undefined ?true :false

  if (isLoggedIn) return <Navigate to="/dashboard" />;

  return children;
}

export default LogoutAuthProtector;