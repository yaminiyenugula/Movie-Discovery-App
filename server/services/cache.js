const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000;

const getCache = (key) => {
  const cached = cache.get(key);

  if (!cached) {
    return null;
  }

  if (Date.now() - cached.timestamp > CACHE_DURATION) {
    cache.delete(key);
    return null;
  }

  return cached.data;
};

const setCache = (key, data) => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

module.exports = {
  getCache,
  setCache,
};