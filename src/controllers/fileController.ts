import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";

const url = path.join(__dirname, "../db/chat.html");

// 대화 내용을 나타내는 인터페이스 정의
interface Conversation {
    title: string;
    content: string[];
}

// 로컬 HTML 파싱
async function convertFileToNote(): Promise<Conversation[]> {
    let browser: (Browser | null) = null;
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
            elements.map((el: Element) => ({
                title: (el.querySelector("h4") as HTMLElement).textContent!.trim(),
                content: Array.from(el.querySelectorAll(".message div"), (msgEl: Element) => (msgEl as HTMLElement).innerHTML)
            }))
        );
        return conversations;
    } catch (err) {
        console.error("[ERROR/FILE] convertFileToNote Error]", err);
        throw err;
    } finally {
        if (browser) await browser.close();
    }
}

export {
    convertFileToNote
}