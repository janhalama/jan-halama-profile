import type { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';
import { ConfigService } from '../../services/config.service';
import { MessagesService } from '../../services/messages.service';

type Result = {
  success: boolean;
};

type Error = {
  message: string;
  detail?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result | Error>,
) {
  try {
    const configService = new ConfigService();
    const config = configService.get();
    if (req.method !== 'POST') {
      return res.status(405).json({
        message: 'Method not allowed',
        detail: `HTTP method ${req.method} not allowed.`,
      });
    }

    if (req.headers['content-type'] !== 'application/json') {
      return res.status(415).json({
        message: 'Unsupported media type',
        detail: `Media type ${req.headers['content-type']} not supported. Supported media types: application/json`,
      });
    }

    // verify reCAPTCHA response
    var VERIFY_URL = `https://www.google.com/recaptcha/api/siteverify?secret=${config.reCapchaConfig.secret}&response=${req.body['g-recaptcha-response']}`;
    const verifyResponse = await fetch(VERIFY_URL, { method: 'POST' });
    const verifyResult = await verifyResponse.json();

    if ((verifyResult as any).success !== true) {
      console.error('Recaptha verification failed', verifyResult);
      return res.status(422).json({
        message: 'Your message has not been sent.',
        detail: 'ReCaptcha verification failed.',
      });
    }

    const messagesService = new MessagesService(configService);

    messagesService.create({
      email: req.body.email,
      message: req.body.message,
      name: req.body.name,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Unhandled exception, POST /api/messages route', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
}
