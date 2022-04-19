<script>
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";
    import ProductComponent from "../../components/products/ProductComponent.svelte";

    const categoryid = window.location.pathname.split("/").pop();

    let products = "";
    let category = {};
    category.category = " ";

    onMount(async () => {
        const response = await fetch($baseURL + "/api/categories/" + categoryid);
        const { data:categoryThing } = await response.json();
        category = categoryThing;
    });

    onMount(async () => {
        const response = await fetch($baseURL + "/api/products/categories/" + categoryid);
        const { data:productsArray } = await response.json();
        products = productsArray;
        console.log(products);
    });
    
</script>
<h1>Category: {category.category}</h1>
<h2>Products:</h2>
<div id="products-wrapper">
    {#each products as product (product.id)}
        <ProductComponent product={product}/>
    {/each}
</div>

<style>
    #products-wrapper {
        display: flex;
        flex-wrap: wrap;
        
    }
</style>