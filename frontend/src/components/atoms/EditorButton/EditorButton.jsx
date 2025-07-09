import './EditorButton.css';

export const EditorButton = ({ onClick, label , isActive }) => {

    function handleClick(event) {
        // TODO : Implement the click handler logic
    }

    return (
        <button 
            className="editor-button"
            onClick={handleClick}
            style={{ color : isActive ? 'white' : '#c9c4c4',
                backgroundColor: isActive ? '#20202b' : '#2a2a31',
                borderTop: isActive ? '3px solid rgb(250, 199, 13)' : '2px solid transparent',
            }}
        >
            {label}Button
        </button>
    );
}