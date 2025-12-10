import { useState } from "react";

export default function NameListClassic() {

    const [names, setNames] = useState([]);
    const [inputText, setInputText] = useState("");

    function addNameHandler() {
        setNames(prev => ([...prev, inputText]));
        setInputText("");
    }

    function deleteHandler(deleteIndex) {
        setNames((prev) => prev.filter((name, i) => i !== deleteIndex));
    }

    return (
        <div>
            <h2>Name List</h2>
            <input
                value={inputText}
                onChange={e => setInputText(e.target.value)} />
            <button onClick={addNameHandler}>Add</button>
            <div>
                {names.length === 0 ? (<p>No Names yet</p>) : (
                    
                        names.map((name, index) => (
                            <p key={index}>{name}
                                <button
                                    onClick={() => deleteHandler(index)}>Delete</button>
                            </p>

                        ))
                    
                )}

            </div>
        </div>
    );
}
