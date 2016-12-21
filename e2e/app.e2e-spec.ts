import { PlannerPage } from './app.po';

describe('planner App', function() {
  let page: PlannerPage;

  beforeEach(() => {
    page = new PlannerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('tdf works!');
  });
});
