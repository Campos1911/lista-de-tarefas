export interface NotasTypes {
  titulo: string;
  dataFinal: string;
  descricao: string;
  feito: boolean;
}

export default function Notas({
  titulo,
  dataFinal,
  descricao,
  feito,
}: NotasTypes) {
  let cor = "";

  if (feito === true) {
    cor = "bg-green-500";
  } else if (feito === false) {
    cor = "bg-red-500";
  }

  return (
    <div className="w-[100%] flex flex-col gap-2 shadow-md bg-slate-900 max-h-56 overflow-hidden px-5 py-3 rounded-md hover:scale-95 cursor-pointer duration-200">
      <div className="w-[100%] flex items-center justify-between">
        <h1 className="text-white text-2xl">{titulo}</h1>
        <div className={`w-3 h-3 rounded-full ${cor}`}></div>
      </div>
      <h2 className="text-gray-400">Data final: {dataFinal}</h2>
      <p className="text-gray-300">{descricao}</p>
    </div>
  );
}
