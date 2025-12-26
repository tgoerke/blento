<script lang="ts">
	import { onDestroy, onMount, type Snippet } from 'svelte';
	import {
		getUpdateFunctionsContext,
		type UpdateRecordFunction,
		setUpdateRecordFunctionsContext
	} from '../../context';
	import { putRecord } from '$lib/oauth/atproto';
	import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';
	import { parseUri } from '$lib/website/utils';

	let {
		data,
		child
	}: {
		data: ListRecord;
		child: Snippet<[ListRecord]>;
	} = $props();

	let updateRecordFunctions: UpdateRecordFunction[] = $state([]);
	setUpdateRecordFunctionsContext(updateRecordFunctions);

	const updateFunctions = getUpdateFunctionsContext();
	const update = async () => {
		const updated: Record<string, any> = {};

		for (const updateFunction of updateRecordFunctions) {
			const updatedPart = await updateFunction();
			for (const key in updatedPart) {
				updated[key] = updatedPart[key];
				data.value[key] = updatedPart[key];
			}
		}

		if (Object.keys(updated).length > 0 || !data.cid) {
			if (!data.value.createdAt) {
				data.value.createdAt = new Date().toISOString();
			}
			data.value.updatedAt = new Date().toISOString();

			const { collection, rkey } = parseUri(data.uri);
			await putRecord({ collection, rkey, record: data.value });
			return true;
		}

		return false;
	};

	onMount(() => {
		updateFunctions.push(update);
	});
	onDestroy(() => {
		updateFunctions.splice(updateFunctions.indexOf(update), 1);
	});
</script>

{@render child(data)}
