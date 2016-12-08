import { PolytechCinemaPage } from './app.po';

describe('polytech-cinema App', function() {
  let page: PolytechCinemaPage;

  beforeEach(() => {
    page = new PolytechCinemaPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
