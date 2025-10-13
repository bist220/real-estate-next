// // import { getRequestContext } from '@opennextjs/cloudflare';
// import { getCloudflareContext } from '@opennextjs/cloudflare';

// /**
//  * Uploads a file buffer to Cloudflare R2 bucket.
//  * The binding `IMAGES` must be configured in wrangler.toml.
//  */
// export async function uploadToR2(
//   key: string,
//   body: ArrayBuffer | Uint8Array,
//   contentType = 'application/octet-stream'
// ) {
//   const ctx = getCloudflareContext();
//   const env = ctx?.env as any;
//   if (!env || !env.IMAGES) throw new Error('R2 binding IMAGES not configured');
//   await env.IMAGES.put(key, body, { httpMetadata: { contentType } });
//   return key;
// }

// /**
//  * Returns the public URL for a stored R2 object.
//  */
// export function getR2PublicUrl(key: string) {
//   const base = process.env.R2_PUBLIC_BASE_URL ?? '';
//   const pattern = /\\$/;
//   if (!base) return `/uploads/${key}`; // fallback if no base configured
// //   return `${base.replace(/\\/$/, '')}/${key}`;
//   return `${base.replace(pattern, '')}/${key}`;
// }
