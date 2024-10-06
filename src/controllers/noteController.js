const Note = require("../db/note");

// 노트 저장
async function saveNote(note) {
    const { title, content } = note;
    try {
        const result = await Note.create({ title, content });
        return result.id;
    } catch (err) {
        console.error("[ERROR/DB] saveNote Error", err);
        throw err;
    }
}

// 노트의 제목 리스트 로드
async function loadNoteTitleList() {
    try {
        const noteList = await Note.findAll();
        return noteList.map((note) => {
            return {
                id: note.dataValues.id,
                title: note.dataValues.title
            }
        });
    } catch (err) {
        console.error("[ERROR/DB] loadNotes Error", err);
        throw err;
    }
}

// 특정 노트 불러오기
async function loadNoteContent(id) {
    try {
        const note = await Note.findByPk(id);
        return {
            title: note.dataValues.title,
            content: note.dataValues.content
        };
    } catch (err) {
        console.error("[ERROR/DB] loadNoteById Error", err);
        throw err;
    }
}

module.exports = {
    saveNote,
    loadNoteTitleList,
    loadNoteContent
}
