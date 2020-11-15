  
<page  actionBarHidden="true">
    <gridLayout class="layout page"  rows="auto, *, auto" >
        <label row="0" text="{icons.close}" class="icon close-button" horizontalAlignment="right" on:tap={closeModal} />
        <stackLayout row="1" class="form" verticalAlignment="center" >
            <label text="E-Voting" class="title" horizontalAlignment="center" />
            <stackLayout class="input-field m-t-10">
                <textField bind:text="{username}" class="input" hint="Username" keyboardType="email" autocorrect="false" autocapitalizationType="none" returnKeyType="next" on:returnPress="{() => password_edit.nativeView.focus()}" editable="{!isLoading}"/>
                <stackLayout class="hr-light"/>
            </stackLayout>

            <stackLayout class="input-field">
                <textField bind:text="{password}" bind:this={password_edit} class="input" hint="Password" secure="true" returnKeyType="done" on:returnPress="{doLogin}" editable="{!isLoading}" />
                <stackLayout class="hr-light"/>
            </stackLayout>

            <button text="Login" on:tap="{login}" class="btn m-t-20" isEnabled="{!isLoading}"/>

            <activityIndicator busy="{isLoading}" horizontalAlignment="center" verticalAlignment="center" class="activity-indicator" />
        </stackLayout>
    </gridLayout>
</page>

<script lang="typescript">
    import { icons } from "../utils/icons";
    import { alert } from "@nativescript/core/ui/dialogs";
    import { closeModal, navigate } from 'svelte-native'
    import { onMount } from 'svelte'
    import { user_token, user_profile, login } from '../stores/user'

    let username:string;
    let password:string;
    let password_edit:any;
    let isLoading = false;

    onMount(()=> {
        // console.log($user_profile);
        if ($user_profile) {
            closeModal($user_profile);
        }
    })

    function doLogin() {
        login(username, password).then(
            user => closeModal(user),
            err => {
                if (err.errorCode == 422) {
                    alert("Invalid username/password")
                } else {
                    alert(err.message);
                }
            }
        )
    }


</script>

<style>
    .close-button {
        font-size: 25;
        padding: 10;
    }
    .btn {
        background-color: black;
        color: white;
    }
    .title {
        font-weight: bold;
        font-size: 20;
        margin-top: 20;
        margin-bottom: 20;
        color: black;
    }
    .form {
        padding: 20;
    }
    .sign-up-label {
        font-size: 15;
        padding: 10;
    }
    .bold {
        font-weight: bold;
        color: black;
    }
</style>
