<template>
  <div class="item-gallery flex-container">
    <sort_parameters v-model:search="search" v-model:order="order" v-model:category="category"
      v-model:showFavorite="showOnlyFavorites" />
    <div class="card flex-items" v-for="(item, index) in filteredGalleryData" :key="item.id">
      <item_card :id="item.id" :name="item.name" :category="item.category" :pictureUrl="item.image"
        :isFavorite="isFavorite(item.id)" @toggle-favorite="toggleFavorite" />
    </div>
    <div v-if="filteredGalleryData.length === 0" class="no-data">
      No Match Found.
    </div>
  </div>
</template>

<script>
import { getData } from '@/services/api/hyrule_compendium.js'
import sort_parameters from "./sort_parameters.vue";
import item_card from "@/components/item_card.vue";
import { state as favoritesState, methods as favoritesMethods } from '@/services/api/favorites.js';

export default {
  name: 'item_gallery',
  components: {
    item_card,
    sort_parameters
  },
  data() {
    return {
      galleryData: [],
      favorites: favoritesState.favorites,
      filteredGalleryData: [],
      search: localStorage.getItem("search") || "",
      order: localStorage.getItem("order") || "id-order",
      category: localStorage.getItem("category") || "",
      showOnlyFavorites: false
    }
  },
  created() {
    this.retrieveGalleryData().then(() => {
      favoritesMethods.loadOrCreateFavorites(this.galleryData);

    });
  },
  methods: {
    async retrieveGalleryData() {
      this.galleryData = await getData();

      await favoritesMethods.loadOrCreateFavorites(this.galleryData);

      this.favorites = favoritesState.favorites;

      this.galleryData.forEach(item => {
        item.isFavorite = this.isFavorite(item.id);
      });

      this.filterGalleryData();
    },
    toggleFavorite(id) {
      favoritesMethods.toggleFavorite(id);
      this.favorites = favoritesState.favorites;
    },
    isFavorite(id) {
      return this.favorites.some(favorite => favorite.id === id && favorite.isFavorite);
    },
    filterGalleryData() {
      let filteredData = this.galleryData.filter(item =>
        item.name.toLowerCase().includes(this.search.toLowerCase()) &&
        (this.category === "" || item.category.toLowerCase() === this.category.toLowerCase()) &&
        (!this.showOnlyFavorites || this.isFavorite(item.id))
      );

      filteredData.forEach(item => {
        item.isFavorite = this.isFavorite(item.id);
      });

      switch (this.order) {
        case 'id-order':
          this.filteredGalleryData = filteredData.sort((a, b) => a.id - b.id);
          break;
        case 'reverse-id-order':
          this.filteredGalleryData = filteredData.sort((a, b) => b.id - a.id);
          break;
        case 'alphabetical-order':
          this.filteredGalleryData = filteredData.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'reverse-alphabetical-order':
          this.filteredGalleryData = filteredData.sort((a, b) => b.name.localeCompare(a.name));
          break;
        default:
          this.filteredGalleryData = filteredData;
      }
    }

  },
  watch: {
    search() {
      this.filterGalleryData();
      localStorage.setItem("search", this.search);
    },
    order() {
      this.filterGalleryData();
      localStorage.setItem("order", this.order);
    },
    category() {
      this.filterGalleryData();
      localStorage.setItem("category", this.category);
    },
    showOnlyFavorites() {
      this.filterGalleryData();
    }
  }
}
</script>

<style scoped>
.item-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1080px;
  margin: auto;
}

.card {
  margin-bottom: 20px;
}

.no-data {
  color: rgba(40, 87, 127, 1);
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: normal;
}

.flex-items {
  display: block;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  align-self: auto;
  order: 0;
}
</style>
