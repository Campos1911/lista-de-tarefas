export interface NotasTypes {
  titulo: string;
  dataFinal: string;
  descricao: string;
}

export default function Notas({ titulo, dataFinal, descricao }: NotasTypes) {
  return (
    <div className="w-[100%] flex flex-col gap-2 bg-slate-900 max-h-56 overflow-hidden px-5 py-3 rounded-md">
      <h1 className="text-white text-2xl">{titulo}</h1>
      <h2 className="text-gray-400">Data final: {dataFinal}</h2>
      <p className="text-gray-300">{descricao}</p>
    </div>
  );
}
