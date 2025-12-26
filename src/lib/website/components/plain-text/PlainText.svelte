<script lang="ts">
	import { isEditing } from '$lib/website/context';
	import { getContext } from 'svelte';

	let {
		key,
		data,
		placeholder,
		defaultContent,
		class: className
	}: {
		key: string;
		data: Record<string, any>;
		placeholder?: string;
		defaultContent?: string;
		class?: string;
	} = $props();
</script>

{#if isEditing()}
	{#await import('./PlainTextEditor.svelte') then { default: PlainTextEditor }}
		<PlainTextEditor class={className} {key} data={data.value} {placeholder} {defaultContent} />
	{/await}
{:else}
	<span class={className}>{data?.value?.[key] || defaultContent || placeholder}</span>
{/if}
