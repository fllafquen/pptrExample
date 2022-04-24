const { expect } = require('chai')
const puppeteer = require('puppeteer-extra')
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')


puppeteer.use(
    RecaptchaPlugin({
      provider: { id: '2captcha', token: '0239ea2ff1b78c212de49126cd7132c2' },
      visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
    })
  )

describe('My first Puppeteer Test', () => {
    it('should launch the browser', async function() {
        const browser = await puppeteer.launch({
           // product: 'firefox',
            headless: false,
           // slowMo: 200,
            devtools: false,
            defaultViewport: null,
            args:[
                '--start-maximized' // you can also use '--start-fullscreen'
            ]
        })
        const page = await browser.newPage()

          //await page.setDefaultTimeout(50000)
          //await page.setDefaultNavigationTimeout(50000)

        await page.goto("https://webprivadoecdqa2.coopeuch.cl/")
        //await page.waitFor(6000)
        await page.type("#login-input-rut", '179973537', {delay: 20})
        await page.type("#login-input-password", 'Coop2222', {delay: 20})
        await page.click("#login-submit")

        await page.solveRecaptchas()
        await Promise.all([
            page.waitForNavigation(),
           // page.click(`#recaptcha-demo-submit`)
          ])
          await page.waitFor(10000)
        await page.waitForSelector('#menu-1')
        
        await browser.close();
    })
})


/*const page = await browser.newPage()
        await page.goto("https://devexpress.github.io/testcafe/example/")
        await page.type("#developer-name", 'Francisco', {delay: 70})
        await page.waitFor(5000)
        await page.click('#tried-test-cafe', {clickCount: 1})
        await page.select('#preferred-interface', 'JavaScript API')
        const message = 'Lets fill that message with some text'
        await page.type('#comments', message)
        await page.click('#submit-button')
        await page.waitForSelector('.result-content')
        await page.waitFor(5000)
        await browser.close();
        */