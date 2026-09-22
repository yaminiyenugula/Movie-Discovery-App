import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPopularMovies = async (page = 1) => {
  const response = await api.get(`/movies/popular?page=${page}`);

  return response.data;
};

export default api;