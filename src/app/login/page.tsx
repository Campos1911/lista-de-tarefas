"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  async function login(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL as string,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
    );

    // type-casting here for convenience
    // in practice, you should validate your inputs
    const data = {
      email: email,
      password: senha,
    };

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      toast({
        title: "Erro",
        description: "Usuário não encontrado!",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else {
      router.push("/quadro-geral");
    }
  }

  return (
    <div className="text-white flex flex-col h-screen items-center justify-center px-4">
      <Toaster />
      <div className="lg:w-[32%] bg-slate-900 shadow-md p-8 rounded-md">
        <h1 className="text-3xl text-center">Quadro de Notas</h1>

        <form onSubmit={login} className="mt-5 flex flex-col gap-3">
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

          <div className="flex gap-3 w-full justify-center items-center mt-3">
            <button
              type="submit"
              className="bg-slate-500 w-[50%] hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
