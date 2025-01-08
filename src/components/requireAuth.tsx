import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/components/authProvider";

function RequireAuth({ children }: { children: React.ReactNode }) {
  let auth = useAuth();
  let location = useLocation();

  if (!auth.user) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

export default RequireAuth;
