import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { AnimeSummary } from '../types/anime';

interface Props {
  anime: AnimeSummary;
  onClick: () => void;
}

export default function AnimeCard({ anime, onClick }: Props) {
  return (
    <Card onClick={onClick} sx={{ 
      cursor: 'pointer',
      height: '100%',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(128, 0, 128, 0.6)', // purple shadow
      },
    }}>
      <CardMedia
        component="img"
        image={anime.images.jpg.image_url}
        alt={anime.title}
        height={200}
      />
      <CardContent>
        <Typography variant="h6">{anime.title}</Typography>
        <Typography variant="body2" noWrap>
          {anime.synopsis}
        </Typography>
      </CardContent>
    </Card>
  );
}
