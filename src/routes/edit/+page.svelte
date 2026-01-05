<script lang="ts">
	import { page } from '$app/state';
	import EditableWebsite from '$lib/EditableWebsite.svelte';
	import { type Item } from '$lib/types.js';

	let { data } = $props();
</script>

<EditableWebsite
	handle={data.handle}
	did={data.did}
	{data}
	items={Object.values(data.data['app.blento.card']).map((i) => i.value) as Item[]}
/>
