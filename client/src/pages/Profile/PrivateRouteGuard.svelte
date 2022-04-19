<script>
	import { useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../../store/profileStore.js";

	const navigate = useNavigate();
	const location = useLocation();

	$: if (!$user.loggedIn) {
		navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
	}
</script>

{#if $user}
	<slot />
{/if}