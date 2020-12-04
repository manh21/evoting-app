<page>
    <actionBar title="E-Voting App"></actionBar>
    <stackLayout>
        {#await getDataKandidat()}{:then data_kandidat}
            {#each data_kandidat as data}
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label class="info" verticalAlignment="center" textWrap="true">
                    <formattedString>
                        <span text=" {data}" />
                    </formattedString>
                </label>
            {/each}
        {:catch error}
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <label class="info" verticalAlignment="center" textWrap="true">
                <formattedString>
                    <span text=" {error}" />
                </formattedString>
            </label>
        {/await}
		<button text="To Details directly" />
	</stackLayout>
</page>

<script lang="typescript">
    import { user_token, user_profile, logout } from "../stores/user";
    import { showModal, navigate } from 'svelte-native';
    import { client } from "../lib/client";
    import { Kandidat } from "../models/kandidat";
    import { onMount } from "svelte";
    import TerimaKasih from "./TerimaKasih.svelte";
    import App from "../App.svelte";

    // let kandidat_data: Array<object>;

    interface KandidatResponse {
        status: string;
        data: {
            kandidat_data: Array<Kandidat>;
        };
        message: string;
    }
    
    onMount(() => {
        let user_data = $user_profile;
        if ($user_profile) {
            if(user_data.status === 'Sudah Memilih'){
                navigate({ page: TerimaKasih });
            }
        } else {
            navigate({page: App});
        }
    });

    async function getDataKandidat() {
        const response = await client.sendRequest<KandidatResponse>('/vote/kandidat/', 'GET', $user_token, null);
        return response.data.kandidat_data;
    }

</script>