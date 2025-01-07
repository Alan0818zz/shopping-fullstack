import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SearchWrapper, SearchInput } from './HeaderStyles';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true); // 確保只有在客戶端執行的情況下才進行路由操作
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && query.trim() && isClient) {
      router.push(`/Search?query=${query}`);
    }
  };

  return (
    <SearchWrapper>
      <SearchInput
        type="text"
        placeholder="搜尋商品"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </SearchWrapper>
  );
}