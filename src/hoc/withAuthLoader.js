import { useSelector } from "react-redux";
import Loader from "../components/Loader/Loader";

function withAuthLoader(Component) {
  return function AuthLoader(props) {
    const isLoading = useSelector(({ auth }) => auth.isLoading);

    return (
      <>
        {isLoading && <Loader />}
        <Component {...props} />
      </>
    );
  };
}

export default withAuthLoader;
