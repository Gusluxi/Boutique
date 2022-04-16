<script>
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";

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
    {#each products as product}
    <Link to="/products/{product.id}">
        <div class="product">
            <h2>{product.title}</h2>
            <p class="description">{product.description}</p>
            <p>{product.price} kr.</p>
        </div>
    </Link>
    {/each}
</div>

<style>
    #products-wrapper {
        display: flex;
    }
    .product {
        margin: 2em;
        width: 10em;
        background-color: #b9b9b9;
        padding: 2em;
    }
    .description {
        height: 5em;
    }
</style>