import { useSelector } from "react-redux";
import { RootState } from "../../Store/store";

const useSession = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return { user, isLoggedIn };
};

export default useSession;
