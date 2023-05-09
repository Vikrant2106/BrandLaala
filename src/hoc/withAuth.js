import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { checkForTokenValidityAsyncThunk } from "../store/slices/init/init.slice";
import Loader from "../components/Loader/Loader";

function withAuth(Component) {
  return function ({ ...props }) {
    const isInitAuthCheckedDone = useSelector(
      ({ init }) => init.isInitAuthCheckedDone
    );
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(checkForTokenValidityAsyncThunk());
    }, [dispatch]);

    if (isInitAuthCheckedDone) return <Component {...props} />;
    return <Loader />;
  };
}

export default withAuth;
