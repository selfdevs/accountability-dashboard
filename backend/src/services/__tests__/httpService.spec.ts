import {
  generateContentTypeHeader,
  generateAuthorizationHeader,
  successResponse,
  errorResponse,
  generateSearchParams,
} from '../httpService';
import { ParameterizedContext } from 'koa';

describe('generateSearchParams', () => {
  it('should return empty string if no params', () => {
    const params = {};
    const result = generateSearchParams(params);
    expect(result.toString()).toBe('');
  });

  it('should return empty string if no params', () => {
    const params = {
      name: 'test',
    };
    const result = generateSearchParams(params);
    expect(result.toString()).toBe('name=test');
  });

  it('should return empty string if no params', () => {
    const params = {
      name: 'test',
      age: '20',
    };
    const result = generateSearchParams(params);
    expect(result.toString()).toBe('name=test&age=20');
  });
});

describe('generateContentTypeHeader', () => {
  it('should return correct content type header', () => {
    const contentType = generateContentTypeHeader('application/json');
    expect(contentType).toEqual({ 'Content-Type': 'application/json' });
  });
});

describe('generateAuthorizationHeader', () => {
  it('should return correct authorization header', () => {
    const authorization = generateAuthorizationHeader('token');
    expect(authorization).toEqual({ Authorization: 'Bearer token' });
  });
});

describe('successResponse', () => {
  it('should return correct response', () => {
    const ctx = {
      response: {},
    };
    successResponse(ctx as ParameterizedContext, 'message');
    expect(ctx).toEqual({
      response: { status: 200 },
      body: {
        message: 'message',
      },
    });
  });
});

describe('errorResponse', () => {
  it('should return correct response', () => {
    const ctx = {
      response: {},
    };
    errorResponse(ctx as ParameterizedContext, 'message');
    expect(ctx).toEqual({
      response: { status: 500 },
      body: {
        message: 'message',
      },
    });
  });

  it('should return response with a specified status', () => {
    const ctx = {
      response: {},
    };
    errorResponse(ctx as ParameterizedContext, 'message', 400);
    expect(ctx).toEqual({
      response: { status: 400 },
      body: {
        message: 'message',
      },
    });
  });
});
