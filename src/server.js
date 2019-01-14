import express from 'express';
//import { createServer } from 'http';
import next from 'next';
import path from 'path';
// import { parse } from 'url';
import LruCache from 'lru-cache';

const dev = process.env.NODE_ENV === 'development';

const port = 3001;

const app = next({
    dev,
});
const handle = app.getRequestHandler();

function getCacheKey(req) {
    return req.path;
}

const cache = new LruCache({
    maxAge: 10 * 1000, // Maximum age in ms
});

const server = express();

app.prepare().then(() => {

    // static resources
    server.use('/static/*', express.static(path.resolve(__dirname, '../static')));

    // nextjs resources
    server.get('/_next/*', (req, res) => {
        handle(req, res);
    });

    // ssr
    server.get('*', async (req, res) => {
        const cacheKey = getCacheKey(req);

        const cached = cache.get(cacheKey);
        if (cached !== undefined) {
            // return from cache
            console.log(`cache hit ${cacheKey}`);
            res.send(cached);
            return;
        }
        console.log(`cache miss ${cacheKey}`);

        const html = await app.renderToHTML(req, res, req.path, req.query);
        if (res.statusCode === 200) {
            // save to cache
            cache.set(cacheKey, html);
        }
        res.send(html);
    });

    server.listen(port, (err) => {
        if (err) {
            throw err;
        }
        console.log(`start server http://localhost:${port}`);
    });

}).catch(err => {

});
