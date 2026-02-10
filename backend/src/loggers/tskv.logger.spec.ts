import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();
  });

  it('should format log message as TSKV with level and message', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined as any);

    logger.log('test-message', 'param1', { a: 1 });

    expect(spy).toHaveBeenCalledTimes(1);
    const [payload] = spy.mock.calls[0];

    expect(payload).toContain('level=log');
    expect(payload).toContain('message=test-message');
    expect(payload).toContain('optionalParams=');

    spy.mockRestore();
  });

  it('should escape special characters in keys and values', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => undefined as any);

    logger.log('line\nwith\ttabs=and=equals');

    const [payload] = spy.mock.calls[0];


    expect(payload).toContain('level=log');

    expect(payload).toContain('message=line\\nwith\\ttabs\\=and\\=equals');

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
