<script>
    const productid = window.location.pathname.split("/").pop();
    import ProductComponent from "../../components/products/ProductComponent.svelte";
    import { Link } from "svelte-navigator";
    import { onMount } from "svelte";
    import { baseURL } from "../../store/generalStore.js";


    let product = "";

    onMount(async () => {
        const response = await fetch($baseURL + "/api/products/" + productid);
        const { data:productsArray } = await response.json();
        product = productsArray;
    });
    
</script>
<h1>Cool Product</h1>
<div id=products-area>
    <ProductComponent product={product} linkable={false} layout="row"/>
</div>

<style>
    #products-area {
        display: flex;
        flex-wrap: wrap;
    }
</style>