import fetch from 'node-fetch';
import { CreateMessageResult } from './dtos/create-message-result';
import { CreateMessageDto } from './dtos/create-message.dto';
import { ConfigService } from './config.service';
import { Config } from './interfaces/config.interface';

export class MessagesService {
  private config: Config;
  constructor(private configService: ConfigService) {
    this.config = this.configService.get();
  }
  async create(
    createMessageDto: CreateMessageDto,
  ): Promise<CreateMessageResult> {
    try {
      const response = await fetch(
        `${this.config.sendGridConfig.baseUrl}/v3/mail/send`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.config.sendGridConfig.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [
              {
                to: [
                  {
                    email: 'mail@janhalama.cz',
                  },
                ],
                subject: 'My public profile message',
              },
            ],
            from: {
              email: 'profile@janhalama.cz',
            },
            content: [
              {
                type: 'text/html',
                value: `<p>Name: ${createMessageDto.name}</p>
            <p>E-Mail: ${createMessageDto.email}</p>
            <p>Message: ${createMessageDto.message}</p>`,
              },
            ],
          }),
        },
      );
      if (response.status === 202) {
        return {
          success: true,
        };
      } else {
        console.error(
          `Failed to send e-mail, expected status code 202, received status code ${response.status}`,
        );
        return {
          success: true,
          errorMessage: '¯_(ツ)_/¯ Failed to send your message.',
        };
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          `Failed to send e-mail with error: ${error.message}`,
          error,
        );
        return {
          success: false,
          errorMessage: '¯_(ツ)_/¯ Failed to send your message.',
        };
      } else {
        console.error(`Failed to send e-mail`, error);
        return {
          success: false,
          errorMessage: '¯_(ツ)_/¯ Failed to send your message.',
        };
      }
    }
  }
}
