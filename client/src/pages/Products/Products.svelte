<script>
    const productid = window.location.pathname.split("/").pop();
    import ProductComponent from "../../components/products/ProductComponent.svelte";
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";

    let products = "";

    onMount(async () => {
        const response = await fetch($baseURL + "/api/products");
        const { data:productsArray } = await response.json();
        products = productsArray;
    });
    
</script>

<h1>All Products</h1>
<div id="products-area">
    {#each products as product (product.id)}
        <ProductComponent product={product}/>
    {/each}
</div>

<style>
    #products-area {
        display: flex;
        flex-wrap: wrap;
    }
</style>