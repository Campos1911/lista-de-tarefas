"use client";

import { Notas } from "@/components/Notas";
import { NotasTypes } from "@/components/Notas/Notas";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient();
  const [tarefas, setTarefas] = useState<NotasTypes[]>([]);

  useEffect(() => {
    const getDados = async () => {
      const { data, error } = await supabase
        .from("Tarefas")
        .select("*")
        .returns<NotasTypes[]>();

      setTarefas(data as NotasTypes[]);
    };
    getDados();
  }, [supabase]);

  return (
    <main className="p-4 gap-5 flex flex-col ">
      <div className="flex w-full border-solid border-gray-600 border-b items-center justify-between p-2">
        <h1 className="text-white text-3xl pb-3">Quadro de Notas</h1>
        <Link
          href="/nova-tarefa"
          className="bg-slate-500 p-2 rounded-md text-white hover:bg-slate-600 duration-200"
        >
          Criar nova tarefa
        </Link>
      </div>

      <div className="grid grid-cols-5 gap-3">
        {tarefas.map((nota, index) => (
          <Notas
            key={index}
            titulo={nota.titulo}
            dataFinal={nota.dataFinal}
            descricao={nota.descricao}
            feito={nota.feito}
          />
        ))}
      </div>
    </main>
  );
}
