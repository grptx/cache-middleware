import { Request, Response } from "express-serve-static-core";
import { NextFunction } from "express";
import etag from "etag";

export class HttpCacheControl {
  public static LastModified(f: () => Date) {
    return (_req: Request, res: Response, next: NextFunction): void => {
      if (f) {
        const lastModified: Date = f();
        res.setHeader("Last-Modified", lastModified.toUTCString());
        if (_req.headers["if-modified-since"]) {
          if (_req.headers["if-modified-since"] < lastModified.toUTCString()) {
            res.status(304).send();
            next("route");
          }
        }
      }
      next();
    };
  }

  public static Etag(f: () => string) {
    return (_req: Request, res: Response, next: NextFunction): void => {
      if (f) {
        const _etag: string = f();
        res.setHeader("Etag", etag(String(_etag)));
        if (_req.headers["if-none-match"]) {
          if (_req.headers["if-none-match"] === String(etag)) {
            res.status(304).send();
            next("route");
          }
        }
      }
      next();
    };
  }

  public static MaxAge(f: () => number) {
    return (_req: Request, res: Response, next: NextFunction): void => {
      if (f) {
        const age: number = f();
        res.setHeader("Cache-Control", `max-age=${String(age)}`);
      }
      next();
    };
  }
}
