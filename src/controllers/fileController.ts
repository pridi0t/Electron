import puppeteer, { Browser, Page } from "puppeteer";
import path from "path";
import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";

const url = path.join(__dirname, "../db/chat.html");

// 로컬 HTML 파싱
async function convertFileToDB(): Promise<void> {
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
        const pageConversationData = await page.$$eval("#root .conversation", (elements) =>
            elements.map((el: Element) => ({
                title: (el.querySelector("h4") as HTMLElement).textContent!.trim(),
                dialogues: Array.from(el.querySelectorAll(".message div"), (msgEl: Element) => (msgEl as HTMLElement).innerHTML)
            }))
        );

        // 대화 내용 DB 저장
        for (const convData of pageConversationData) {
            const convResult = await Conversation.create({ title: convData.title });

            // 새로운 배열에 발화자와 내용 추가
            const filteredData = [];
            for (let i = 1; i < convData.dialogues.length; i += 2) {
                filteredData.push({
                    speaker: convData.dialogues[i - 1],  // 발화자 (짝수 인덱스에 들어있음)
                    content: convData.dialogues[i],      // 대화 내용
                    conversationId: convResult.id
                });
            }
            
            await Dialogue.bulkCreate(filteredData);
        }
    } catch (err) {
        console.error("[ERROR/FILE] convertFileToNote Error]", err);
        throw err;
    } finally {
        if (browser) await browser.close();
    }
}

export {
    convertFileToDB
}