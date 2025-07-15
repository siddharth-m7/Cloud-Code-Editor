// components/FileFolderModal/FileFolderModal.jsx
import { useEffect, useRef, useState } from 'react';

export const FileFolderModal = ({
    mode = 'create',
    type = 'file',
    initialValue = '',
    onSubmit,
    onClose,
    x = null,
    y = null,
    }) => {
        const [name, setName] = useState(initialValue); 
        const [error, setError] = useState('');
        const inputRef = useRef(null);
        
        useEffect(() => {
            inputRef.current?.focus();
        }, []);

        

        const validateName = (value) => {
        const trimmed = value.trim();
        if (!trimmed) return "Name cannot be empty";
        if (/[\\/:\*\?"<>\|]/.test(trimmed)) return "Name contains invalid characters";
        return '';
    };

    const submitName = () => {
        const err = validateName(name);
        if (err) return setError(err);
        onSubmit(name.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') submitName();
        if (e.key === 'Escape') onClose();
    };

    const title = mode === 'rename'
        ? `Rename ${type.charAt(0).toUpperCase() + type.slice(1)}`
        : `Create ${type.charAt(0).toUpperCase() + type.slice(1)}`;

    return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'fixed',
          left: x !== null ? `${x}px` : '50%',
          top: y !== null ? `${y}px` : '50%',
          transform: x && y ? 'none' : 'translate(-50%, -50%)',
          backgroundColor: '#fff',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
          width: '90%',
          maxWidth: '400px',
        }}
      >
        <h2 style={{ marginBottom: '16px', fontSize: '18px', fontWeight: 'bold' }}>{title}</h2>
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          onKeyDown={handleKeyDown}
          placeholder={`Enter ${type} name`}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '8px',
            border: '1px solid #ccc',
            borderRadius: '6px',
            fontSize: '16px',
            outline: 'none',
          }}
        />
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button onClick={onClose} style={{ padding: '8px 16px', backgroundColor: '#eee' }}>Cancel</button>
          <button onClick={submitName} style={{ padding: '8px 16px', backgroundColor: '#007BFF', color: '#fff' }}>
            {mode === 'rename' ? 'Rename' : 'Create'}
          </button>
        </div>
      </div>
    </div>
  );
};
