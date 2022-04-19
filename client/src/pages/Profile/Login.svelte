<script>
	import { Link, useNavigate, useLocation } from "svelte-navigator";
	import { user } from "../../store/profileStore.js";
    import { baseURL } from "../../store/generalStore.js";
    import { toast } from '@zerodevx/svelte-toast'

	const navigate = useNavigate();
	const location = useLocation();

	let username;
	let password;
    let attemptsRemaining;    
    
	async function handleSubmit() {
        if (attemptsRemaining === 0) {
            toast.push("No more attempts available, Try again in 5 minutes", {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
            }});
        }
		const response = await fetch($baseURL + '/auth/login', {
			method: 'POST',
            headers: {
                "content-type": "application/json",
                "Accept": "application/json"
            },
			body: JSON.stringify({
				username,
                password
			})
		})
        const result = await response.json();
        attemptsRemaining = result.remaining;
        if (result.loggedIn) {
            user.set(result);
            const from = ($location.state && $location.state.from) || "/";
		    navigate(from, { replace: true });
        } else {
            toast.push("Invalid Username or Password, "+ result.remaining +" attepmts left", {
                theme: {
                    '--toastBackground': '#F56565',
                    '--toastBarBackground': '#C53030'
            }});
        }
	}
</script>
<div id="account-wrapper">
    <div id="login-area">
        <h3>Login</h3>
        <div >
            <input
                bind:value={username}
                type="text"
                name="username"
                placeholder="Username"
            />
            <br/>
            <input
                bind:value={password}
                type="password"
                name="password"
                placeholder="Password"
            />
            <br />
            <button on:click={handleSubmit} type="submit">Login</button>
        </div>
    </div>
    <div id="signup-area">
        <h4>Don't have an account?</h4>
        <Link to="/signup"><button>Sign up</button></Link>
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
        border: solid 4px #c5c5c5;;
        padding: 2rem;
        width: 11em;
        margin: auto;
    }

    #signup-area {
        font-size: 1.5rem;
        width: 11em;
        padding: 2rem;
        margin: auto;
    }

</style>