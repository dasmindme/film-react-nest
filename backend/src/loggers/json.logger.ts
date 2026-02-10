import { Injectable, LoggerService } from '@nestjs/common';

interface JsonLogPayload {
  level: string;
  message: any;
  optionalParams: any[];
}

@Injectable()
export class JsonLogger implements LoggerService {
  private formatMessage(level: string, message: any, optionalParams: any[] = []): string {
    const payload: JsonLogPayload = { level, message, optionalParams };
    return JSON.stringify(payload);
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
