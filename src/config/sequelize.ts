import { Sequelize } from "sequelize";
import path from "path";

// SQLite DB 초기화
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../db", "data.db"),
    logging: false,     // 쿼리문 출력 안함
});

// 모델 불러오기
import Conversation from "../models/Conversation";
import Dialogue from "../models/Dialogue";
// import Note from "../models/Note";

// DB와 테이블 동기화
async function initDB(): Promise<void> {
    try {
        await sequelize.authenticate(); // DB 연결 테스트
        console.log("[DB 연결 성공 !]")

        // 관계 설정
        Conversation.associate({ Dialogue });
        Dialogue.associate({ Conversation });

        // await sequelize.sync({ alter: true });     // 테이블이 이미 있는 경우 기존 스키마를 변경하지 않음
        await sequelize.sync({ force: true });  // 테이블 삭제하고 다시 생성
        console.log("[DB TABLE 생성 완료 !]");
    } catch (err) {
        console.error("[ERROR/DB] initDB Error", err);
        throw err;
    }
}

export {
    sequelize,
    initDB,
    Conversation,
    Dialogue,
};