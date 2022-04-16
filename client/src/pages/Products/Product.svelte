<script>
    const productid = window.location.pathname.split("/").pop();
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";


    let product = "";

    onMount(async () => {
        const response = await fetch($baseURL + "/api/products/" + productid);
        const { data:productsArray } = await response.json();
        product = productsArray;
        console.log(products);
    });
    
</script>
<h1>Cool Product</h1>
<h2>{product.title}</h2>
<h2>{product.description}</h2>
<h2>{product.price} kr.</h2>