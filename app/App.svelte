<page>
    <actionBar title="E-Voting App"></actionBar>
    <stackLayout verticalAlignment="center">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <stackLayout horizontalAlignment="center" orientation="vertical">
            <label class="info" verticalAlignment="center" textWrap="true">
                <formattedString>
                    <span class="fas" text="&#xf135;" />
                    <span text=" {message}" />
                </formattedString>
            </label>
        </stackLayout>
        <stackLayout  horizontalAlignment="center" orientation="horizontal" class="profile-actions">
            {#if $user_profile}
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <button text="LOGOUT" class="profile-action" on:tap={logout} />
            {:else}
                <button text="LOGIN" class="profile-action" on:tap={login} />
            {/if}
        </stackLayout>
    </stackLayout>
</page>

<script lang="typescript">
    import { icons } from "./utils/icons";
    import { user_token, user_profile, logout } from "./stores/user";
    import { onMount } from "svelte";
    import { showModal, navigate } from 'svelte-native';
    import Auth from "./components/Auth.svelte";
    import Vote from "./components/Vote.svelte";

    let message: string = 'New Svelte Native App :)';

    onMount(()=>{
        const user_data = $user_profile;
        if($user_profile){
            if(user_data.status !== 'Sudah Memilih'){
                navigate({ page: Vote});
            }
        }
        console.log(user_data);
        console.log("User Token ", $user_token)
        console.log("User Profile ", $user_profile)
    })

    function login() {
        showModal({ page: Auth, fullscreen: true, props: { auth_type: 'login'} });
    }

</script>

<style>
    .profile-action {
        margin: 20px;
        display: block;
        background-color: #3A53FF;
    }
    .info .fas {
        color: #3A53FF;
    }
    .info {
        font-size: 20;
    }
</style>