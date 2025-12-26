<script lang="ts">
	import { getBlob, uploadImage } from '$lib/oauth/atproto';
	import { getDidContext } from '$lib/website/context';
	import { image_collection } from '$lib/website/data';
	import { cn } from '$lib/website/foxui';
	import Button from '$lib/website/foxui/button/Button.svelte';

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

	const did = getDidContext();

	let image = $state('');

	$effect(() => {
		console.log('getting blob for', data?.[key]?.ref.$link);
		getBlob({ cid: data?.[key]?.ref.$link, did }).then((url) => {
			image = url;
		});
	});
	$inspect(image);
</script>

<div class={cn(className)}>
	{#key image}
		{#if image}
			<img class="h-full w-full object-cover" src={image} alt="" />
		{/if}
	{/key}

	<Button
		onclick={() => {
			const input = document.createElement('input');
			input.type = 'file';
			input.accept = 'image/*';
			input.onchange = async () => {
				const file = input.files?.[0];
				if (file) {
					// convert to blob
					const blob = new Blob([await file.arrayBuffer()], { type: file.type });

					const blobInfo = await uploadImage({
						image: blob,
						did,
						collection: image_collection,
						rkey,
						key
					});

					data ??= {};
					console.log('blobInfo', blobInfo);
					data[key] = blobInfo;

					getBlob({ cid: data?.[key]?.ref.$link, did }).then((url) => {
						image = url;
					});
				}
			};
			input.click();
		}}
		class="absolute bottom-2 right-2">Edit</Button
	>
</div>
