<script lang="ts">
	import { Button } from '@foxui/core';
	import Icon from './Icon.svelte';

	let { onclick }: { onclick: () => void } = $props();
</script>

<Button {onclick} variant="ghost" class="w-full justify-start">
	<Icon class="size-4" />

	Embed stream.place
</Button>
