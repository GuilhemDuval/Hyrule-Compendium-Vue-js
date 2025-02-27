<template>
  <div class="sort-parameters">
    <div>
      <input type="text" :value="search" @input="searchRefresh" placeholder="Hylian Shield">
      <button v-if="search" @click="cleanSearch">X</button>
    </div>
    <div>
      <label for="order-by">Order by: </label>
      <select :value="order" @input="orderRefresh" id="order-by">
        <option value="id-order">ID order</option>
        <option value="reverse-id-order">Reverse ID order</option>
        <option value="alphabetical-order">Alphabetical order</option>
        <option value="reverse-alphabetical-order">Reverse alphabetical order</option>
      </select>
    </div>
    <div>
      <label for="select-category">Category: </label>
      <select :value="category" @input="categoryRefresh" id="select-category">
        <option value="">All categories</option>
        <option value="creatures">Creatures</option>
        <option value="monsters">Monsters</option>
        <option value="materials">Materials</option>
        <option value="equipment">Equipment</option>
        <option value="treasure">Treasure</option>
      </select>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="showOnlyFavorites" @change="showOnlyFavoritesRefresh">
        Show Only Favorites
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sort_parameters',
  props: {
    search: String,
    order: String,
    category: String
  },
  emits: ["update:search", "update:order", "update:category", "update:showFavorite"],
  methods: {
    cleanSearch() {
      this.$emit('update:search', "");
    },
    searchRefresh(event) {
      this.$emit('update:search', event.target.value);
    },
    orderRefresh(event) {
      this.$emit('update:order', event.target.value);
    },
    categoryRefresh(event) {
      this.$emit('update:category', event.target.value);
    },
    showOnlyFavoritesRefresh(event) {
      this.$emit('update:showFavorite', event.target.checked);
    }
  }
}
</script>

<style>
.sort-parameters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
}

.sort-parameters>div {
  margin-bottom: 10px;
  margin-right: 20px;
  text-align: center;
}

.sort-parameters label {
  font-weight: bold;
}

.sort-parameters input[type="text"],
.sort-parameters select {
  width: 200px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.sort-parameters button {
  padding: 5px 10px;
  margin-left: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.sort-parameters button:hover {
  background-color: #f0f0f0;
}

.sort-parameters button:active {
  background-color: #e0e0e0;
}
</style>