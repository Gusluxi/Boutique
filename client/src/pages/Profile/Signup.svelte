<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { baseURL } from "../../store/generalStore.js";
    import { toast } from '@zerodevx/svelte-toast'

    const navigate = useNavigate();
	const location = useLocation();

    let username;
    let email;
    let password;

    function showToast(msg) {
        toast.push(msg, {
                theme: {
                    '--toastBackground': '#ffdc6a',
                    '--toastBarBackground': '#C53030'
            }});
    }

    async function handleSignup() {
        let validUser = true;

        if (!username || username > 18) {
            validUser = false;
            showToast("Please add a username between 0-18 char");
        }
        if (!email || email > 320) {
            validUser = false;
            showToast("Please add a valid email");
        }
        if (!password || password > 30) {
            validUser = false;
            showToast("Please add a valid password");
        } 

        if (validUser) {
            const response = await fetch($baseURL + '/auth/signup', {
			method: 'POST',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
			body: JSON.stringify({
				username,
                email,
                password
			})
		    });
            const result = await response.json();
            if (result.rowsAffected > 0) {
                toast.push("Account created!")
                const from = ($location.state && $location.state.from) || "/login";
		        navigate(from, { replace: true });
            }
        }
    }

</script>
<div id="account-wrapper">
    <div id="login-area">
        <h4>Create a new account</h4>
        <div autocomplete="off">
            <input
                bind:value={username}
                type="text"
                name="username"
                placeholder="Username"
                autocomplete="off"
            />
            <br/>
            <input
                bind:value={email}
                type="email"
                name="email"
                placeholder="Email"
                autocomplete="off"
            />
            <br />
            <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
                autocomplete="off"
            />
            <br />
            <button on:click={handleSignup} type="submit">Signup</button>
        </div>
    </div>
</div>


<style>
    #account-wrapper {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        flex-direction: column;
        padding: 2rem;
    }

    #login-area {
        font-size: 1.5rem;
        border: solid 4px #c5c5c5;
        padding: 2rem;
        width: 11em;
        margin: auto;
    }
</style>