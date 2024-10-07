import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";

// 대화 목록 리스트 로드
async function loadConversationList(): Promise<Conversation[]>{
    try {
        const conversations = await Conversation.findAll();
        return conversations;   // 대화 목록 없을 경우 빈 배열이 반환됨
    } catch (err) {
        console.error("[ERROR/DB] loadConversationList Error", err);
        throw err;
    }
}

// 대화 상세보기
async function loadDialogue(id: number): Promise<Dialogue[]> {
    try {
        const dialogue = await Dialogue.findAll({
            where: { conversationId: id }
        });
        if (dialogue === undefined) {
            throw new Error("대화를 찾을 수 없습니다."); // 노트가 없는 경우 처리
        }
        return dialogue;
    } catch (err) {
        console.error("[ERROR/DB] loadDialogue Error", err);
        throw err;
    }
}

export {
    loadConversationList,
    loadDialogue
}