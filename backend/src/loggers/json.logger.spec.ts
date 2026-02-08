import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();
  });

  it('should format log message as JSON with level, message and optionalParams', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined as any);

    logger.log('test-message', 'param1', { a: 1 });

    expect(spy).toHaveBeenCalledTimes(1);
    const [payload] = spy.mock.calls[0];
    const parsed = JSON.parse(payload as string);

    expect(parsed).toEqual({
      level: 'log',
      message: 'test-message',
      optionalParams: ['param1', { a: 1 }],
    });

    spy.mockRestore();
  });

  it('should use correct console method for each level', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => undefined as any);
    const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined as any);
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => undefined as any);
    const debugSpy = jest.spyOn(console, 'debug').mockImplementation(() => undefined as any);

    logger.log('log');
    logger.error('error');
    logger.warn('warn');
    logger.debug?.('debug');

    expect(logSpy).toHaveBeenCalledTimes(1);
    expect(errorSpy).toHaveBeenCalledTimes(1);
    expect(warnSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledTimes(1);

    logSpy.mockRestore();
    errorSpy.mockRestore();
    warnSpy.mockRestore();
    debugSpy.mockRestore();
  });
});
