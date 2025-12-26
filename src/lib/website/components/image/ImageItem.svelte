<script lang="ts">
	import { image_collection } from '$lib/website/data';
	import {
		type ElementType,
		type IndividualCollections
	} from '$lib/website/types';
	import { SingleRecord } from '../single-record';
	import Image from './Image.svelte';

	let {
		rkey = 'self',
		key,
		class: className
	}: {
		rkey?: ElementType<IndividualCollections>;
		key: string;
		class?: string;
	} = $props();
</script>

<SingleRecord collection={image_collection} {rkey}>
	{#snippet child(data)}
		<Image {key} {data} class={className} {rkey} />
	{/snippet}
</SingleRecord>
