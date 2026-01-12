import { loadData } from '$lib/website/load';
import { ImageResponse } from '@ethercorps/sveltekit-og';

export async function GET({ params, platform }) {
	const handle = params.handle;
	const data = await loadData(params.handle, platform);

	console.log(data.data['app.bsky.actor.profile'].self);
	const image =
		'https://cdn.bsky.app/img/avatar/plain/' +
		data.did +
		'/' +
		data.data['app.bsky.actor.profile'].self.value.avatar.ref.$link;

	const htmlString = `
<div tw="flex flex-col justify-center items-center w-full h-full bg-neutral-900">
      <img src="${image}" width="128" height="128" tw="rounded-full mb-8" />

	<h1 tw="text-neutral-50 text-7xl m-0">${handle}</h1>
	<p tw="mt-8 text-4xl text-neutral-300">Welcome to my website</p>
</div>
`;
	return new ImageResponse(htmlString, {
		width: 1200,
		height: 630
	});
}
