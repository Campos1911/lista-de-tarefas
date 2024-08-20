"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCaretDown } from "react-icons/fa";

interface DropdownTypes {
  titulo: string;
  filtro: string;
  setFiltro: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ titulo, filtro, setFiltro }: DropdownTypes) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-slate-500 flex items-center justify-center gap-1 text-white outline-none md:p-2 p-1 rounded-md md:text-base text-sm">
        {titulo}
        <FaCaretDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {titulo === "Filtrar por status" ? (
          <>
            <DropdownMenuItem onClick={() => setFiltro("")}>
              Todas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFiltro("concluidas")}>
              Concluídas
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setFiltro("naoConcluidas")}>
              Não Concluídas
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dropdown;
