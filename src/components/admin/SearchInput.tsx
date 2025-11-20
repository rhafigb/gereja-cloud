'use client';

import { MagnifyingGlass } from "@phosphor-icons/react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
// HAPUS BARIS INI: import { useDebouncedCallback } from 'use-debounce'; 

export default function SearchInput({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative w-full md:w-auto">
      <MagnifyingGlass size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
        className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full md:w-80 focus:ring-1 focus:ring-primary outline-none"
      />
    </div>
  );
}