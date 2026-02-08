import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  private formatMessage(level: string, message: any, optionalParams: any[] = []): string {
    const base: Record<string, string> = {
      level: String(level),
      message: this.stringifyValue(message),
    };

    if (optionalParams.length > 0) {
      base.optionalParams = this.stringifyValue(optionalParams);
    }

    return Object.entries(base)
      .map(([key, value]) => `${this.escape(key)}=${this.escape(value)}`)
      .join('\t');
  }

  private stringifyValue(value: any): string {
    if (value instanceof Error) {
      return value.stack || value.message || String(value);
    }

    if (typeof value === 'string') {
      return value;
    }

    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }

  private escape(value: string): string {
    return value
      .replace(/\\/g, '\\\\')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t')
      .replace(/=/g, '\\=');
  }

  log(message: any, ...optionalParams: any[]): void {
    console.log(this.formatMessage('log', message, optionalParams));
  }

  error(message: any, ...optionalParams: any[]): void {
    console.error(this.formatMessage('error', message, optionalParams));
  }

  warn(message: any, ...optionalParams: any[]): void {
    console.warn(this.formatMessage('warn', message, optionalParams));
  }

  debug?(message: any, ...optionalParams: any[]): void {
    console.debug(this.formatMessage('debug', message, optionalParams));
  }

  verbose?(message: any, ...optionalParams: any[]): void {
    console.log(this.formatMessage('verbose', message, optionalParams));
  }
}
