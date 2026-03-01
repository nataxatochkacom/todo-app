import { useState } from "react";

function TodoItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(task.text);

    const handleDoubleClick = () => {
        setIsEditing(true);
        setEditedText(task.text);
    }

    const handleChange = (e) => {
        setEditedText(e.target.value);
    } 

    const saveChanges = () => {
        setIsEditing(false);
        if (editedText.trim() && editedText !== task.text){
            onEdit(task.id, editedText.trim());
        } else {
            setEditedText(task.text); 
        }
    }

    const handleBlur = () => {
        saveChanges();
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter'){
            e.preventDefault(); 
            e.target.blur(); 
        } else if (e.key === 'Escape'){
            setIsEditing(false);
            setEditedText(task.text);
        }
    }
    
    return (
        <li style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '8px',
            borderBottom: '1px solid #eee'
        }}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id)}
            />
            {isEditing ?(
                <input
                    type="text"
                    value={editedText}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    onBlur={handleBlur}
                    autoFocus
                    style={{
                        flex: 1,
                        padding: '4px',
                        fontSize: 'inherit',
                        border: '1px solid #ccc',
                        borderRadius: '4px'
                    }}
                />
            ) : (
            <span 
                onDoubleClick={handleDoubleClick}
                style={{
                    flex: 1,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    cursor: 'pointer',
                    padding: '4px'
                }}
            >
                {task.text}
            </span>
            )}
            <button
                onClick={() => onDelete(task.id)}
                style={{
                    background: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    padding: '4px 8px',
                    cursor: 'pointer'
                }}
            >
                Удалить
            </button>
        </li>
    );
}

export default TodoItem;