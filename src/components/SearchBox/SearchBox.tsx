import { useId, type ChangeEvent } from "react";
import { useDebouncedCallback } from "use-debounce";
import css from "./SearchBox.module.css";

interface SearchBoxProps {
  defaultValue: string;
  onSearch: (title: string) => void;
}

export default function SearchBox({ defaultValue, onSearch }: SearchBoxProps) {
  const fieldId = useId();

  const debouncedSearch = useDebouncedCallback((topic: string) => {
    onSearch(topic);
  }, 300);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(event.target.value);
  };

  return (
    <input
      id={fieldId}
      className={css.input}
      type="text"
      placeholder="Search notes"
      defaultValue={defaultValue}
      onChange={handleChange}
    />
  );
}
