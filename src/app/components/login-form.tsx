"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
import { Input } from "@/components/ui/input"
import { useContext, useState } from "react"
import { LoginResponseType } from "../types/LoginResponse"
import { AuthContext } from "../auth-provider"
import { useRouter } from "next/navigation"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setUser, setIsAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // const body: any = { action: mode, email, password };
    const body = { email, password };
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const j: LoginResponseType = await res.json<LoginResponseType>();
    if (j.success) {
      setUser(j.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(j.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      // window.location.href = '/';
      router.push('/'); 
    } else {
      alert('Error: ' + JSON.stringify(j));
    }

    // if (j?.token) {
    //   document.cookie = `token=${j.token}; path=/; max-age=3600`;
    //   window.location.href = '/';
    // } else {
    //   alert('Error: ' + JSON.stringify(j));
    // }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="w-full max-w-sm border-1 shadow-md/30 p-4">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="m@example.com"
                  required
                />
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required />
              </Field>
              <Field>
                <Button type="submit" className="bg-black text-white">Login</Button>
                {/* <Button variant="outline" type="button">
                  Login with Google
                </Button> */}
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
