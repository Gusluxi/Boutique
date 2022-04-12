<script>
	//Imports of dependencies
    import { Router, Link, Route } from "svelte-navigator";
	import { searchStore } from "./store/searchStore.js";
    
	//Imports of svelte files.
    import Home from "./pages/Home/Home.svelte";
    import Cart from "./pages/Cart/Cart.svelte";
    import Categories from "./pages/Categories/Categories.svelte";
	import Search from "./pages/Search/Search.svelte";

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
        <Link to="/"><img src={srcKeaBoutique} alt="Kea Boutique"/></Link>
		<div id="search-area">
			<input type="search" bind:value={inputSearch} placeholder="search for a product" on:keyup={handleInputEnter}/>
			<button on:click={handleClick} type="submit">Search</button>
			<Link id="search-link" to="/search?s={inputSearch}"></Link>
		</div>
        <Link to="/categories"><img src={srcCategories} alt="Categories"/></Link>
        <Link to="/cart"><img src={srcCart} alt="Cart"/><b id="cart-count">(1)</b></Link>
    </nav>
	<Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/categories" component={Categories} />
	<Route path="/search" component={Search} />

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
	}
	#search-area {
		padding-top: 0.3em;
	}
	#search-area input {
		width: 20em;
	}
	#cart-count {
		position: relative;
		bottom: 20px;
		color: #7a0000
	}

</style>