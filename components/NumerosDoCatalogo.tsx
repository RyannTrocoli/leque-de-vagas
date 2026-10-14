import { contarVagas } from "@/lib/api";

export default async function NumerosDoCatalogo() {
  const { total, iniciantes } = await contarVagas();
  return (
    <div className="numeros-catalogo" aria-live="polite">
      <strong>{total} vagas abertas</strong>
      <span>{iniciantes} aceitam quem esta comecando</span>
    </div>
  );
}
