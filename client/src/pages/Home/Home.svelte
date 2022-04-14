<script>
    import { Router, Link, Route } from "svelte-navigator";
    

    const categories = [ "category1", "category2", "category3", "category4", "category5" ]
</script>

<home>
    <h1>Welcome to the Kea Boutique!</h1>
    <div id="category-highlights">
        {#each categories as category}
            <div class="category"><Link to="categories/{category}"><h3 class="header">{category}</h3></Link></div>
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