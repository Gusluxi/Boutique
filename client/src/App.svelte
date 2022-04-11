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
	
	//functions
	function handleSearch() {
		searchStore.set(inputSearch);
		console.log("Word", inputSearch);

		document.getElementById("search-link").click();
	};
</script>

<Router>
    <nav>
        <Link to="/">Home</Link>
		<input bind:value={inputSearch} placeholder="search for a product" on:change={handleSearch}/>
		<Link id="search-link" to="/search?s={inputSearch}"></Link>
        <Link to="/categories">Categories</Link>
        <Link to="/cart">🛒</Link>

    </nav>
    
	<Route path="/" component={Home} />
    <Route path="/cart" component={Cart} />
    <Route path="/categories" component={Categories} />
	<Route path="/search" component={Search} />

</Router>

