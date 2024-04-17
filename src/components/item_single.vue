<template>
  <div id="item-single">
    <a href="../">🠔 Gallery</a>
    <img class="picture" v-if="singleData && singleData.image" :src="singleData.image" />
    <ul>
      <li v-if="singleData && singleData.name" class="name">{{ singleData.name }}</li>
      <li v-if="singleData && singleData.id">ID: {{ singleData.id }}</li>
      <li v-if="singleData && singleData.category" class="capitalize">Category: {{ singleData.category }}</li>

      <li v-if="singleData && singleData.description">{{ singleData.description }}</li>
      <li v-if="singleData && singleData.dlc" class="capitalize">DLC: {{ singleData.dlc }}</li>
      <li v-if="singleData && singleData.common_locations" class="capitalize">
        Common Locations:
        <span v-for="(location, index) in singleData.common_locations" :key="index">
          {{ location }}<span v-if="index !== singleData.common_locations.length - 1">, </span>
        </span>
      </li>
      <li v-if="singleData && singleData.drops" class="capitalize">Drops: <span
          v-for="(drop, index) in singleData.drops" :key="index">
          {{ drop }}<span v-if="index !== singleData.drops.length - 1">, </span>
        </span></li>
      <li v-if="singleData && singleData.hearts_recovered">Hearts Recovered: {{ singleData.hearts_recovered }}</li>
      <li v-if="singleData && singleData.cooking_effect" class="capitalize" >Cooking Effect: {{ singleData.cooking_effect }}</li>
      <li v-if="singleData && singleData.properties">Attack: {{ singleData.properties.attack }}</li>
      <li v-if="singleData && singleData.properties">Defense: {{ singleData.properties.defense }}</li>

    </ul>
    <button v-if="singleData" @click="toggleFavorite(singleData.id)"
      :class="{ 'favorite': isFavorite(singleData.id) }">❤</button>

  </div>
</template>

<script>
import { getOneEntry } from '@/services/api/hyrule_compendium.js';
import { getData } from '@/services/api/hyrule_compendium.js';
import { state as favoritesState, methods as favoritesMethods } from '@/services/api/favorites.js';

export default {
  name: 'item_single',
  data() {
    return {
      singleData: null,
      favorites: favoritesState.favorites
    };
  },
  created() {
    this.retrieveSingleData();
    this.loadOrCreateFavorites();
    this.favorites = favoritesState.favorites;
  },
  methods: {
    async retrieveSingleData() {
      const item_id = this.$route.params.path_id;
      this.singleData = await getOneEntry(item_id);
    },
    toggleFavorite(id) {
      if (this.singleData) {
        favoritesMethods.toggleFavorite(id);
        this.favorites = favoritesState.favorites;
      }
    },
    isFavorite(id) {
      if (this.singleData && this.favorites) {
        return this.favorites.some(favorite => favorite.id === id && favorite.isFavorite);
      }
      return false; // Retourne false si singleData ou favorites est null
    },
    async loadOrCreateFavorites() {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        this.favorites = JSON.parse(storedFavorites);
      } else {
        const galleryData = await getData();
        if (galleryData) {
          favoritesMethods.loadOrCreateFavorites(galleryData);
          this.favorites = favoritesState.favorites;
          localStorage.setItem("favorites", JSON.stringify(this.favorites));
        }
      }
    }
  }
}
</script>

<style scoped>
#item-single {
  margin: 20px auto;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(40, 87, 127, 0.8);
  background-color: rgba(40, 87, 127, 0.3);
  padding: 30px;
  margin: auto;
  margin-top: 40px;
  margin-bottom: 40px;
  border-radius: 5px;
}

.picture {
  width: 100%;
  max-width: 300px;
  height: auto;
  display: block;
  margin: 20px auto;
  border-radius: 5px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

.name {
  font-size: 36px;
  text-align: center;
  font-family: 'HyliaSerif', serif;
  text-transform: capitalize;
}

.capitalize {
  text-transform: capitalize;
}

.favorite {
  color: rgb(255, 50, 50);
  background-image: -webkit-linear-gradient(top, #d8dee5, #71a8de);
  background-image: -moz-linear-gradient(top, #d8dee5, #71a8de);
  background-image: -ms-linear-gradient(top, #d8dee5, #71a8de);
  background-image: -o-linear-gradient(top, #d8dee5, #71a8de);
  background-image: linear-gradient(top, #d8dee5, #71a8de);
}

button {
  background: #71a8de;
  background-image: -webkit-linear-gradient(top, #71a8de, #275880);
  background-image: -moz-linear-gradient(top, #71a8de, #275880);
  background-image: -ms-linear-gradient(top, #71a8de, #275880);
  background-image: -o-linear-gradient(top, #71a8de, #275880);
  background-image: linear-gradient(to bottom, #71a8de, #275880);
  -webkit-border-radius: 5;
  -moz-border-radius: 5;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  padding: 5px;
  margin-top: 10px;
  text-decoration: none;
  border: none;
}

button:hover {
  background: #275880;
  background-image: -webkit-linear-gradient(top, #275880, #71a8de);
  background-image: -moz-linear-gradient(top, #275880, #71a8de);
  background-image: -ms-linear-gradient(top, #275880, #71a8de);
  background-image: -o-linear-gradient(top, #275880, #71a8de);
  background-image: linear-gradient(to bottom, #275880, #71a8de);
  text-decoration: none;
}
</style>
