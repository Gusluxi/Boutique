<script>
    import { Router, Link, Route } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";
    import { user } from "../../store/profileStore.js";

    let categories = "";
    console.log($user);
    onMount(async () => {
        const response = await fetch($baseURL + "/api/categories");
        const { data:categoriesArray } = await response.json();
        categories = categoriesArray;
        if (categories.length > 5) {
            categories.splice(5);
        }
    });
    
    
</script>-

<home>
    <h1>Welcome {#if $user.loggedIn} {$user.currentUser.username} {/if} to the Kea Boutique!</h1>
    <div id="category-highlights">
        {#each categories as category}
            <div class="category"><Link to="categories/{category.id}"><h3 class="header">{category.category}</h3></Link></div>
        {/each}
    </div>
</home>

<style>
    #category-highlights {
        display: flex;
        width: 100%;
        background-color: #7847ff;
    }
    .category {
        color: #fcff34;
        padding-left: 25px;
        padding-right: 25px;
    }
    .header {
        color: #fcff34;
    }

</style>