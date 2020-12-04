<script lang="typescript">
    import { user_profile, logout } from "../stores/user";
    import { navigate } from 'svelte-native';
    import { onMount } from "svelte";
    import App from "../App.svelte";

    onMount(() => {
        const user_data = $user_profile;
        if(user_data.status === 'Sudah Memilih'){
            logout();
            setTimeout( () => {
                    navigate({ page: App })
                }
            , 5000);
        }
    });
</script>