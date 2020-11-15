<frame defaultPage={ auth_type == 'login' ? Login : Login} />

<script>
    import Login from './Login'
    export let auth_type = 'login'
</script>