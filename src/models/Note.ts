import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../config/sequelize";

// 노트 모델의 속성 정의
interface NoteAttributes {
    id: number;
    title: string;
    content?: string;   // 선택적 속성
}

// 모델 생성 시 사용할 옵션
interface NoteCreationAttributes extends Optional<NoteAttributes, 'id'> {}

// 노트 모델 정의
class Note extends Model<NoteAttributes, NoteCreationAttributes> implements NoteAttributes {
    public id!: number;
    public title!: string;
    public content?: string; // content는 선택적 속성
}

Note.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: true
    }
}, {
    sequelize,
    tableName: "notes",
    timestamps: true
});

export default Note;