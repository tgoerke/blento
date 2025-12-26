import type { data } from './data';
import type { Record as ListRecord } from '@atproto/api/dist/client/types/com/atproto/repo/listRecords';

export type Collection = keyof typeof data;

export type IndividualCollections = {
	[K in Collection]: (typeof data)[K] extends readonly unknown[] ? K : never;
}[Collection];

export type ListCollections = Exclude<Collection, IndividualCollections>;

export type ElementType<C extends Collection> = (typeof data)[C] extends readonly (infer U)[]
	? U
	: unknown;

export type DownloadedData = { [C in Collection]: Record<string, ListRecord> };
