import { Request, Response } from 'express-serve-static-core';
import { NextFunction } from 'express';

export class HttpCacheControl {
    public static LastModified(f:Function) {
        return (_req: Request, res: Response, next: NextFunction): void => {
            if (f) {
                const lastModified: Date = f();
                res.setHeader('Last-Modified',lastModified.toUTCString());
                if (_req.headers['if-modified-since']) {
                    if(_req.headers['if-modified-since']<lastModified.toUTCString()){
                        res.status(304).send();
                        next('route');
                    }
                }
            }
            next();
        };
    }

    public static async MaxAge(_req: Request, res: Response, next: NextFunction): Promise<void> {
        res.setHeader('Cache-Control', 'max-age=300');
        next();
    }
}
