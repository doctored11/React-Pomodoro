import { useState } from 'react';

export function useInputHandler(initialValue: string = '') {
  const [editedTitle, setEditedTitle] = useState<string>(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(event.target.value);
  };

  

  return { editedTitle, handleChange };
}
