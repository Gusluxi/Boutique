<script>
    const productid = window.location.pathname.split("/").pop();
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
<div id="products-wrapper">
    {#each products as product}
        <div class="product">
            <h2>{product.title} - {product.description} - {product.price}</h2>
        </div>
    {/each}
</div>
