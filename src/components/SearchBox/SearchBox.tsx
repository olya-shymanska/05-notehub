import css from './SearchBox.module.css'
import type { DebouncedState } from "use-debounce";

interface SearchBoxProps {
    value: string,
    onSearch: DebouncedState<(newSearchQuery: string) => void>;
}

export default function SearchBox({ value, onSearch }: SearchBoxProps) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSearch(event.target.value);
    }
    return (
        <input type="text" defaultValue={value}
            onChange={handleChange}
            placeholder="Search notes"
            className={css.input}
        />
)
}