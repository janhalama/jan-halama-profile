
export interface SendGridConfig {
  baseUrl: string;
  apiKey: string;
}

export interface ReCapchaConfig {
  key: string;
  secret: string;
}

export interface Config {
  sendGridConfig: SendGridConfig;
  reCapchaConfig: ReCapchaConfig;
}
