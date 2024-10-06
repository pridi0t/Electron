const puppeteer = require("puppeteer");
const url = `${__dirname}/../db/chat.html`;

// 로컬 HTML 파싱
async function convertFileToNote() {
    let browser;
    try {
        // 브라우저와 페이지 생성
        browser = await puppeteer.launch();
        const page = await browser.newPage();

        // 페이지 로드
        await page.goto(url, { waitUntil: "networkidle2" });

        // #root 요소가 나타날 때까지 대기 (최대 10초)
        await page.waitForSelector("#root", { timeout: 10000 });

        // 대화내용 가져오기
        const conversations = await page.$$eval("#root .conversation", (elements) =>
            elements.map(el => ({
                title: el.querySelector("h4").textContent.trim(),
                content: Array.from(el.querySelectorAll(".message div"), (el) => el.innerHTML)
            }))
        );
        JSON.stringify(conversations, null, 2);
        return conversations;
    } catch (err) {
        console.error("[ERROR/FILE] convertFileToNote Error]", err);
        throw err;
    } finally {
        if (browser) await browser.close();
    }
}

module.exports = {
    convertFileToNote
}