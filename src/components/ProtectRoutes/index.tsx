import { Navigate } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import { useAuthContext } from "../../auth/AuthContext";

interface PropsChildren {
  children: ReactNode;
}

const ProtectionRoute = ({ children }: PropsChildren) => {
  const { user, setUser } = useAuthContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("authenticatedUser");

    if (storedUser && !user) {
      setUser(JSON.parse(storedUser));
    }
  }, [user, setUser]);

  if (!user) {
    return <Navigate to={"/"} />;
  }

  return children;
};

export default ProtectionRoute;
