const { Sequelize } = require("sequelize");
const path = require("path");

// SQLite DB 초기화
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: path.join(__dirname, "../db", "notes.db"),
});

// DB와 테이블 동기화
async function initDB() {
    try {
        await sequelize.authenticate(); // DB 연결 테스트
        console.log("[DB 연결 성공]")
        await sequelize.sync({ alter: true });  // 테이블이 이미 있는 경우 기존 스키마를 변경하지 않음
    } catch (err) {
        console.error("[ERROR/DB] initDB Error", err);
        throw err;
    }
}

module.exports = { sequelize, initDB };