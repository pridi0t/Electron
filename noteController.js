const { Sequelize, DataTypes } = require("sequelize");
const path = require("path");

// SQLite DB 초기화
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "notes.db")
});

// 노트 모델 정의
const Note = sequelize.define("Note", {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "notes"
});

// DB와 테이블 동기화
async function initDB() {
    try {
        await sequelize.authenticate(); // DB 연결 테스트
        console.log("[DB 연결 성공]")
        await sequelize.sync({ alter: true });  // 테이블이 이미 있는 경우 기존 스키마를 변경하지 않음
    } catch (err) {
        console.error("[ERROR/DB] initDB Error", err);
    }
}

// 노트 저장
async function saveNote(note) {
    try {
        await Note.create({ content: note });
        return true;
    } catch (err) {
        console.error("[ERROR/DB] saveNote Error", err);
        return false;
    }
}

// 노트 로드
async function loadNotes() {
    try {
        const notes= await Note.findAll();
        return notes.map((note) => note.content);
    } catch (err) {
        console.error("[ERROR/DB] loadNotes Error", err);
        return [];
    }
}

module.exports = {
    initDB,
    saveNote,
    loadNotes    
}
