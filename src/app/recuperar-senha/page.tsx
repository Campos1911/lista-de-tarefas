"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RecuperarSenha() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState<string>("");
  const [senha, setSenha] = useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email !== senha) {
      router.push("/quadro-geral");
    } else {
      toast({
        title: "Erro",
        description: "Usuário não encontrado!",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    }
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <div className="w-[32%] bg-slate-900 shadow-md p-8 rounded-md">
        <h1 className="text-3xl text-center">Recuperar sua conta</h1>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-3">
          <label>
            <h3>Insira o email associado a conta:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 p-1"
              type="text"
              name="login"
              id="login"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <div className="flex gap-3 w-full justify-between items-center mt-3">
            <button className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md">
              Recuperar minha conta
            </button>
            <Link
              href="/login"
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 duration-200 px-8 py-2 rounded-md"
            >
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
