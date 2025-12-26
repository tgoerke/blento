<script lang="ts" module>
	export const settingsModal = $state({
		show: false,
		title: '',
		favicon: '',
		edited: false
	});
</script>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import Head from './Head.svelte';
	import { Modal, Heading, Label, Input } from '../../foxui';
	import { getUpdateRecordFunctionsContext } from '$lib/website/context';

	let { data } = $props();

	$effect(() => {
		settingsModal.title = data?.value?.title;
		settingsModal.favicon = data?.value?.favicon;
	});

	const updateFunctions = getUpdateRecordFunctionsContext();

	const update = async () => {
		if (!settingsModal.edited) return {};

		settingsModal.edited = false;

		return {
			title: settingsModal.title,
			favicon: settingsModal.favicon
		};
	};

	onMount(() => {
		updateFunctions.push(update);
	});

	onDestroy(() => {
		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});

	$inspect(settingsModal);
</script>

<Modal bind:open={settingsModal.show}>
	<Heading>Website Settings</Heading>

	<Label>Title</Label>
	<Input
		type="text"
		bind:value={settingsModal.title}
		onkeydown={() => (settingsModal.edited = true)}
	/>
</Modal>

{#key settingsModal.title + settingsModal.favicon}
	<Head data={{ value: { title: settingsModal.title, favicon: settingsModal.favicon } }} />
{/key}
