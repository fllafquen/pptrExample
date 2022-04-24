module.exports = {
    click: async function( page, selector){
        try{
            await page.waitForSelector(selector)
            await page.click(selector)
        }catch(error){
            throw new Error(`No se puede hacer click en el selector: ${selector}`)
        }
    },
    getText: async function(page, selector){
        try{
            await page.waitForSelector(selector)
            return await page.$eval( selector, element => element.innerHTML)
        } catch(error){
            throw new Error(`No es posible obtener texto del selector: ${selector}`)
        }
    },
    getCount: async function(page, selector){
        try{
            await page.waitForSelector(selector)
            return await page.$$eval(selector, element => element.length)
        }catch (error){
            throw new Error(`no es posible obtener contador del selector: ${selector}`)
        }
    },
    typeText: async function(page, selector, text){
        try{
            await page.waitForSelector(selector)
            await page.type(selector, text)
        }catch(error){
            throw new Error(`no es posible tipear en el selector: ${selector}`)
        }
    },
    waitForText: async function(page, selector, text){
        try{
            await page.waitForSelector(selector)
            await page.waitForFunction((selector, text) => {
                document.querySelector(selector).innerText.includes(text),
                {},
                selector,
                test
            })
        }catch(error){
            throw new Error(`Text: ${selector} no fue posible encontrar en el selector: ${selector}`)
        }
    },
    shouldNotExist: async function(page, selector){
        try{
            await page.waitForSelector(selector, {hidden: true})
        }catch(error){
            throw new error(`Selector: ${selector} es visible, pero no debería.`)
        }
    }
}
