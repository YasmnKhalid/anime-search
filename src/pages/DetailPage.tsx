// src/pages/DetailPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAnimeById } from '../api/anime';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  IconButton,
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [anime, setAnime] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeById(Number(id)).then(data => {
      setAnime(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }
  if (!anime) {
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        Anime not found.
      </Typography>
    );
  }

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4, px: 2 }}>

      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
          ml: -2,
          bgcolor: 'background.paper',
          boxShadow: 1,
          '&:hover': { bgcolor: 'grey.100' },
        }}
        aria-label="Go back"
      >
        <ArrowBackIosIcon />
      </IconButton>

      <Card
        elevation={6} /* adds a shadow */
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <CardMedia
          component="img"
          image={anime.images.jpg.large_image_url}
          alt={anime.title}
          sx={{
            width: { xs: '100%', sm: 300 },
            height: 'auto',
            objectFit: 'cover',
          }}
        />
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography variant="h4" gutterBottom>
            {anime.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {anime.synopsis}
          </Typography>
          <Typography variant="body2">
            <strong>Episodes:</strong> {anime.episodes ?? 'N/A'}
          </Typography>
          <Typography variant="body2">
            <strong>Score:</strong> {anime.score ?? 'N/A'}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
