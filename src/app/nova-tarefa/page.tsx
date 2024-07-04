"use client";

import { NotasTypes } from "@/components/Notas/Notas";
import Link from "next/link";
import { useState } from "react";

export default function NovaTarefa() {
  const [novaTarefa, setNovaTarefa] = useState<NotasTypes>({
    titulo: "",
    dataFinal: "",
    descricao: "",
    feito: false,
  });

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

    // Formata o dia e mês para dois dígitos (com zero à esquerda, se necessário)
    const formattedDay: string = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth: string = month < 10 ? `0${month}` : `${month}`;

    // Retorna a data formatada no formato DD/MM/AAAA
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <main className="flex flex-col h-screen items-center justify-center">
      <div className="text-white flex flex-col gap-3 px-8 py-4 rounded-md bg-slate-900 shadow-md">
        <h1 className=" text-3xl pb-3">Criar nova tarefa</h1>

        <form
          onSubmit={() => console.log("criado")}
          className="flex flex-col gap-3"
        >
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
        </form>

        <div className="w-[100%] flex gap-3">
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-700 duration-200 px-7 py-2 rounded-md"
            onClick={() => console.log(novaTarefa)}
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
      </div>
    </main>
  );
}
