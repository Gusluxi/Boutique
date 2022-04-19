<script>
    import ProductComponent from "../../components/products/ProductComponent.svelte";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";
    import { searchStore } from "../../store/searchStore.js";

    let products = "";
    
    onMount(async () => {
        const response = await fetch($baseURL + "/api/products");
        const { data:productsArray } = await response.json();
        products = productsArray;
    });

    function handleInput() {
        console.log("Hey");
    }


    
</script>
<h1>Searched for: {$searchStore}</h1>
<div id="products-area">
    {#each products as product (product.id)}
        {#if product.title.toLowerCase().includes($searchStore.toLowerCase()) || product.description.toLowerCase().includes($searchStore.toLowerCase())}
            <ProductComponent product={product}/>
        {/if}
    {/each}
</div>

<style>
    #products-area {
        display: flex;
        flex-wrap: wrap;
    }
</style>