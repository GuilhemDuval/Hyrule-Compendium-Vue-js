<template>
  <div class="item-card">
    <img class="picture" :src="pictureUrl" alt="Item Image" />
    <div>
      <p class="id">{{ id }}</p>
      <router-link :to="`/${id}`">
        <h2 class="name">{{ name }}</h2>
      </router-link>
      <p class="category">{{ category }}</p>
      <button @click="toggleFavorite" :class="{ favorite: isFavorite }">❤</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'item_card',
  props: {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: String,
    pictureUrl: { type: String, default: "https://botw-compendium.herokuapp.com/api/v3/compendium/entry/horse/image" },
    isFavorite: Boolean
  },
  methods: {
    toggleFavorite() {
      this.$emit('toggle-favorite', this.id);
    }
  }
}
</script>

<style scoped>
.item-card {
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(40, 87, 127, 0.8);
  background-color: rgba(40, 87, 127, 0.3);
  height: 200px;
  padding: 30px;
  margin: 10px 20px;
  width: 300px;
  border-radius: 5px;
}

.picture {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 20px;
}

.name {
  font-size: 20px;
  font-weight: bold;
  /* margin-bottom: 5px; */
  text-transform: capitalize;
}

.id,
.category {
  font-size: 14px;
  margin: 0;
  text-transform: capitalize;
}

.item-card h2 {
  font-size: 20px;
}

.favorite {
  color: rgb(255,50,50);
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
