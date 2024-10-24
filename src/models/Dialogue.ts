import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";
import Conversation from "./Conversation";

// 모델 속성 정의
interface DialogueAttributes {
    id: number;
    speaker: string;
    content: string;
    conversationId: number;  // Foreign key
}

interface DialogueCreationAttributes extends Optional<DialogueAttributes, 'id'> {}

class Dialogue extends Model<DialogueAttributes, DialogueCreationAttributes> implements DialogueAttributes {
    public id!: number;
    public speaker!: string;
    public content!: string;
    public conversationId!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    // 관계 정의
    static associate(models: any) {
        Dialogue.belongsTo(models.Conversation, {
            foreignKey: "conversationId",
            as: "conversation",
        });
    }
}

// 모델 초기화
Dialogue.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    speaker: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    conversationId: {
        type: DataTypes.INTEGER,
        references: {
            model: Conversation,
            key: 'id',
        },
    },
}, {
    sequelize,
    tableName: "dialogues",
    timestamps: true,
});


export default Dialogue;