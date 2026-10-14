"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = { href: string; children: React.ReactNode };

export default function MenuLink({ href, children }: Props) {
  const caminho = usePathname();
  // A secao inteira fica ativa (/vagas/1 acende "Vagas"); a home e tratada a parte
  // porque todo caminho comeca com "/".
  const ativo = href === "/" ? caminho === "/" : caminho === href || caminho.startsWith(`${href}/`);

  return (
    <Link href={href} className={ativo ? "menu-link ativo" : "menu-link"} aria-current={ativo ? "page" : undefined}>
      {children}
    </Link>
  );
}
