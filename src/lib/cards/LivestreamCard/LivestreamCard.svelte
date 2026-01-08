<script lang="ts">
	import { onMount } from 'svelte';
	import Icon from './Icon.svelte';
	import { getDidContext } from '$lib/website/context';
	import { listRecords } from '$lib/oauth/atproto';
	import { getIsMobile } from '$lib/helper';
	import type { ContentComponentProps } from '../types';
	import { getImageBlobUrl } from '$lib/website/utils';
	import { RelativeTime } from '@foxui/time';
	import { online } from 'svelte/reactivity/window';
	import { Badge } from '@foxui/core';

	let { item = $bindable() }: ContentComponentProps = $props();

	let did = getDidContext();

	let isMobile = getIsMobile();

	let isLoaded = $state(false);

	let latestLivestream:
		| {
				createdAt: string;
				title: string;
				thumb?: string;
				href: string;
				online?: boolean;
		  }
		| undefined = $state();

	onMount(async () => {
		const records = await listRecords({ did, collection: 'place.stream.livestream', limit: 3 });
		console.log(records);

		const values = Object.values(records);
		if (values?.length > 0) {
			const latest = JSON.parse(JSON.stringify(values[0]));
			console.log(latest);

			latestLivestream = {
				createdAt: latest.value.createdAt,
				title: latest.value.title as string,
				thumb: getImageBlobUrl({ link: latest.value.thumb?.ref.$link, did }),
				href: latest.value.canonicalUrl || latest.value.url,
				online: undefined
			};
		}

		if (latestLivestream) {
			try {
				const segmentsResponse = await fetch(
					'https://stream.place/xrpc/place.stream.live.getSegments?userDID=' +
						encodeURIComponent(did)
				);
				const segments = await segmentsResponse.json();

				const lastSegment = segments.segments[0];
				const startTime = new Date(lastSegment.record.startTime).getTime();

				const FIVE_MINUTES = 5 * 60 * 1000;
				const now = Date.now();

				latestLivestream.online = now - startTime <= FIVE_MINUTES;
			} catch (error) {
				console.error(error);
			}
		}

		isLoaded = true;
	});
</script>

<div class="h-full overflow-y-scroll p-4">
	{#if latestLivestream}
		<div class="flex min-h-full flex-col justify-between">
			<div>
				<div class="mb-4 flex items-center gap-2">
					<Icon class="size-6" />
					<div class="font-semibold">Latest Livestream</div>
				</div>

				<div class="mb-2 flex items-center gap-2">
					<div class="text-xs font-medium">
						started <RelativeTime date={new Date(latestLivestream.createdAt)} locale="en-US" /> ago
					</div>
					{#if latestLivestream.online === true}
						<Badge size="sm">
							<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
								<circle cx="50" cy="50" r="30" fill="currentColor" />
							</svg>

							live</Badge
						>
					{:else if latestLivestream.online === false}
						<Badge size="sm">ended</Badge>
					{:else}
						<div class="h-[22px]"></div>
					{/if}
				</div>

				<a href={latestLivestream?.href} target="_blank" rel="noopener noreferrer">
					<div
						class="text-accent-700 dark:text-accent-300 hover:text-accent-600 dark:hover:text-accent-400 text-xl font-semibold transition-colors duration-150"
					>
						{latestLivestream?.title}
					</div>
				</a>
			</div>

			{#if ((isMobile() && item.mobileH >= 4) || (!isMobile() && item.h >= 2)) && latestLivestream?.thumb}
				<a href={latestLivestream?.href} target="_blank" rel="noopener noreferrer">
					<img
						class="my-4 max-h-32 w-full rounded-xl object-cover"
						src={latestLivestream?.thumb}
						alt=""
					/>
					<span class="sr-only">open livestream</span>
				</a>
			{/if}
		</div>
	{:else if isLoaded}
		<div class="flex h-full w-full items-center justify-center">No latest stream found!</div>
	{:else}
		<div class="flex h-full w-full items-center justify-center">Looking for the latest stream</div>
	{/if}
</div>
