<template>
    <footer>
        <ul>
            <li><a href="http://www.artsyomni.com/hyliaserif" target="_blank">Hylia Serif</a> made by Omni Jacala</li>
            <li><a href="https://github.com/gadhagod/Hyrule-Compendium-API" target="_blank">Hyrule Compendium API</a>
                made by Aarav Borthakur</li>
            <li>Designed and developed by <a href="https://guilhemduval.fr/" target="_blank">Guilhem Duval</a></li>
        </ul>
    </footer>
</template>

<script>
export default {
    name: 'my_footer'
}
</script>

<style scoped>
footer {
    background-image: url("@/assets/blue.jpg");
    font-size: 12px;
    padding: 20px;
    text-align: center;
    color: white;
}

footer ul {
    max-width: 960px;
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
}

footer ul li {
    margin-bottom: 10px;
}

footer a {
    color: white;
}

footer>ul {
    max-width: 1080px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    list-style-type: none;
}
</style>