const Note = require("../db/note");

// 노트 저장
async function saveNote(note) {
    const { title, content } = note;
    try {
        await Note.create({ title, content });
        return true;
    } catch (err) {
        console.error("[ERROR/DB] saveNote Error", err);
        throw err;
    }
}

// 노트 로드
async function loadNotes() {
    try {
        return await Note.findAll();
    } catch (err) {
        console.error("[ERROR/DB] loadNotes Error", err);
        throw err;
    }
}

module.exports = {
    saveNote,
    loadNotes    
}
