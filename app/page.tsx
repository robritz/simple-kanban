import { getBoard } from "@/lib/tickets";
import { AuthGate } from "./auth-gate";
import { BoardView } from "./board-view";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <AuthGate>
      <Board />
    </AuthGate>
  );
}

async function Board() {
  return <BoardView initial={await getBoard()} />;
}
