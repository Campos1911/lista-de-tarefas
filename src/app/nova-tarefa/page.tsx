"use client";

import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface NotasTypesExceptId {
  titulo: string;
  dataFinal: string;
  descricao: string;
  feito: boolean;
}

interface dataTypes {
  dia: number;
  mes: number;
  ano: number;
}

export default function NovaTarefa() {
  const [novaTarefa, setNovaTarefa] = useState<NotasTypesExceptId>({
    titulo: "",
    dataFinal: "",
    descricao: "",
    feito: false,
  });

  const [dataNotFormatted, setDataNotFormatted] = useState<dataTypes>({
    dia: 0,
    mes: 0,
    ano: 0,
  });

  const today = new Date();

  const todayDate = {
    dia: today.getDate(),
    mes: today.getMonth() + 1,
    ano: today.getFullYear(),
  };

  const { toast } = useToast();

  const router = useRouter();
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  function inputDateToStringBR(inputDateValue: string): string {
    // Verifica se o valor fornecido não é vazio
    if (!inputDateValue) {
      throw new Error("O valor fornecido não é válido.");
    }

    // Cria um objeto Date a partir do valor do input
    const date = new Date(inputDateValue);

    // Verifica se o objeto Date é válido
    if (isNaN(date.getTime())) {
      throw new Error("O valor fornecido não é uma data válida.");
    }

    // Extrai o dia, mês e ano da data
    let day: number = date.getDate();
    let month: number = date.getMonth() + 1; // Os meses em JavaScript vão de 0 a 11
    let year: number = date.getFullYear();

    setDataNotFormatted({
      dia: day,
      mes: month,
      ano: year,
    });

    // Formata o dia e mês para dois dígitos (com zero à esquerda, se necessário)
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    // Retorna a data formatada no formato DD/MM/AAAA
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  async function criarTarefa(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (
      novaTarefa.titulo === "" ||
      novaTarefa.dataFinal === "" ||
      novaTarefa.descricao === ""
    ) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else if (todayDate.ano > dataNotFormatted.ano) {
      toast({
        title: "Erro",
        description: "Insira uma data válida",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else if (
      todayDate.ano <= dataNotFormatted.ano &&
      todayDate.mes > dataNotFormatted.mes
    ) {
      toast({
        title: "Erro",
        description: "Insira uma data válida",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else if (
      todayDate.ano <= dataNotFormatted.ano &&
      todayDate.mes <= dataNotFormatted.mes &&
      todayDate.dia > dataNotFormatted.dia
    ) {
      toast({
        title: "Erro",
        description: "Insira uma data válida",
        duration: 3000,
        className: "bg-red-500 text-white border-none",
      });
    } else {
      const { data, error } = await supabase.from("Tarefas").insert([
        {
          titulo: novaTarefa.titulo,
          dataFinal: novaTarefa.dataFinal,
          descricao: novaTarefa.descricao,
          feito: false,
        },
      ]);
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
          description: "Tarefa criada, você será redirecionado!",
          duration: 3000,
          className: "bg-green-500 text-white border-none",
        });
      }

      setTimeout(() => {
        router.push("/quadro-geral");
      }, 2000);
    }
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center p-3">
      <Toaster />
      <div className="text-white flex flex-col gap-3 px-8 py-4 rounded-md bg-slate-900 shadow-md">
        <h1 className=" text-3xl pb-3">Criar nova tarefa</h1>

        <form onSubmit={criarTarefa} className="flex flex-col gap-3">
          <label>
            <h3>Nome da Tarefa:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 p-1"
              type="text"
              placeholder="Jogar o lixo fora"
              onChange={(e) =>
                setNovaTarefa({
                  titulo: e.target.value,
                  dataFinal: novaTarefa.dataFinal,
                  descricao: novaTarefa.descricao,
                  feito: novaTarefa.feito,
                })
              }
            />
          </label>

          <label>
            <h3>Data final da Tarefa:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 p-1"
              type="date"
              onChange={(e) =>
                setNovaTarefa({
                  titulo: novaTarefa.titulo,
                  dataFinal: inputDateToStringBR(e.target.value),
                  descricao: novaTarefa.descricao,
                  feito: novaTarefa.feito,
                })
              }
            />
          </label>

          <label>
            <h3>Insira uma Descrição sobre a Tarefa:</h3>
            <input
              className="w-[100%] rounded-sm outline-none text-slate-800 pl-1 pt-1 pb-14"
              type="text"
              placeholder="Lixo da cozinha e do banheiro!"
              onChange={(e) =>
                setNovaTarefa({
                  titulo: novaTarefa.titulo,
                  dataFinal: novaTarefa.dataFinal,
                  descricao: e.target.value,
                  feito: novaTarefa.feito,
                })
              }
            />
          </label>
          <div className="w-[100%] flex gap-3 justify-between">
            <button
              type="submit"
              className="bg-slate-500 w-[50%] flex justify-center items-center hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Salvar
            </button>
            <Link
              href="/quadro-geral"
              className="bg-slate-500 w-[50%] flex justify-center items-center hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            >
              Voltar
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}
