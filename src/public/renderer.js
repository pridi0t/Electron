const noteInput = document.getElementById("noteInput");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");

// 노트 불러오기
function loadNotes() {
    window.api.loadNotes().then((notes) => {
        notesList.innerHTML = notes.map(note => `<li>${note}</li>`).join("");
    }).catch((err) => { 
        console.error("[ERROR/index.html] - loadNotes",err);
        alert("노트를 불러오는데 실패했습니다");
    });
}

// 노트 저장
saveButton.addEventListener("click", () => {
    const note = noteInput.value.trim();
    if (note) {
        window.api.saveNote(note).then(() => {
            alert("노트 저장됨");
            noteInput.value = "";
            loadNotes();
            noteInput.focus();
        }).catch((err) => {
            console.error("[ERROR/index.html] - saveNote", err);
            alert("노트 저장 실패");
        });
    } else {
        alert("내용을 입력해주세요");
    }
});

loadNotes();