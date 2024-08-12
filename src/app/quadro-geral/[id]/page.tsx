"use client";

import { NotasTypes } from "@/components/Notas/Notas";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Detalhes({
  params,
}: {
  params: { nome: string; id: number };
}) {
  const taskId: number = params.id;
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );
  const [dadosTarefa, setDadosTarefa] = useState<NotasTypes[]>([]);
  const [novoNome, setNovoNome] = useState<string>("");

  useEffect(() => {
    const getDadosTarefa = async () => {
      const { data, error } = await supabase
        .from("Tarefas")
        .select("*")
        .eq("id", `${taskId}`)
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

  async function concluirTarefa() {
    const { data, error } = await supabase
      .from("Tarefas")
      .update({ feito: !dadosTarefa[0].feito })
      .eq("id", dadosTarefa[0].id)
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

  async function editarNome() {
    const { data, error } = await supabase
      .from("Tarefas")
      .update({ titulo: novoNome })
      .eq("id", dadosTarefa[0].id)
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
        description: "Nome editado, a página será recarregada!",
        duration: 3000,
        className: "bg-green-500 text-white border-none",
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  async function excluirTarefa() {
    const { error } = await supabase
      .from("Tarefas")
      .delete()
      .eq("id", dadosTarefa[0].id);

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
    <main className="flex flex-col h-screen items-center justify-center p-3">
      {dadosTarefa.map((tarefa, index) => (
        <>
          <Toaster />
          <div
            key={index}
            className="text-white flex flex-col gap-3 lg:w-[30%] p-8 rounded-md bg-slate-900 shadow-md"
          >
            <h1 className=" text-3xl">{tarefa.titulo}</h1>

            <h3 className="text-gray-400">Data final: {tarefa.dataFinal}</h3>

            <button
              onClick={() => concluirTarefa()}
              className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              {tarefa.feito === false
                ? "Concluir tarefa"
                : "Marcar como não concluída"}
            </button>

            <Dialog>
              <DialogTrigger className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md">
                Editar nome
              </DialogTrigger>
              <DialogContent className="bg-slate-700 border-none text-white outline-none">
                <DialogHeader>
                  <DialogTitle className="font-normal">
                    Insira o novo nome da sua tarefa!
                  </DialogTitle>
                  <DialogDescription className="pt-2 flex flex-col gap-2">
                    <input
                      className="w-full rounded-md outline-none p-1"
                      onChange={(e) => setNovoNome(e.target.value)}
                    />
                    <div className="flex justify-center w-full">
                      <button
                        onClick={() => editarNome()}
                        className="bg-slate-900 hover:bg-slate-800 duration-200 text-white px-7 py-2 rounded-md w-[30%] "
                      >
                        Salvar
                      </button>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>

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
