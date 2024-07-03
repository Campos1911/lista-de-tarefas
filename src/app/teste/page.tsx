"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email === senha) {
      router.push("/quadro-geral");
    }
  }

  return (
    <div className="text-white flex flex-col h-screen items-center justify-center">
      <div className="w-[32%] bg-slate-900 p-8 rounded-md">
        <h1 className="text-3xl text-center">Quadro de Notas</h1>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <label>
            <h3>Nome de usuário:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 p-1"
              type="text"
              name="login"
              id="login"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            <h3>Senha:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 p-1"
              type="password"
              name="password"
              onChange={(e) => setSenha(e.target.value)}
              id="password"
            />
          </label>

          <div className="flex gap-3 items-center mt-3">
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Login
            </button>
            <p className="text-sm">
              Esqueceu sua senha?{" "}
              <a
                href="/quadro-geral"
                className="hover:text-slate-300 duration-200"
              >
                Clique aqui!
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
