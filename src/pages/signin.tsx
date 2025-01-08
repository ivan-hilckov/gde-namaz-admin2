import AuthLayout from "@/layouts/auth";
import { CardBody, Input } from "@nextui-org/react";
import clsx from "clsx";
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setError(false);
  };

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setError(false);
  };

  const onSubmit = async () => {
    if (username && password) {
      setIsLoading(true);
      auth.signin(username, password, (hasError: boolean) => {
        setIsLoading(false);
        if (hasError) {
          setError(true);
        } else {
          navigate("/");
        }
      });
    } else {
      setError(true);
    }
  };

  if (auth.user) {
    return <Navigate to="/" />;
  }

  const isDisabled = !username || !password || isLoading;

  console.log(isDisabled);

  return (
    <AuthLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <Card isFooterBlurred className="max-w-[400px] w-[300px]">
          <CardBody>
            <div className="flex flex-col gap-4">
              <Input
                className="w-full"
                type="text"
                placeholder="логин"
                color={error ? "danger" : "default"}
                value={username}
                onChange={onUsernameChange}
                autoFocus
                isDisabled={isLoading}
              />
              <Input
                className={clsx("w-full", {
                  "text-pink": error,
                })}
                placeholder="пароль"
                value={password}
                color={error ? "danger" : "default"}
                onChange={onPasswordChange}
                isDisabled={isLoading}
                endContent={
                  <button
                    aria-label="toggle password visibility"
                    className="focus:outline-none "
                    type="button"
                    onClick={toggleVisibility}
                  >
                    {isVisible ? (
                      <EyeSlashFilledIcon
                        className={clsx(
                          "text-2xl text-default-400 pointer-events-none",
                          { "fill-danger": error, "fill-black": !error }
                        )}
                      />
                    ) : (
                      <EyeFilledIcon
                        className={clsx(
                          "text-2xl text-default-400 pointer-events-none ",
                          { "fill-danger": error, "fill-black": !error }
                        )}
                      />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
              {error && (
                <section className="p-3 text-[14px] text-danger bg-danger/20 rounded-xl">
                  Неправильный логин или пароль
                </section>
              )}
            </div>
          </CardBody>
          <CardFooter>
            <Button
              className="w-full"
              onPress={onSubmit}
              disabled={isDisabled}
              isLoading={isLoading}
            >
              Войти
            </Button>
          </CardFooter>
        </Card>
      </section>
    </AuthLayout>
  );
}
