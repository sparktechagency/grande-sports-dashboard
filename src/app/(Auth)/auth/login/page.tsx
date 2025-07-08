"use client"
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("./_components/LoginForm"), {
  ssr: false, // Disable SSR
});

export default function LoginPage() {
  return <LoginForm />
}
