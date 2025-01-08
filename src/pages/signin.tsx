import AuthLayout from "@/layouts/auth";
import { CardBody, Divider, Input } from "@nextui-org/react";
import { Card, CardFooter, Button } from "@nextui-org/react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/icons";
import { useAuth } from "@/components/authProvider";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onSubmit = async () => {
    auth.signin(username, password, (hasError: boolean) => {
      if (hasError) {
        setError(true);
      } else {
        navigate("/");
      }
    });
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <AuthLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card className="max-w-[400px]">
          <CardBody>
            <div className="flex flex-col gap-2">
              <Input
                className="max-w-xs"
                type="text"
                placeholder="логин"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={error}
                autoFocus
              />
              <Input
                className="max-w-xs"
                placeholder="пароль"
                value={password}
                errorMessage="Неправильный логин или пароль"
                isInvalid={error}
                onChange={(e) => setPassword(e.target.value)}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none"
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    ) : (
                      <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>
          </CardBody>
          <Divider />
          <CardFooter>
            <Button
              className="w-full"
              onPress={onSubmit}
              disabled={!username || !password}
            >
              Войти
            </Button>
          </CardFooter>
        </Card>
      </section>
    </AuthLayout>
  );
}
