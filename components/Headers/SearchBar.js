import { SearchWrapper, SearchInput } from './HeaderStyles';

export default function SearchBar() {  // 使用 export default
  return (
    <SearchWrapper>
      <SearchInput type="text" placeholder="搜尋商品" />
    </SearchWrapper>
  );
}