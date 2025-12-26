<script lang="ts">
	import { isEditing } from '$lib/website/context';
	import { marked } from 'marked';
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
	{#await import('./MarkdownTextEditor.svelte') then { default: MarkdownTextEditor }}
		<MarkdownTextEditor {key} data={data.value} {placeholder} {defaultContent} />
	{/await}
{:else}
	{@html marked.parse(data?.value?.[key] ?? defaultContent ?? ('' as string))}
{/if}
