describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should load the main screen', async () => {
    await expect(element(by.id('main-screen'))).toBeVisible();
  });

  it('should show rate after tap', async () => {
    await element(by.id('coin')).tap();
    await expect(element(by.id('rate'))).toBeVisible();
  });
});
