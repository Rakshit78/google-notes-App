import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNote, deleteNote, pinNote } from '../redux/actions';
import './NoteApp.css';

const NoteApp = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  const handleAddNote = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      pinned: false,
    };
    dispatch(addNote(newNote));
    setTitle('');
    setContent('');
  };

  return (
    <div className='note-app'>
      <div className='note-input'>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Content'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <div className='notes-container'>
        {notes
          .filter((note) => note.pinned)
          .map((note) => (
            <div key={note.id} className='note'>
              <h4 className='text'>{note.title}</h4>
              <p className='text'>{note.content}</p>
              <button onClick={() => dispatch(pinNote(note.id))}>Unpin</button>
              <button onClick={() => dispatch(deleteNote(note.id))}>
                Delete
              </button>
            </div>
          ))}
        {notes
          .filter((note) => !note.pinned)
          .map((note) => (
            <div key={note.id} className='note'>
              <h4>{note.title}</h4>
              <p>{note.content}</p>
              <button onClick={() => dispatch(pinNote(note.id))}>Pin</button>
              <button onClick={() => dispatch(deleteNote(note.id))}>
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NoteApp;
