const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/sequelize");

// 노트 모델 정의
// sequelize 인스턴스를 인자로 받아 사용
const Note = sequelize.define("Note", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    tableName: "notes",
    timestamps: true
});

module.exports = Note;