import { supabase } from './supabase.js';
import { fetchPoster } from './fetchPoster.js';

const getMoviesid = () => {
  return supabase.from('movies').select('*').is('poster_path',null);
};

const addMoviePoster = async (movie) => {
  const posterPath = await fetchPoster(movie.imdb_id);
  console.log(posterPath);
  await supabase.from('movies').update({ posterPath }).eq('imdb_id', movie.imdb_id);
};

const processAllMovies = async () => {
  const { data: movies } = await getMoviesid();
  console.log(movies.length);

  if (!movies?.length) {
    return;
  }

  await Promise.resolve(movies.map(addMoviePoster));
//   processAllMovies();
};

processAllMovies();
