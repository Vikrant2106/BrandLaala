import { Navigate, json } from "react-router-dom";

function AuthProtector({ children }) {
    
  var data = localStorage.getItem("UD") != 'undefined' ?JSON.parse(localStorage.getItem("UD"))?.username : undefined;
  const isLoggedIn =data  !==undefined ?true :false


  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}

export default AuthProtector;