const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/p/CDsEaw4h4jp/'); //Link da publicação onde o puppeteer irá égar a url

    const imgList =await page.evaluate(()=>{
        const nodeList = document.querySelectorAll('article .KL4Bh img');

        const imgArray = [...nodeList]

        const imageList = imgArray.map(img => ({
            src: img.src
        }))

        return imageList;
    });

    fs.writeFile('images.json', JSON.stringify(imgList, null, 2), err =>{
        if(err) {throw new Error('some went wrong');}

        console.log('wll done!')
    })
    
    await browser.close();
})();