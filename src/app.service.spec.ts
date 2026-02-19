import { AppService } from './app.service';

describe('AppService', () => {
  it('should return API route message', () => {
    const appService = new AppService();
    expect(appService.getHello()).toBe('API is in /api/v2/noticias');
  });
});
