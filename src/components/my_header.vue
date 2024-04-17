<template>
    <header>
        <h1>Hyrule Encyclopedia</h1>
    </header>
</template>

<script>
    export default {
        name: 'my_header'
    }
</script>

<style>
header {
    background-image: url("@/assets/blue.jpg");
    width: 100%;
    padding: 20px;
    text-align: center;
}
    
header > div {
    display: block;
    margin: auto;
    text-align: center;
}

header > a {
      display: inline-block;
      text-decoration: none;
      margin: 20px 0 20px 0;
}

header > h1 {
        font-size: 50px;
        color: white;
        font-family: 'HyliaSerif', serif;
}

header > h1 {
    margin: 0;
}

</style>