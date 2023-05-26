import { Navigate, json } from "react-router-dom";

function AuthProtector({ children }) {

  const isLoggedIn = JSON.parse(localStorage.getItem("UD"))?.username !==undefined ?true :false

  if (!isLoggedIn) return <Navigate to="/login" />;

  return children;
}

export default AuthProtector;