<script>
	//Imports of dependencies
    import { Router, Link, Route } from "svelte-navigator";
	import { searchStore } from "./store/searchStore.js";
    
	//Imports of svelte files.
    import Home from "./pages/Home/Home.svelte";
    import Cart from "./pages/Cart/Cart.svelte";
    import Categories from "./pages/Categories/Categories.svelte";
	import Category from "./pages/Categories/Category.svelte";
	import Search from "./pages/Search/Search.svelte";
	import Product from "./pages/Products/Product.svelte";
	import Products from "./pages/Products/Products.svelte";
	import Profile from "./pages/Profile/Profile.svelte";

	//variables
	let inputSearch = "";

	//Images src
	let srcKeaBoutique = "/images/KeaBoutique.png";
	let srcCategories = "/images/Categories.png";
	let srcCart = "/images/Cart.png";

	//functions
	function handleInputEnter(event) {
		if (event.key === "Enter") {
			if (inputSearch !== "") {
				searchStore.set(inputSearch);
				document.getElementById("search-link").click();
			};
		};
	};
	function handleClick() {
		if (inputSearch !== "") {
			searchStore.set(inputSearch);
			document.getElementById("search-link").click();
		};
	};


</script>

<Router>
    <nav>
        <Link to="/"><img id="img-link" src={srcKeaBoutique} alt="Kea Boutique"/></Link>
		<div id="search-area">
			<input type="search" bind:value={inputSearch} placeholder="search for a product" on:keyup={handleInputEnter}/>
			<button on:click={handleClick} type="submit">Search</button>
			<Link id="search-link" to="/search?s={inputSearch}"></Link>
		</div>
        <Link to="/categories"><img id="img-link" src={srcCategories} alt="Categories"/></Link>
        <div id="img-link"><Link to="/cart"><img src={srcCart} alt="Cart"/><a id="cart-count">(1)</a></Link></div>
    </nav>
	<Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/categories" component={Categories} />
	<Route path="/categories/*" component={Category} />
	<Route path="/search" component={Search} />
	<Route path="/products" component={Products} />
	<Route path="/products/*" component={Product} />
	<Route path="/profile" component={Profile} />
</Router>

<style>
	nav {
		display: flex;
		background-color: #c5c5c5;
		justify-content: space-between;
		align-items: center;
		padding: 0.5em;
		font-size: 1.5em;
		text-decoration: none;
		color: black;
		border-radius: 25px;
		height: 2.5em;
	}
	#img-link {
		border-radius: 25px;
		border: 1px solid #c5c5c5;
		transition: 0.4s;
		text-decoration: none;
		padding-right: 10px;
		padding-left: 10px;
	}
	#img-link:hover {
		background-color: #c9c9c9;
		border: 1px solid #b6b6b6;
		border-radius: 20px;
	}
	#search-area {
		padding-top: 0.3em;
	}
	#search-area input {
		width: 20em;
	}
	#search-area button:hover {
		cursor: pointer;

	}
	#cart-count {
		position: relative;
		bottom: 20px;
		color: #7a0000;	
	}

</style>