const { Note } = require("../config/sequelize");

// 노트 저장
async function saveNote(note) {
    try {
        return await Note.create({ content: note });
    } catch (err) {
        console.error("[ERROR/DB] saveNote Error", err);
        throw err;
    }
}

// 노트 로드
async function loadNotes() {
    try {
        const notes= await Note.findAll();
        return notes.map((note) => note.content);
    } catch (err) {
        console.error("[ERROR/DB] loadNotes Error", err);
        throw err;
    }
}

module.exports = {
    saveNote,
    loadNotes    
}
