import { buscarEmpresa } from "@/lib/api";

type Contexto = { params: Promise<{ slug: string }> };

// Para quem nao e a nossa tela. As paginas do site chamam buscarEmpresa direto,
// sem dar a volta pela rede.
export async function GET(_pedido: Request, { params }: Contexto) {
  const { slug } = await params;
  const empresa = await buscarEmpresa(slug);

  if (!empresa) return Response.json({ erro: "Empresa nao encontrada." }, { status: 404 });
  return Response.json(empresa);
}
