<script lang="ts">
	import { type ElementType, type IndividualCollections } from '../../types';
	import { SingleRecord } from '..';
	import PlainText from './PlainText.svelte';

	let {
		collection,
		rkey = 'self',
		key,
		placeholder,
		defaultContent
	}: {
		collection: IndividualCollections;
		rkey?: ElementType<IndividualCollections>;
		key: string;
		placeholder?: string;
		defaultContent?: string;
	} = $props();
</script>

<SingleRecord {collection} {rkey}>
	{#snippet child(data)}
		<PlainText {key} {placeholder} {defaultContent} {data} />
	{/snippet}
</SingleRecord>
