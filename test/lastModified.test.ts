import { Request, Response, NextFunction } from "express-serve-static-core";
import * as assert from 'assert';
import { HttpCacheControl } from '../lib';
import * as httpMocks from 'node-mocks-http';

describe('LastModified tests', () => {
    let mockRequest = httpMocks.createRequest();
    let mockResponse = httpMocks.createResponse()
    const nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = httpMocks.createRequest();
        mockResponse = httpMocks.createResponse();
    });

    it('No if-modified-since', (done) => {
        const lastModifiedDate: Date = new Date();
        const m = HttpCacheControl.LastModified(() => lastModifiedDate)
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(lastModifiedDate.toUTCString(), mockResponse.getHeader('last-modified'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });

    it('With if-modified-since prev', (done) => {
        const lastModifiedDate: Date = new Date();
        mockRequest.headers = {
            'if-modified-since': new Date(lastModifiedDate.getTime() - 1000).toUTCString()
        }
        const m = HttpCacheControl.LastModified(() => lastModifiedDate)
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(lastModifiedDate.toUTCString(), mockResponse.getHeader('last-modified'));
            assert.strictEqual(200, mockResponse.statusCode);
            done();
        });
    });

    it('With if-modified-since post', (done) => {
        const lastModifiedDate: Date = new Date();
        mockRequest.headers = {
            'if-modified-since': new Date(lastModifiedDate.getTime() + 1000).toUTCString()
        }
        const m = HttpCacheControl.LastModified(() => lastModifiedDate)
        m(mockRequest as Request, mockResponse as Response, nextFunction).then(() => {
            assert.strictEqual(lastModifiedDate.toUTCString(), mockResponse.getHeader('last-modified'));
            assert.strictEqual(304, mockResponse.statusCode);
            done();
        });
    });
})
