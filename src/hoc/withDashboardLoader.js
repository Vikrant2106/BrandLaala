import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

function withDashboardAuthLoader(Component) {
  return function AuthLoader(props) {
    const isLoading = useSelector(({ dashboard }) => dashboard.isLoading);

    return (
      <>
        {isLoading && <Loader bg="rgba(255,255,255)" />}
        <Component {...props} />
      </>
    );
  };
}

export default withDashboardAuthLoader;
