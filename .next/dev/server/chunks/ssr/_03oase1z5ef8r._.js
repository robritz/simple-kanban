module.exports = [
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00df9363200fca492b9033ad4e431617c1c9020d14",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["archiveCompleteAction"],
    "406d959b14a02b6a80e2d3ac81256a36601958d66f",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTicketAction"],
    "604690b891f7df54f0ecbcfa2833912bbfadf76dab",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTicketAction"],
    "70d9df6b1bfd77258b9ae24ad5ea578f8c0e059e47",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["moveTicketAction"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => "[project]/app/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/.next-internal/server/app/page/actions.js { ACTIONS_MODULE0 => \"[project]/app/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/actions.ts [app-rsc] (ecmascript)");
;
;
;
;
}),
"[project]/app/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00df9363200fca492b9033ad4e431617c1c9020d14":{"name":"archiveCompleteAction"},"406d959b14a02b6a80e2d3ac81256a36601958d66f":{"name":"createTicketAction"},"604690b891f7df54f0ecbcfa2833912bbfadf76dab":{"name":"updateTicketAction"},"70d9df6b1bfd77258b9ae24ad5ea578f8c0e059e47":{"name":"moveTicketAction"}},"app/actions.ts",""] */ __turbopack_context__.s([
    "archiveCompleteAction",
    ()=>archiveCompleteAction,
    "createTicketAction",
    ()=>createTicketAction,
    "moveTicketAction",
    ()=>moveTicketAction,
    "updateTicketAction",
    ()=>updateTicketAction
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/cache.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/board.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tickets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/tickets.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
;
;
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
function readForm(form) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["validateTicketInput"])({
        title: form.get("title"),
        description: form.get("description"),
        dueDate: form.get("dueDate")
    });
}
async function createTicketAction(form) {
    const input = readForm(form);
    if (!input.ok) return input;
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tickets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["createTicket"](input.value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return {
        ok: true
    };
}
async function updateTicketAction(id, form) {
    if (!UUID.test(id)) return {
        ok: false,
        error: "Unknown ticket."
    };
    const input = readForm(form);
    if (!input.ok) return input;
    const found = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tickets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["updateTicket"](id, input.value);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return found ? {
        ok: true
    } : {
        ok: false,
        error: "Ticket no longer exists."
    };
}
async function moveTicketAction(id, column, index) {
    if (!UUID.test(id) || !(0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["isColumnId"])(column) || !Number.isInteger(index)) return {
        ok: false,
        error: "Invalid move."
    };
    const found = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tickets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["moveTicketTo"](id, column, index);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return found ? {
        ok: true
    } : {
        ok: false,
        error: "Ticket no longer exists."
    };
}
async function archiveCompleteAction() {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$tickets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["archiveComplete"]();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$cache$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["revalidatePath"])("/");
    return {
        ok: true
    };
}
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    createTicketAction,
    updateTicketAction,
    moveTicketAction,
    archiveCompleteAction
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(createTicketAction, "406d959b14a02b6a80e2d3ac81256a36601958d66f", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(updateTicketAction, "604690b891f7df54f0ecbcfa2833912bbfadf76dab", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(moveTicketAction, "70d9df6b1bfd77258b9ae24ad5ea578f8c0e059e47", null);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(archiveCompleteAction, "00df9363200fca492b9033ad4e431617c1c9020d14", null);
}),
"[project]/lib/board.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "COLUMNS",
    ()=>COLUMNS,
    "DESCRIPTION_MAX",
    ()=>DESCRIPTION_MAX,
    "emptyBoard",
    ()=>emptyBoard,
    "findTicket",
    ()=>findTicket,
    "isColumnId",
    ()=>isColumnId,
    "moveTicket",
    ()=>moveTicket,
    "validateTicketInput",
    ()=>validateTicketInput
]);
const COLUMNS = [
    {
        id: "todo",
        label: "To-do"
    },
    {
        id: "in_progress",
        label: "In progress"
    },
    {
        id: "blocked",
        label: "Blocked"
    },
    {
        id: "complete",
        label: "Complete"
    }
];
const DESCRIPTION_MAX = 280;
function emptyBoard() {
    return {
        todo: [],
        in_progress: [],
        blocked: [],
        complete: []
    };
}
function isColumnId(value) {
    return COLUMNS.some((c)=>c.id === value);
}
function findTicket(board, id) {
    for (const { id: column } of COLUMNS){
        const index = board[column].findIndex((t)=>t.id === id);
        if (index !== -1) return {
            column,
            index
        };
    }
    return null;
}
function moveTicket(board, id, toColumn, toIndex) {
    const from = findTicket(board, id);
    if (!from) return board;
    const next = {
        ...board,
        [from.column]: [
            ...board[from.column]
        ]
    };
    const [ticket] = next[from.column].splice(from.index, 1);
    const dest = from.column === toColumn ? next[from.column] : [
        ...board[toColumn]
    ];
    const index = Math.max(0, Math.min(toIndex, dest.length));
    dest.splice(index, 0, ticket);
    next[toColumn] = dest;
    return next;
}
function validateTicketInput(raw) {
    const title = typeof raw.title === "string" ? raw.title.trim() : "";
    if (!title) return {
        ok: false,
        error: "Title is required."
    };
    const descriptionRaw = typeof raw.description === "string" ? raw.description.trim() : "";
    if (descriptionRaw.length > DESCRIPTION_MAX) return {
        ok: false,
        error: `Description must be at most ${DESCRIPTION_MAX} characters.`
    };
    const dueRaw = typeof raw.dueDate === "string" ? raw.dueDate.trim() : "";
    if (dueRaw && !isValidDate(dueRaw)) return {
        ok: false,
        error: "Due date must be a valid date."
    };
    return {
        ok: true,
        value: {
            title,
            description: descriptionRaw || null,
            dueDate: dueRaw || null
        }
    };
}
function isValidDate(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const d = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === value;
}
}),
"[project]/lib/db.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "sql",
    ()=>sql
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@neondatabase/serverless/index.mjs [app-rsc] (ecmascript)");
;
;
const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");
const sql = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$neondatabase$2f$serverless$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["neon"])(url);
}),
"[project]/lib/tickets.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "archiveComplete",
    ()=>archiveComplete,
    "createTicket",
    ()=>createTicket,
    "getBoard",
    ()=>getBoard,
    "moveTicketTo",
    ()=>moveTicketTo,
    "updateTicket",
    ()=>updateTicket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/board.ts [app-rsc] (ecmascript)");
