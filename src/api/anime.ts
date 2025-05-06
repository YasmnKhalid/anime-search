import axios from 'axios';
import { AnimeSummary, AnimeSearchResponse } from '../types/anime';

const BASE = 'https://api.jikan.moe/v4';

type WithSignal = { signal?: AbortSignal };

export const searchAnime = async (
  query: string,
  page = 1,
  options?: WithSignal
): Promise<AnimeSearchResponse> => {
  const res = await axios.get<AnimeSearchResponse>(`${BASE}/anime`, {
    params: { q: query, page },
    signal: options?.signal,
  });
  return res.data;
};

export const getRandomAnime = async (
  options?: WithSignal
): Promise<AnimeSummary> => {
  const res = await axios.get<{ data: AnimeSummary }>(
    `${BASE}/random/anime`,
    { signal: options?.signal }
  );
  return res.data.data;
};

export const getAnimeById = async (id: number): Promise<any> => {
  const res = await axios.get(`${BASE}/anime/${id}`);
  return res.data.data;
};
