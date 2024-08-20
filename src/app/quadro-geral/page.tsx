"use client";

import { Dropdown } from "@/components/Dropdown";
import { Notas } from "@/components/Notas";
import { NotasTypes } from "@/components/Notas/Notas";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [tarefas, setTarefas] = useState<NotasTypes[]>([]);
  const [filtro, setFiltro] = useState<string>("todos");

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
    <main className="p-4 gap-5 flex flex-col">
      <div className="flex w-full border-solid border-gray-600 border-b items-center justify-between p-2">
        <h1 className="text-white md:text-3xl">Quadro de Notas</h1>
        <Link
          href="/nova-tarefa"
          className="bg-slate-500 p-2 rounded-md md:text-base text-xs text-white hover:bg-slate-600 duration-200"
        >
          Criar nova tarefa
        </Link>
      </div>

      <div className="w-full grid md:flex grid-cols-2 gap-2 justify-end">
        <Dropdown
          titulo="Filtrar por status"
          filtro={filtro}
          setFiltro={setFiltro}
        />
      </div>

      <div className="grid lg:grid-cols-5 gap-3">
        {tarefas
          .filter((nota) =>
            filtro === "concluidas"
              ? nota.feito === true
              : filtro === "naoConcluidas"
              ? nota.feito === false
              : nota
          )
          .map((nota, index) => (
            <Notas
              key={index}
              titulo={nota.titulo}
              dataFinal={nota.dataFinal}
              descricao={nota.descricao}
              feito={nota.feito}
              id={nota.id}
            />
          ))}
      </div>
    </main>
  );
}
