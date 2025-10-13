// import { getRequestContext } from '@opennextjs/cloudflare';
import { getCloudflareContext } from '@opennextjs/cloudflare';
// import Database from 'better-sqlite3';
// import fs from 'fs';


// const LOCAL_DB = './d1.sqlite';


// function getLocalDb() {
//     if (!fs.existsSync(LOCAL_DB)) {
//         throw new Error('Local DB not found. Run `npm run migrate` to create migrations.');
//     }
//     return new Database(LOCAL_DB, { readonly: false });
// }


export async function d1All(sql: string, params: (string | number)[] = []) {
    try {
        // const ctx = getCloudflareContext();
        // const env = ctx?.env as any;
        const { env } = getCloudflareContext();
        if (env && env.DB) {
            const res = await env.DB.prepare(sql).bind(...params).all();
            console.log(`===>>> res :: ${JSON.stringify(res)}`)
            return res.results || [];
        }
    } catch (e) {
        // fallback
        console.log("Something went wrong")
        console.error(e)
    }
    return null
    // const db = getLocalDb();
    // const stmt = db.prepare(sql);
    // const rows = stmt.all(...params);
    // db.close();
    // return rows;
}

// export async function d1First(sql: string, params: any[] = []) {
//     const rows = await d1All(sql, params);
//     if(rows) {
//         return rows[0] ?? null;
//     }
//     return null;
// }

export async function d1First<T>(sql: string, params: (string | number)[] = []) {
    // const rows = await d1All(sql, params);
    try {
        // const ctx = getCloudflareContext();
        // const env = ctx?.env as any;
        const { env } = getCloudflareContext();
        if (env && env.DB) {
            const res = await env.DB.prepare(sql).bind(...params).first<T>();
            console.log(`===>>> res :: ${JSON.stringify(res)}`)
            return res;
        }
    } catch (e) {
        // fallback
        console.log("Something went wrong")
        console.error(e)
    }
    return null;
}


export async function d1Run(sql: string, params: (string | number)[] = []) {
    try {
        // const ctx = getCloudflareContext();
        // const env = ctx?.env as any;
        const { env } = getCloudflareContext();
        // const env = ctx.env;
        if (env && env.DB) {
            const res = await env.DB.prepare(sql).bind(...params).run();
            return res;
        }
    } catch (e) {
        // fallback
        console.log("Something went wrong")
        console.error(e)
    }
    return null;
    // const db = getLocalDb();
    // const stmt = db.prepare(sql);
    // const info = stmt.run(...params);
    // db.close();
    // return info;
}