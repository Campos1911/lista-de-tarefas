import { Notas } from "@/components/Notas";
import { NotasTypes } from "@/components/Notas/Notas";
import Link from "next/link";

export default function Home() {
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
        {notas.map((nota, index) => (
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

const notas: NotasTypes[] = [
  {
    titulo: "Título 1",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: true,
  },
  {
    titulo: "Título 2",
    dataFinal: "03/02/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: false,
  },
  {
    titulo: "Título 3",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: false,
  },
  {
    titulo: "Título 4",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: false,
  },
  {
    titulo: "Título 5",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: false,
  },
  {
    titulo: "Título 6",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: true,
  },
  {
    titulo: "Título 7",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
    feito: true,
  },
];
