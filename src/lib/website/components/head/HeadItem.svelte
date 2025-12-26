<script lang="ts">
	import { hasContext } from 'svelte';
	import { SingleRecord } from '../single-record';
	import Head from './Head.svelte';
	import type { ElementType, IndividualCollections } from '$lib/website/data';
	import { isEditing } from '$lib/website/context';

	let {
		collection,
		rkey = 'self'
	}: {
		collection: IndividualCollections;
		rkey?: ElementType<IndividualCollections>;
	} = $props();
</script>

<SingleRecord {collection} {rkey}>
	{#snippet child(data)}
		{#if isEditing()}
			{#await import('./EditHead.svelte') then { default: EditHead }}
				<EditHead {data} />
			{/await}
		{:else}
			<Head {data} />
		{/if}
	{/snippet}
</SingleRecord>
