import { getBoard } from "@/lib/tickets";
import { BoardView } from "./board-view";

export const dynamic = "force-dynamic";

export default async function Page() {
  const board = await getBoard();
  return <BoardView initial={board} />;
}
