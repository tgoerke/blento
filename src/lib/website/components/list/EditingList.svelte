<script lang="ts">
	import { getContext, type Snippet } from 'svelte';
	import { SingleRecord } from '..';
	import { TID } from '@atproto/common-web';
	import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
	import { deleteRecord } from '$lib/oauth/atproto';
	import { parseUri } from '../../utils';
	import type { ListCollections } from '$lib/website/types';

	let {
		records,
		collection,
		item,
		addItem,
		empty
	}: {
		records: Record<string, ListRecord>;
		collection: ListCollections;
		item: Snippet<[any, any]>;
		addItem: Snippet<[any]>;
		empty?: Snippet;
	} = $props();

	let allRecords = $state(records);

	$inspect(records);

	const did = getContext('did') as string;
</script>

{#if Object.keys(allRecords).length === 0 && empty}
	{@render empty()}
{:else}
	{#each Object.values(allRecords) as itemData}
		<SingleRecord data={itemData} collection={collection} rkey={parseUri(itemData.uri as string).rkey}>
			{#snippet child(data)}
				{@render item(data, async () => {
					if (!itemData.cid) {
						const { rkey } = parseUri(itemData.uri as string);
						delete allRecords[rkey];
						return;
					}
					const { rkey } = parseUri(itemData.uri as string);
					await deleteRecord({ did, collection, rkey });

					delete allRecords[rkey];
				})}
			{/snippet}
		</SingleRecord>
	{/each}
{/if}

{@render addItem?.((record) => {
	const rkey = TID.nextStr();

	allRecords[rkey] = {
		cid: '',
		uri: 'at://' + did + '/' + collection + '/' + rkey,
		value: record ?? {}
	};
	console.log(allRecords);
})}
