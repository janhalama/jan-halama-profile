import { ConfigService } from './config.service';
import { MessagesService as MessagesService } from './messages.service';

describe('MessagesService', () => {
  let service: MessagesService;

  beforeEach(async () => {
    service = new MessagesService(new ConfigService());
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
