<script lang="ts">
	import { page } from '$app/state';
	import Website from '$lib/Website.svelte';
	import WebsiteWrapper from '$lib/website/WebsiteWrapper.svelte';

	let { data } = $props();
</script>

<WebsiteWrapper {data} handle={page.params.handle}>
	<Website handle={page.params.handle} did={data.did} />
</WebsiteWrapper>
