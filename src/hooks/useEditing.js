import { useState } from "react";


export default function useEditing() {
    const [editingId, setEditingId] = useState(null);

    function startEdit(id) {
        setEditingId(id);
    }

    function cancelEdit() {
        setEditingId(null);
    }

    const isEditingNow = editingId !== null;

    return {
        editingId,
        isEditingNow,
        startEdit,
        cancelEdit
    };
}
