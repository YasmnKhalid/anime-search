// src/pages/SearchPage.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchAnime, getRandomAnime } from '../api/anime';
import { AnimeSummary } from '../types/anime';
import SearchBar from '../components/SearchBar';
import {
  Pagination,
  CircularProgress,
  Typography,
  Alert,
} from '@mui/material';
import styles from './SearchPage.module.css';

export default function SearchPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState<AnimeSummary[]>([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        if (!query) {
          // load 6 random anime when no search term
          const randoms = await Promise.all(
            Array.from({ length: 6 }, () =>
              getRandomAnime({ signal: controller.signal })
            )
          );
          setResults(randoms);
          setLastPage(1);
        } else {
          const { data, pagination } = await searchAnime(query, page, {
            signal: controller.signal,
          });
          setResults(data);
          setLastPage(pagination.last_visible_page);
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err.name !== 'CanceledError' && err.name !== 'AbortError') {
          setError(err.message ?? 'An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, [query, page]);

  return (
    <div className={styles.container}>
      <SearchBar onSearch={q => { setPage(1); setQuery(q); }} />

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {loading && (
        <div className={styles.centered}>
          <CircularProgress />
        </div>
      )}

      {!loading && !error && query && results.length === 0 && (
        <Typography align="center" sx={{ mt: 4 }}>
          No results found.
        </Typography>
      )}

      <div className={styles.grid}>
        {results.map(a => (
          <div
            key={a.mal_id}
            className={styles.card}
            onClick={() => navigate(`/anime/${a.mal_id}`)}
          >
            <img
              src={a.images.jpg.image_url}
              alt={a.title}
              className={styles.cardImage}
            />
            <div className={styles.cardContent}>
              <div className={styles.cardTitle}>{a.title}</div>
              <div className={styles.cardText}>{a.synopsis}</div>
            </div>
          </div>
        ))}
      </div>

      {query && lastPage > 1 && (
        <div className="pagination-controls">
          <Pagination
            count={lastPage}
            page={page}
            onChange={(_, p) => setPage(p)}
            sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
          />
        </div>
      )}
    </div>
  );
}
