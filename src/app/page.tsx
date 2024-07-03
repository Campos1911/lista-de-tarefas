import { Notas } from "@/components/Notas";
import { NotasTypes } from "@/components/Notas/Notas";

export default function Home() {
  return (
    <main className="p-4 gap-5 flex flex-col ">
      <h1 className="text-white text-3xl border-solid border-gray-600 border-b pb-3">
        Quadro de Notas
      </h1>

      <div className="grid grid-cols-5 gap-3">
        {notas.map((nota, index) => (
          <Notas
            key={index}
            titulo={nota.titulo}
            dataFinal={nota.dataFinal}
            descricao={nota.descricao}
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
  },
  {
    titulo: "Título 2",
    dataFinal: "03/02/2024",
    descricao: "Breve descrição sobre a tarefa",
  },
  {
    titulo: "Título 3",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
  },
  {
    titulo: "Título 1",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
  },
  {
    titulo: "Título 1",
    dataFinal: "03/06/2024",
    descricao: "Breve descrição sobre a tarefa",
  },
];
