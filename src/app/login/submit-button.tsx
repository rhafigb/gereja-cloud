'use client';

import { useFormStatus } from 'react-dom';

export function SubmitButton() {
  const { pending } = useFormStatus(); // Hook untuk cek status form

  return (
    <button 
      type="submit" 
      disabled={pending}
      className={`block w-full bg-primary hover:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg text-center transition shadow-lg ${pending ? 'opacity-70 cursor-not-allowed' : ''}`}
    >
      {pending ? 'Memproses...' : 'Masuk ke Dashboard'}
    </button>
  );
}