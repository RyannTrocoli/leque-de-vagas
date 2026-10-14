import type { Metadata } from "next";
import Cabecalho from "@/components/Cabecalho";
import Rodape from "@/components/Rodape";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Leque de Vagas", template: "%s · Leque de Vagas" },
  description: "Vagas de tecnologia para quem esta entrando na area.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="pular-conteudo" href="#conteudo">Pular para o conteudo</a>
        <Cabecalho />
        <div id="conteudo" className="conteudo">{children}</div>
        <Rodape />
      </body>
    </html>
  );
}
