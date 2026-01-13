<script lang="ts">
	let { favicon, title, image }: { favicon: string | null; title: string | null; image?: string } =
		$props();
</script>

<svelte:head>
	{#if favicon}
		<link rel="icon" href={favicon} />
	{/if}

	{#if title}
		<title>{title}</title>
	{/if}

	{#if image}
		<meta property="og:image" content={image} />
		<meta name="twitter:image" content={image} />
		<meta name="twitter:card" content="summary_large_image" />
	{/if}
</svelte:head>
