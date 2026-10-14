import { listarVagas } from "@/lib/api";

export async function GET() {
  return Response.json(await listarVagas());
}
