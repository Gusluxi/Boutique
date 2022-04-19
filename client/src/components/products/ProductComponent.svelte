<script>
    export let product;
    export let linkable = true;
    export let layout = "column" || "row";
    import { Link } from "svelte-navigator";
    import { cartContent, cartSize, totalPrice } from "../../store/cartStore.js";

    let productCount = 1;

    function addToCart(count) {
        cartContent.update(contents => [...contents, ...Array(count).fill(product.id) ]);
        cartSize.update(products => products + count)
        totalPrice.update(prize => prize + (product.price*count))
        console.log("Added To Cart", product.id);
        console.log("CurrentCart", $cartContent);
    }

    function handleMaxMinInput() {
        if (productCount > 20) {
            productCount = 20;
        };
        if (productCount < 1) {
            productCount = 1;
        }
    }
     
</script> 
    
    <div class="{layout}">
        {#if linkable}
            <Link to="/products/{product.id}">
                <h1>{product.title}</h1>
                <h3 class="description-{layout}">{product.description}</h3>
            </Link>
        {:else}
            <h1>{product.title}</h1>
            <h3 class="description-{layout}">{product.description}</h3>
        {/if}
        <h3>
            <input on:change={handleMaxMinInput} on:input={handleMaxMinInput} type="number" bind:value={productCount}>
             {(product.price * productCount).toFixed(2)} kr.
            </h3>
        <button class="cart-button" on:click={addToCart(productCount)}>
            Add To Cart
        </button>
        
    </div>

    <style>
        
        .row {
            width: 95%;
            margin: 2em;
            background-color: #b9b9b9;
            padding: 2em;
        }
        .column {
            width: 10em;
            margin: 2em;
            background-color: #b9b9b9;
            padding: 2em;
        }
        .description-row {
            height: 2em;
        }
        .description-column {
            height: 5em;
        }
        input {
            width: 3em;
        }

        button:hover {
            font-weight: bold;
            cursor: pointer;
        }
    </style>
