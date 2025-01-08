import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import SignInPage from "@/pages/signin";
import LogoutPage from "@/pages/logout";

import Wrapper from "@/components/Wrapper";
import { AuthProvider } from "@/components/authProvider";
import RequireAuth from "@/components/requireAuth";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <IndexPage />
            </RequireAuth>
          }
        />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="*" element={<div>Not found!</div>} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
