export default function FilterButtons({
    viewFilter,
    onChangeFilter }) {
    return (
        <div>
            <button onClick={() => onChangeFilter("all")}>
                All {viewFilter === "all" && "✓"}
            </button>

            <button onClick={() => onChangeFilter("open")}>
                Open {viewFilter === "open" && "✓"}
            </button>

            <button onClick={() => onChangeFilter("done")}>
                Done {viewFilter === "done" && "✓"}
            </button>

            <button onClick={() => onChangeFilter("archived")}>
                Archived {viewFilter === "archived" && "✓"}
            </button>
        </div>
    );
}