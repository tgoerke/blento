import { loadData } from '$lib/website/utils';

export async function load({ params }) {
	return await loadData(params.handle);
}
