import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: "new" });
  try {
    const page = await browser.newPage();
    await page.goto(
      "https://www.google.com/search?q=node+%E9%80%80%E5%87%BAchrome&sca_esv=602116154&sxsrf=ACQVn0-JiDXBXXpLt0gcQEUy01WXEhEJqQ%3A1706431614727&ei=fhS2ZauGLKmM4-EPrPucqAw&ved=0ahUKEwirveqR2f-DAxUpxjgGHaw9B8UQ4dUDCBA&uact=5&oq=node+%E9%80%80%E5%87%BAchrome&gs_lp=Egxnd3Mtd2l6LXNlcnAiEW5vZGUg6YCA5Ye6Y2hyb21lMggQABiJBRiiBDIIEAAYgAQYogQyCBAAGIAEGKIESOQ3UOQEWJozcAR4AJABAJgBxgGgAbgRqgEEMC4xNLgBA8gBAPgBAcICBxAjGLACGCfCAgQQIxgnwgIGEAAYBxgewgIHEAAYgAQYDcICCBAAGAgYBxgewgIKECEYChigARjDBOIDBBgBIEGIBgE&sclient=gws-wiz-serp#ip=1"
    );
    // await page.goto('https://ant.design/components/form-cn');
    await page.screenshot({ path: "example1.png" });
  } catch (error) {
    console.error(error);
  } finally {
    await browser.close();
  }
})();
