const { expect } = require('chai')
const puppeteer = require('puppeteer')

const {click, getText, getCount, shouldNotExist} = require('../lib/helpers')


describe('My first Puppeteer Test', () => {
    let browser
    let page

    before(async function() {
        browser = await puppeteer.launch({
            headless: false, 
            slowMo: 10, 
            devtools: false,
            defaultViewport: null,
        })
        page = await browser.newPage()

        await page.setDefaultTimeout(10000)
        await page.setDefaultNavigationTimeout(20000)
    })

    after(async function() {
        await browser.close()
    })

    beforeEach(async function(){
        // runs before each test step
    })

    afterEach(async function(){
        // runs after each test step
    })


    it('should launch the browser', async function() {
        await page.goto("http://example.com")
        await page.waitForXPath('//h1')
        const title = await page.title()
        const url = await page.url()

        const text = await getText(page, 'h1')
        const count = await getCount(page, 'p')

        console.log("el valor es: "+count)
        expect(title).to.equal('Example Domain')
        expect(url).to.include('example.com')
        expect(text).to.equal('Example Domain')
        expect(count).to.equal(2)
        

        await page.goto("http://zero.webappsecurity.com/index.html")
        //await page.waitForSelector('#signin_button')
        //await page.click('#signin_button')
        await click(page, '#signin_button')
        //await page.waitFor(() => !document.querySelector('#signin_button'))
        //await page.waitForSelector('#signin_button', {
        //    hidden: true, 
        //    timeout: 3000})
        await page.waitFor(2000)
        await shouldNotExist(page, '#signin_button')
        })
    })
