<script>
    import { searchStore } from "../../store/searchStore.js";
    let searchTerm = new URLSearchParams(window.location.search).get("s");
    searchStore.set(searchTerm);
</script>

<h1>Search term = {$searchStore}</h1>