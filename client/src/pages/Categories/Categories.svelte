<script>
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";
    

    let categories = "";

    onMount(async () => {
        const response = await fetch($baseURL + "/api/categories");
        const { data:categoriesArray } = await response.json();
        categories = categoriesArray;
        
    });
</script>
<h1>Categories</h1>
<div id="categories-wrapper">
    {#each categories as category}
    <Link to="/categories/{category.id}">
        <div class="category">
            <h2>{category.category}</h2>
        </div>
    </Link>
    {/each}
</div>

<style>
    #categories-wrapper {
        display: flex;
    }

    .category {
        background-color: #bebebe;
        margin: 1em;
        padding: 1em;
        width: 8em;
        text-align: center;
        height: 6em;
    }
</style>