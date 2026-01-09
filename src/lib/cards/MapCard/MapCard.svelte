<script lang="ts">
	import type { Item } from '$lib/types';
	import Map from './Map.svelte';

	let { item }: { item: Item } = $props();
</script>

{#key item.color}
	<Map {item} />
{/key}
