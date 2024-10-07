import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
import Dialogue from "./Dialogue";

// 모델 속성 정의
interface ConversationAttributes {
    id: number;
    title: string;
}

interface ConversationCreationAttributes extends Optional<ConversationAttributes, 'id'> {}

class Conversation extends Model<ConversationAttributes, ConversationCreationAttributes> implements ConversationAttributes {
    public id!: number;
    public title!: string;

    // 관계 설정
    static associate(models: any) {
        Conversation.hasMany(models.Dialogue, {
            foreignKey: "conversationId",
            as: "dialogues",
            onDelete: "CASCADE",
        });
    }
}

// 모델 초기화
Conversation.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    tableName: "conversations",
    timestamps: true,
});


export default Conversation;