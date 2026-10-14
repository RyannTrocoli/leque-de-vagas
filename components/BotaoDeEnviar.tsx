"use client";

import { useFormStatus } from "react-dom";

type Props = {
  texto: string;
  pendente: string;
  className?: string;
};

export default function BotaoDeEnviar({ texto, pendente, className }: Props) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={className} disabled={pending}>
      {pending ? pendente : texto}
    </button>
  );
}
