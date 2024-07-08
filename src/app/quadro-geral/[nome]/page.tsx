"use client";

import { NotasTypes } from "@/components/Notas/Notas";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Detalhes({ params }: { params: { nome: string } }) {
  const nomeTask = decodeURIComponent(params.nome.replace(/-/g, " "));
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const [dadosTarefa, setDadosTarefa] = useState<NotasTypes[]>([]);

  useEffect(() => {
    const getDadosTarefa = async () => {
      const { data, error } = await supabase
        .from("Tarefas")
        .select("*")
        .like("titulo", `${nomeTask}`)
        .returns<NotasTypes[]>();

      if (error) {
        toast({
          title: "Erro",
          description: error.message,
          duration: 3000,
          className: "bg-red-500 text-white border-none",
        });
      }

      setDadosTarefa(data as NotasTypes[]);
    };
    getDadosTarefa();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function atualizarTarefa() {
    const { data, error } = await supabase
      .from("Tarefas")
      .update({ feito: !dadosTarefa[0].feito })
      .eq("titulo", dadosTarefa[0].titulo)
      .select();

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Status atualizado!",
        duration: 3000,
        className: "bg-green-500 text-white border-none",
      });
    }
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  }

  async function excluirTarefa() {
    const { error } = await supabase
      .from("Tarefas")
      .delete()
      .eq("titulo", dadosTarefa[0].titulo);

    if (error) {
      toast({
        title: "Erro",
        description: error.message,
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else {
      toast({
        title: "Sucesso",
        description: "Tarefa excluída, você será redirecionado!",
        duration: 3000,
        className: "bg-green-500 text-white border-none",
      });
      setTimeout(() => {
        router.push("/quadro-geral");
      }, 3000);
    }
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      {dadosTarefa.map((tarefa, index) => (
        <>
          <Toaster />
          <div
            key={index}
            className="text-white flex flex-col gap-3 w-[30%] p-8 rounded-md bg-slate-900 shadow-md"
          >
            <h1 className=" text-3xl">{tarefa.titulo}</h1>

            <h3 className="text-gray-400">Data final: {tarefa.dataFinal}</h3>

            <button
              onClick={() => atualizarTarefa()}
              className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              {tarefa.feito === false
                ? "Concluir tarefa"
                : "Marcar como não concluída"}
            </button>

            <button
              onClick={() => excluirTarefa()}
              className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Excluir tarefa
            </button>

            <Link
              href="/quadro-geral"
              className="bg-slate-500 text-center hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Voltar
            </Link>
          </div>
        </>
      ))}
    </main>
  );
}
