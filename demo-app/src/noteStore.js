import { atom } from 'nanostores';

export const notes = atom([]);

export function addNote(note) {
  notes.set([...notes.get(), note]);
  console.log('note: ', notes.get());
}
