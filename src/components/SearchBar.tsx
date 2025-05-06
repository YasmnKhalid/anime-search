import { ChangeEvent, useState, useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search'
import styles from './SearchBar.module.css'

interface Props {
  onSearch: (q: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [input, setInput] = useState('')

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(input.trim())
    }, 250)
    return () => clearTimeout(handler)
  }, [input, onSearch])

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="text"
        placeholder="Search..."
        value={input}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        className={styles.searchInput}
      />
      <SearchIcon className={styles.icon} />
    </div>
  )
}
