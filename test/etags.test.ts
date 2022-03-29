import { Request, Response, NextFunction } from "express-serve-static-core";
import * as assert from 'assert';
import { HttpCacheControl } from '../lib';
import * as httpMocks from 'node-mocks-http';
import * as etag from "etag";

describe('Etag tests', () => {
    let mockRequest = httpMocks.createRequest();
    let mockResponse = httpMocks.createResponse()
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    it('simple call', (done) => {
        const etagString = 'plp';
        const m = HttpCacheControl.Etag(() => etagString)
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(etag(etagString), mockResponse.getHeader('Etag'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });

    it('if-none-match match', (done) => {
        const etagString = 'plp';
        const m = HttpCacheControl.Etag(() => etagString);
        mockRequest.headers = {
            'if-none-match': etag(etagString)
        }
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(etag(etagString), mockResponse.getHeader('Etag'));
            assert.strictEqual(304, mockResponse.statusCode);
            done();
        });
    });

    it('if-none-match no match', (done) => {
        const etagString = 'plp';
        const m = HttpCacheControl.Etag(() => etagString);
        mockRequest.headers = {
            'if-none-match': etag(etagString+'plp')
        }
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(etag(etagString), mockResponse.getHeader('Etag'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });
})
