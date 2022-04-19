<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { toast } from '@zerodevx/svelte-toast'
    import { user } from "../../store/profileStore.js";
    import { baseURL } from "../../store/generalStore.js";
    

    const navigate = useNavigate();
	const location = useLocation();
    let editable = false;
    let username;
    let email;

    if ($user.loggedIn) {
        username = $user.currentUser.username;
        email = $user.currentUser.email;
    }

    function toggleEdit() {
        editable = true;
    }

    async function saveEdit() {
        const response = await fetch($baseURL + '/api/profiles/' + $user.currentUser.id, {
			method: 'PATCH',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
			body: JSON.stringify({
				username,
                email
			})
		})
        const result = await response.json();
        console.log(result.rowsAffected);
        if (result.rowsAffected > 0) {
            toast.push("Success")
            $user.currentUser.username = username;
            $user.currentUser.email = email;
            editable = false;
        } else {
            toast.push("Failed - " + result.error, {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
            }});
        }
    } 

    function cancelEdit() {
        username = $user.currentUser.username;
        email = $user.currentUser.email;
        editable = false;
    }

    async function handleLogout() {
        const response = await fetch($baseURL + '/auth/logout/');
        const result = await response.json();
        console.log(result);
        
        if (result.loggedIn === false) {
            user.set(result.loggedIn)
        }
        navigate("/login", {
			state: { from: $location.pathname },
			replace: true,
		});
    }

</script>


<h1>Profile</h1>
{#if editable}
<h3>Username: <input bind:value="{username}"></h3>
<h3>Email: <input bind:value="{email}"></h3>
<button on:click={saveEdit}>Save</button>
<button on:click={cancelEdit}>Cancel</button>

{:else}
    <h3>Username: {username}</h3>
    <h3>Email: {email}</h3>
    <button on:click={toggleEdit}>Edit</button>
{/if}

<button on:click="{handleLogout}">Logout</button>
