<script lang="ts">
	import { getRecord } from '$lib/oauth/atproto';
	import { getContext, type Snippet } from 'svelte';
	import { type ElementType, type IndividualCollections } from '../../types';
	import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
	import { getDataContext, getDidContext, isEditing } from '$lib/website/context';

	let {
		collection,
		rkey,
		child
	}: {
		collection: IndividualCollections;
		rkey: ElementType<IndividualCollections>;
		child: Snippet<[ListRecord]>;
	} = $props();

	const data = getDataContext();
	const did = getDidContext();
</script>

{#if isEditing()}
	{#await import('./EditSingleRecord.svelte') then { default: EditSingleRecord }}
		{#await getRecord({ did, collection, rkey }) then record}
			<EditSingleRecord data={record}>
				{#snippet child(recordData)}
					{@render child(recordData)}
				{/snippet}
			</EditSingleRecord>
		{:catch error}
			<EditSingleRecord
				data={{
					uri: 'at://' + did + '/' + collection + '/' + rkey,
					value: {},
					cid: ''
				}}
			>
				{#snippet child(recordData)}
					{@render child(recordData)}
				{/snippet}
			</EditSingleRecord>
		{/await}
	{/await}
{:else}
	{@render child(data?.[collection]?.[rkey])}
{/if}
