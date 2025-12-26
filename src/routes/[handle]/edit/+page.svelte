<script lang="ts">
	import { page } from '$app/state';
	import Website from '$lib/Website.svelte';
	import EditingWebsiteWrapper from '$lib/website/EditingWebsiteWrapper.svelte';

	let { data } = $props();
</script>

<EditingWebsiteWrapper {data}>
	<Website handle={page.params.handle} did={data.did} />
</EditingWebsiteWrapper>
