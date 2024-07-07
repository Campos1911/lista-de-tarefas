"use client";

import { NotasTypes } from "@/components/Notas/Notas";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Detalhes({ params }: { params: { nome: string } }) {
  const nomeTask = decodeURIComponent(params.nome.replace(/-/g, " "));
  const supabase = createClient();
  const [dadosTarefa, setDadosTarefa] = useState<NotasTypes[]>([]);

  useEffect(() => {
    const getDadosTarefa = async () => {
      const { data, error } = await supabase
        .from("Tarefas")
        .select("*")
        .like("titulo", `${nomeTask}`)
        .returns<NotasTypes[]>();
      setDadosTarefa(data as NotasTypes[]);
    };
    getDadosTarefa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      {dadosTarefa.map((tarefa, index) => (
        <div
          key={index}
          className="text-white flex flex-col gap-3 px-8 py-4 rounded-md bg-slate-900 shadow-md"
        >
          <h1 className=" text-3xl">{tarefa.titulo}</h1>

          <h3 className="text-gray-400">Data final: {tarefa.dataFinal}</h3>

          <button
            onClick={() => console.log(dadosTarefa)}
            type="submit"
            className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
          >
            Salvar nova tarefa
          </button>

          <Link
            href="/quadro-geral"
            className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
          >
            Voltar
          </Link>
        </div>
      ))}
    </main>
  );
}
