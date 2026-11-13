import { SearchIcon } from "../../shared/ui/Icons";
export function SearchBox({
  query,
  onChange,
}: {
  query: string;
  onChange: (value: string) => void;
}) {
  return (
    <form
      className="search-box"
      role="search"
      onSubmit={(event) => event.preventDefault()}
    >
      <SearchIcon />
      <input
        aria-label="Search support articles"
        placeholder="Search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
      />
      {query && (
        <button
          type="button"
          className="clear-search"
          aria-label="Clear search"
          onClick={() => onChange("")}
        >
          ×
        </button>
      )}
    </form>
  );
}
