import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/authProvider";

function LogoutPage() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    auth.signout(() => {
      navigate("/signin");
    });
  }, []);

  return null;
}

export default LogoutPage;