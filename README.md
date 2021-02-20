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
            HttpCacheControl.Etag(() => 'ping-tag'), // :string
            HttpCacheControl.MaxAge(() => 300), // :number 
            HttpCacheControl.LastModified(() => new Date()), // :Date
            RouteController.pingResult,
        );

```
