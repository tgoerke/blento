import { getProfile } from '$lib/oauth/atproto';
import type { ProfileViewDetailed } from '@atproto/api/dist/client/types/app/bsky/actor/defs';
import type { CardDefinition } from '../../types';
import UpdatedBlentosCard from './UpdatedBlentosCard.svelte';

export const UpdatedBlentosCardDefitition = {
	type: 'updatedBlentos',
	contentComponent: UpdatedBlentosCard,
	loadData: async () => {
		const response = await fetch(
			'https://ufos-api.microcosm.blue/records?collection=app.blento.card'
		);
		const recentRecords = await response.json();
		const uniqueDids = new Set<string>();
		for (const record of recentRecords as { did: string }[]) {
			uniqueDids.add(record.did);
		}
		const profiles: Promise<ProfileViewDetailed>[] = [];

		for (const did of Array.from(uniqueDids)) {
			const profile = getProfile({ did });
			profiles.push(profile);
			if (profiles.length > 20) return;
		}
		return JSON.parse(JSON.stringify(await Promise.all(profiles)));
	}
} as CardDefinition & { type: 'updatedBlentos' };
