import { useState } from 'react';
import { useStore } from '@nanostores/react';
import { addNote, notes } from '../noteStore';

function NoteAddButton() {
  const [userNote, setUserNote] = useState('');
  const $notes = useStore(notes);

  function handleClick() {
    addNote(userNote);
  }

  return (
    <div>
      <label htmlFor='note'> Add a note: </label>
      <input
        type='text'
        name='note'
        id='note'
        onChange={(e) => setUserNote(e.target.value)}
      />
      <button onClick={handleClick}>Add</button>
      <ul style={{ color: 'white' }}>
        {$notes.map((note, index) => (
          <li key={index}>{note}</li>
        ))}
      </ul>
    </div>
  );
}

export default NoteAddButton;
