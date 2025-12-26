<script lang="ts">
	import { base } from '$app/paths';
	import { isEditing } from '$lib/website/context';
	import { getContext } from 'svelte';

	let {
		key,
		data,
		class: className,
		rkey
	}: {
		key: string;
		data: Record<string, any>;
		class?: string;
		rkey: string;
	} = $props();

	$inspect(data);
</script>

{#if isEditing()}
	{#await import('./ImageEditor.svelte') then { default: ImageEditor }}
		<ImageEditor class={className} {key} data={data.value} {rkey} />
	{/await}
{:else}
	<img class={className} src={base + '/image/' + data.value?.[key]?.ref.$link} alt="" />
{/if}
