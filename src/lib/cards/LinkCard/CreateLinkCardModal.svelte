<script lang="ts">
	import { Alert, Button, Input, Modal, Subheading } from '@foxui/core';
	import type { CreationModalComponentProps } from '../types';

	let { item = $bindable(), oncreate, oncancel }: CreationModalComponentProps = $props();

	let isFetchingMetadata = $state(false);

	let errorMessage = $state('');

	async function fetchMetadata() {
		errorMessage = '';
		try {
			item.cardData.domain = new URL(item.cardData.href).hostname;
		} catch (error) {
			errorMessage = 'Invalid URL!';
			return false;
		}
		isFetchingMetadata = true;

		try {
			const response = await fetch('/api/links?link=' + encodeURIComponent(item.cardData.href));
			if (response.ok) {
				const data = await response.json();
				item.cardData.description = data.description || '';
				item.cardData.title = data.title || '';
				item.cardData.image = data.images?.[0] || '';
				item.cardData.favicon = data.favicons?.[0] || undefined;
			} else {
				throw new Error();
			}
		} catch (error) {
			errorMessage = "Couldn't fetch metadata for this link!";
			return false;
		} finally {
			isFetchingMetadata = false;
		}
		return true;
	}
</script>

<Modal open={true} closeButton={false}>
	<Subheading>Enter a link</Subheading>
	<Input bind:value={item.cardData.href} />

	{#if errorMessage}
		<Alert type="error" title="Failed to create link card"><span>{errorMessage}</span></Alert>
	{/if}

	<div class="mt-4 flex justify-end gap-2">
		<Button onclick={oncancel} variant="ghost">Cancel</Button>
		<Button
			disabled={isFetchingMetadata}
			onclick={async () => {
				if (await fetchMetadata()) oncreate();
			}}>{isFetchingMetadata ? 'Creating...' : 'Create'}</Button
		>
	</div>
</Modal>
