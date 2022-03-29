import { Request, Response, NextFunction } from "express-serve-static-core";
import * as assert from 'assert';
import { HttpCacheControl } from '../lib';
import * as httpMocks from 'node-mocks-http';

describe('MaxAge tests', () => {
    let mockRequest = httpMocks.createRequest();
    let mockResponse = httpMocks.createResponse()
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    it('simple call', (done) => {
        const m = HttpCacheControl.MaxAge(() => 3600);
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual('max-age=3600', mockResponse.getHeader('Cache-Control'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });

    it('with already cache-control', (done) => {
        mockResponse.setHeader('Cache-Control', 'plp');
        const m = HttpCacheControl.MaxAge(() => 3600);
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual('plp, max-age=3600', mockResponse.getHeader('Cache-Control'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });
})
