import { reactive } from 'vue';

const state = reactive({
  favorites: [],
});

const methods = {
  loadOrCreateFavorites(galleryData) {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      state.favorites = JSON.parse(storedFavorites);
    } else {
      state.favorites = galleryData.map(item => ({ id: item.id, isFavorite: false }));
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    }
  },
  toggleFavorite(id) {
    const index = state.favorites.findIndex(item => item.id === id);
    if (index !== -1) {
      state.favorites[index].isFavorite = !state.favorites[index].isFavorite;
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
      document.dispatchEvent(new Event('favoritesUpdated'));
    }
  },
};

export { state, methods };
