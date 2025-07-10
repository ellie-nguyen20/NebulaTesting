import { Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async visit() {
    await this.page.goto('/');
  }

  async checkUI() {
    const page = this.page;
    const visibleTexts = [
      'Rent',
      'Compute Power',
      'On Demand',
      'Access high-performance GPUs and CPUs instantly',
      'Trusted by the Best',
      'Our Mission',
      'Empowering innovation',
      'Proud NVIDIA Partner Network (NPN)',
      'Our Service',
      'Serverless AI',
      'Compute',
      "Canada's First Sovereign AI Cloud",
      'How Nebula Block Works',
      'Advantage',
      'AI Pioneers Since 2020',
      'Cost-Effective Solutions',
      'Tailored Expertise for You',
      'Start your AI journey',
      'Get in touch',
      'Services',
      'Contact Us',
      'GitHub',
      'API',
      'Docs',
      'Newsletter',
      'Subscribe to our newsletter'
    ];

    for (const text of visibleTexts) {
        const el = page.getByText(text, { exact: false }).first();
        await expect(el).toBeVisible();
    }
      
  }

  async checkMenu() {
    const menuItems = [
      'Serverless AI', 'Compute', 'Pricing', 'Blog', 'Company',
      'FAQs', 'Docs', 'EN', 'FR', 'Launch', 'Sign up'
    ];
  
    const header = this.page.locator('div.header');
  
    for (const item of menuItems) {
      const locator = header.getByText(item, { exact: false }).first();
      await locator.scrollIntoViewIfNeeded();
      await expect(locator).toBeVisible();
    }
  }
  

  async clickChatBot() {
    await this.page.getByText('Search for GPU resources', { exact: false }).click();
    await expect(this.page.getByRole('heading', { name: 'Search for GPU resources' })).toBeVisible();
  }

  async sendChatMessage(message: string) {
    const iframe = this.page.frameLocator('iframe[src*="chat.nebulablock.com"]');
    const textarea = iframe.locator('textarea[placeholder="Ask our AI expert now"]');
    const sendButton = iframe.locator('button.btn-primary.btn-medium.ml-3.w-8.px-0');

    await expect(textarea).toBeVisible({ timeout: 10000 });
    await textarea.fill(message);

    await expect(sendButton).toBeVisible({ timeout: 10000 });
    await sendButton.click();
  }
}
