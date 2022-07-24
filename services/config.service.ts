import { Config } from './interfaces/config.interface';

export class ConfigService {
  constructor() {}
  get(): Config {
    return {
      sendGridConfig: {
        baseUrl: 'https://api.sendgrid.com/',
        apiKey: process.env.SENDGRID_API_KEY?.trim() || '',
      },
      reCapchaConfig: {
        key: process.env.NEXT_PUBLIC_RECAPTCHA_KEY || '',
        secret: process.env.RECAPTCHA_SECRET || '',
      },
    };
  }
}
