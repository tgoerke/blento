<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	{#if data?.value?.favicon}
		<link
			rel="icon"
			href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>{data
				.value.favicon}</text></svg>"
		/>
	{/if}

	<meta property="og:type" content="website" />

	{#if data?.value?.description}
		<meta name="description" content={data.value.description} />
		<meta property="og:description" content={data.value.description} />
		<meta name="twitter:description" content={data.value.description} />
	{/if}

	{#if data?.value?.title}
		<title>{data.value.title}</title>
		<meta property="og:title" content={data.value.title} />
		<meta name="twitter:title" content={data.value.title} />
	{/if}

	{#if data?.value?.image}
		<meta property="og:image" content={data.value.image} />
		<meta name="twitter:image" content={data.value.image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}

	{#if data?.value?.url}
		<meta property="twitter:domain" content={new URL(data.value.url).hostname} />
		<meta property="twitter:url" content={data.value.url} />
	{/if}
</svelte:head>
