import type { CardDefinition } from '../types';
import CreateMapCardModal from './CreateMapCardModal.svelte';
import MapCard from './MapCard.svelte';
import SidebarItemMapCard from './SidebarItemMapCard.svelte';

export const MapCardDefinition = {
	type: 'mapLocation',
	contentComponent: MapCard,
	sidebarButtonText: 'map',
	createNew: (item) => {
		item.w = 2;
		item.h = 2;
		item.mobileH = 4;
		item.mobileW = 4;
	},

	sidebarComponent: SidebarItemMapCard,
	creationModalComponent: CreateMapCardModal
} as CardDefinition & { type: 'mapLocation' };
