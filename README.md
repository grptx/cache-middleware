# Cache Middleware

## Install

```
yarn add express-http-cache-middleware
```
or

```
npm install express-http-cache-middleware
```

## Usage

```
import { HttpCacheControl } from 'express-http-cache-middleware';
...
router.get(
            '/ping',
            HttpCacheControl.Etag(() => 'ping-tag'),
            RouteController.pingResult,
        );

```
