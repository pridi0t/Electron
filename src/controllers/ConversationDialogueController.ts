import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";
import { ConversationTitleButtonInfo, DialogueInfo } from "../types/tApi";

// 대화 목록 리스트 로드
async function loadConversationTitleList(): Promise<ConversationTitleButtonInfo[]>{
    try {
        const conversations = await Conversation.findAll();
        const result = conversations.map((convData: Conversation) => ({
            id: convData.id.toString(),
            title: convData.title
        }));

        return result;
    } catch (err) {
        console.error("[ERROR/DB] loadConversationList Error", err);
        throw err;
    }
}

// 대화 상세보기
async function loadDialogue(id: number): Promise<DialogueInfo[]> {
    try {
        const dialogues = await Dialogue.findAll({
            where: { conversationId: id },
        });
        const result = dialogues.map((dialogue: Dialogue) => ({
                id: dialogue.id.toString(),
                speaker: dialogue.speaker,
                content: dialogue.content,
        }));
        return result;
    } catch (err) {
        console.error("[ERROR/DB] loadDialogue Error", err);
        throw err;
    }
}

export {
    loadConversationTitleList,
    loadDialogue
}