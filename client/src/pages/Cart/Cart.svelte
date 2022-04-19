<script>
const productid = window.location.pathname.split("/").pop();
import ProductComponent from "../../components/products/ProductComponent.svelte";
import { Link } from "svelte-navigator";
import { onMount } from "svelte";
import { baseURL } from "../../store/generalStore.js";
import { cartContent, cartSize, totalPrice } from "../../store/cartStore.js";

let products = "";
let countedProductsSplit;
onMount(async () => {
    const response = await fetch($baseURL + "/api/products");
    const { data:productsArray } = await response.json();
    products = productsArray;
    console.log(products);
});

function countAmounts() {
    const countedProducts = [];
    $cartContent.map(content => {
        if (countedProducts[content]) {
            countedProducts[content] += 1;
        } else {
            countedProducts[content] = 1;
        }
    })
    countedProductsSplit = Object.keys(countedProducts).map(key => ({ [key]: countedProducts[key] }));
    console.log(countedProductsSplit);
}

countAmounts();

console.log("Counted Products",countedProductsSplit);

function addItem(product) {
    cartContent.update(contents => [...contents, product.id]);
    cartSize.update(products => products + 1);
    totalPrice.update(totalPrice => totalPrice + product.price)
    countAmounts();
}

function removeItem(product) {
    cartContent.update(contents => {
        const arrContents = [...contents];
        const index = arrContents.indexOf(product.id);
        arrContents.splice(index, 1);
        return [...arrContents]
    });
    cartSize.update(products => products - 1);
    totalPrice.update(totalPrice => totalPrice - product.price)
    countAmounts();
}

function handleDelete(product, amount) {
    const productToRemove = document.getElementById(product.id);
    cartContent.update(contents => {
        const arrContents = [...contents];
        arrContents.map(item => {
            const index = arrContents.indexOf(product.id);
            arrContents.splice(index, 1);
        });
        return [...arrContents]
    })
    cartSize.update(products => products - amount);
    totalPrice.update(totalPrice => totalPrice - (product.price*amount))
    productToRemove.innerText = "";
    productToRemove.classList.remove('product')
    console.log($cartContent);
}
</script>


<h1>CART ({$cartSize})</h1>
{#if $cartSize <= 0}
    <h1>Cart is empty :(</h1>
{:else}
{#each countedProductsSplit as countedProduct}
    {#each products as product (product.id)}
        {#if Number(product.id) === Number(Object.keys(countedProduct))}
            <div class="product" id="{product.id}">
                <div>{product.title} </div>
                <div class="price-area">
                    <div class=price>
                        Amount: {Object.values(countedProduct)}<div>{(product.price*Object.values(countedProduct)).toFixed(2)} kr.</div>
                    </div> 
                    <div class="adjust-btn">
                        <button on:click={addItem(product)}>➕</button>
                        <button on:click={removeItem(product)}>➖</button>
                        <div><button on:click={handleDelete(product, Object.values(countedProduct))} class="delete-btn">Delete</button></div>
                    </div>
                </div>
            </div>
            {/if}
    {/each}
{/each}
<div id="total-price">
    <div>Total Price: {$totalPrice.toFixed(2)} kr. <Link to="/checkout"><button id="pay-btn">Checkout</button></Link></div>
</div>
{/if}



<style>
    .product {
        display: flex;
        justify-content: space-between;
        font-size: 2rem;
        line-height: 2.7rem;
        background-color: #b9b9b9;
        padding: 0.5em;
        margin: 0.5em;
    }
    .price-area {
        display: flex;
        width: 20rem;
        justify-content: space-evenly;
    }
    .price {
        text-align: right;
        line-height: 2.7rem;
        text-align: right;
    }
    
    .adjust-btn {
        font-size: 1rem;
    }
    .delete-btn {
        font-size: 1.29rem;
        color: #dd0000;
    }
    #total-price {
        font-size: 2rem;
        background-color: #b9b9b9;
        padding: 0.5em;
        margin: 0.5em;
        text-align: right;
    }
    #pay-btn {
        font-size: 1.5rem 
    }
</style>