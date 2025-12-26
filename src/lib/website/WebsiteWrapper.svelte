<script>
	import { setContext } from "svelte";
	import { setDataContext, setDidContext, setIsEditing } from "./context";

	let { data, children, handle } = $props();

	// svelte-ignore state_referenced_locally
	setDidContext(data.did);
	// svelte-ignore state_referenced_locally
	setDataContext(data.data);
	// svelte-ignore state_referenced_locally
	setContext('current', data.current);

	setIsEditing(false);

	$inspect(data);
</script>

{@render children?.()}
