import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "express";
import * as etag from "etag";

export class HttpCacheControl {
    public static LastModified(f: (req?: Request) => Promise<Date> | Date) {
        return async (
            _req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            const lastModified: Date = await f(_req);
            res.setHeader("Last-Modified", lastModified.toUTCString());
            if (_req.headers["if-modified-since"]) {
                if (_req.headers["if-modified-since"] >= lastModified.toUTCString()) {
                    res.status(304).send();
                    return next("router");
                }
            }
            next();
        };
    }

    public static Etag(f: (req?: Request) => Promise<string> | string) {
        return async (
            _req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            const _etag: string = await f(_req);
            res.setHeader("Etag", etag(String(_etag)));
            if (_req.headers["if-none-match"]) {
                if (_req.headers["if-none-match"] === etag(String(_etag))) {
                    res.status(304).send();
                    return next("router");
                }
            }
            next();
        };
    }

    public static MaxAge(f: (req?: Request) => Promise<number> | number) {
        return async (
            _req: Request,
            res: Response,
            next: NextFunction
        ): Promise<void> => {
            const age: number = await f(_req);
            const oldCC = res.getHeader("Cache-Control") as string;
            let newCC = `max-age=${String(age)}`;
            if (oldCC) {
                newCC = oldCC.trim() + ', ' + newCC;
            }
            res.setHeader("Cache-Control", newCC);
            next();
        };
    }
}
