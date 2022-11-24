// import puppeteer package
const puppeteer=require('puppeteer');

// puppeteer methods must be written within async function
(async () => {
    try {
    // launching puppeteer
    const args = [
        '--window-size=1920,1080',
        '--disable-infobars ',
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process'
    ]
    const browser = await puppeteer.launch({
        headless:false,
                defaultViewport:null,
        devtools:false,
        args
      });
    // creating page
    const page = await browser.newPage();
    // navigate to an url
    await page.goto('https://us-sandbox.insideyourbusiness.com/?automation-test');
    // wait until the image load
    let circleSelector="circle";
    let menuSelector='[aria-label="Something Else"]';
    const delay = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

    await page.waitForSelector(circleSelector);
    await page.click(circleSelector);
    await delay(5000);

    //find iframe
    const iframeHandle = await page.waitForSelector('div#inside_holder iframe');
    var frame = await iframeHandle.contentFrame();
    await frame.waitForSelector(menuSelector);

    //click Something Else button
    const menuElement = await frame.$(menuSelector);
    await menuElement.click();
    await delay(2000);

    //input email
    const emailField = 'input[type="email"]';
    await frame.waitForSelector(emailField);
    await frame.type(emailField, "amandafloren11@gmail.com", {delay: 100})

    //click send button
    const sendText = '.icon-send-squared';
    await frame.waitForSelector(sendText);
    const waitSendBtn = await frame.$(sendText);
    await waitSendBtn.click();
    await delay(2000);

    //input phone number then click send button
    const phoneNumberField = 'input[type="text"]'
    await frame.waitForSelector(phoneNumberField);
    await frame.type(phoneNumberField, "81282187488")
    await waitSendBtn.click();
    await delay(2000);

    //input a message then click send button
    await frame.waitForSelector(emailField);
    await frame.type(emailField, "This is a test message", {delay: 100})
    await waitSendBtn.click();

    //close the browser
    await browser.close();
    }
    catch (err) {
        console.error(err);
      }
  })();