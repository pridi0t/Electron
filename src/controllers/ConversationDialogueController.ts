import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";
import { ConversationTitleButtonInfo } from "../types/tApi";

// 대화 목록 리스트 로드
async function loadConversationTitleList(): Promise<ConversationTitleButtonInfo[]>{
    try {
        const result: ConversationTitleButtonInfo[] = [];
        const conversations = await Conversation.findAll();
        if (!conversations) {
            return [];
        }
        conversations.forEach((convData: Conversation) => {
            result.push({
                id: convData.dataValues.id.toString(),
                title: convData.dataValues.title
            });
        });
        return result;
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
    loadConversationTitleList,
    loadDialogue
}