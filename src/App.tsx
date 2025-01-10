import { Route, Routes } from "react-router-dom";
import IndexPage from "@/pages/index";
import SignInPage from "@/pages/signin";
import LogoutPage from "@/pages/logout";
import { AuthProvider } from "@/components/auth-provider";
import RequireAuth from "@/components/require-auth";

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
