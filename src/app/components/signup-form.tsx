'use client';
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { useContext, useState } from "react";
import { AuthContext } from "../auth-provider";
import { LoginResponseType } from "../types/LoginResponse";
import { useRouter } from "next/navigation";

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const {setUser, setIsAuthenticated } = useContext(AuthContext);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    // const body: any = { action: mode, email, password };
    const body = { name, email, password };
    console.log(`===>>> body :: ${JSON.stringify(body)}`);
    // if (mode === 'register') body.name = name;
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    // const j = await res.json<{success: boolean}>();
    const j: LoginResponseType = await res.json<LoginResponseType>();
    if (j?.success) {
      // document.cookie = `token=${j.token}; path=/; max-age=3600`;
      // window.location.href = '/';
      setUser(j.user);
      setIsAuthenticated(true);
      localStorage.setItem('user', JSON.stringify(j.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(true));
      router.push('/'); 
    } else {
      alert('Error: ' + JSON.stringify(j));
    }
  }

  return (
    <Card {...props} className="w-full max-w-sm border-1 shadow-md/30 p-4">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Doe" required />
            </Field>
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
              {/* <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription> */}
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            {/* <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field> */}
            <FieldGroup>
              <Field>
                <Button type="submit" className="bg-black text-white">Create Account</Button>
                {/* <Button variant="outline" type="button">
                  Sign up with Google
                </Button> */}
                <FieldDescription className="px-6 text-center">
                  Already have an account? <a href="/login">Sign in</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
