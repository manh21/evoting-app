<page>
    <actionBar title="Svelte Native App" />
    <gridLayout>
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="info" horizontalAlignment="center" verticalAlignment="middle" textWrap="true">
            <formattedString>
                <span class="fas" text="&#xf135;" />
                <span text=" {message}" />
            </formattedString>
        </label>
    </gridLayout>
</page>

<script lang="typescript">
    let message: string = 'New Svelte Native App :)';
</script>

<style>
    .info .fas {
        color: #3A53FF;
    }
    .info {
        font-size: 20;
    }
</style>
