# blento

WORK IN PROGRESS, not ready for use yet, but you can test it out at: https://blento.app (no guarantee that your blento wont be broken at some point though and might have to be recreated).

your personal website in a bento style layout, using your bluesky PDS as a backend.

made with svelte, tailwind.

## Selfhosting with cloudflare workers

- fork this repo
- create a cloudflare worker application and connect it to your fork
- change the vars in `wrangler.jsonc`

```json
	"vars": {
		"PUBLIC_HANDLE": "your-bluesky-handle",
		"PUBLIC_IS_SELFHOSTED": "true",
		"PUBLIC_DOMAIN": "https://your-cloudflare-worker-or-custom-domain.com"
	}
```

DONE :) your blento should be live after a minute or two at `your-cloudflare-worker-or-custom-domain.com` and you can edit it by signing in with your bluesky account at `your-cloudflare-worker-or-custom-domain.com/edit`