;
;
;
async function getBoard() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
    SELECT id, title, description, to_char(due_date, 'YYYY-MM-DD') AS due_date, "column"
    FROM tickets
    WHERE archived_at IS NULL
    ORDER BY "column", position, created_at DESC
  `;
    const board = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["emptyBoard"])();
    for (const r of rows){
        board[r.column].push({
            id: r.id,
            title: r.title,
            description: r.description,
            dueDate: r.due_date
        });
    }
    return board;
}
async function createTicket(input) {
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"].transaction([
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`UPDATE tickets SET position = position + 1 WHERE "column" = 'todo' AND archived_at IS NULL`,
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`INSERT INTO tickets (title, description, due_date, "column", position)
        VALUES (${input.title}, ${input.description}, ${input.dueDate}, 'todo', 0)`
    ]);
}
async function updateTicket(id, input) {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
    UPDATE tickets SET title = ${input.title}, description = ${input.description}, due_date = ${input.dueDate}
    WHERE id = ${id} AND archived_at IS NULL
    RETURNING id
  `;
    return rows.length > 0;
}
async function moveTicketTo(id, toColumn, toIndex) {
    const before = await getBoard();
    const from = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["findTicket"])(before, id);
    if (!from) return false;
    const after = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["moveTicket"])(before, id, toColumn, toIndex);
    const ids = [];
    const columns = [];
    const positions = [];
    for (const { id: column } of __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$board$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["COLUMNS"]){
        if (column !== from.column && column !== toColumn) continue;
        after[column].forEach((t, i)=>{
            ids.push(t.id);
            columns.push(column);
            positions.push(i);
        });
    }
    await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
    UPDATE tickets AS t
    SET "column" = v.col::ticket_column, position = v.pos
    FROM unnest(${ids}::uuid[], ${columns}::text[], ${positions}::int[]) AS v(id, col, pos)
    WHERE t.id = v.id
  `;
    return true;
}
async function archiveComplete() {
    const rows = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["sql"]`
    UPDATE tickets SET archived_at = now()
    WHERE "column" = 'complete' AND archived_at IS NULL
    RETURNING id
  `;
    return rows.length;
}
}),
];

//# sourceMappingURL=_03oase1z5ef8r._.js.map