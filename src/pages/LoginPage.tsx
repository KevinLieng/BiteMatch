import { useState } from "react";
import { useNavigate } from "react-router-dom";

type LoginPageProps = {
  onLogin?: (user: { email: string; name: string }) => void;
};

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      alert("Enter email and password");
      return;
    }

    onLogin?.({
      email,
      name: email.split("@")[0],
    });

    navigate("/dashboard");
  }

  return (
    <main className="min-h-screen bg-slate-50 grid place-items-center px-6 font-sans">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-4xl font-bold text-slate-900">BiteMatch</h1>
        <p className="mt-2 text-slate-500">Find food everyone agrees on.</p>

        <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
          <label className="grid gap-2 font-semibold text-slate-700">
            Email
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-red-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              type="email"
            />
          </label>

          <label className="grid gap-2 font-semibold text-slate-700">
            Password
            <input
              className="rounded-xl border border-slate-300 px-4 py-3 text-base outline-none focus:border-red-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
          </label>

          <button
            className="mt-2 rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-600"
            type="submit"
          >
            Log in
          </button>
        </form>
      </section>
    </main>
  );
}