const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");

// 노트 불러오기
function loadNotes() {
    window.api.loadNotes().then((notes) => {
        // notesList.innerHTML = notes.map((title, content) => `<div><h4>${title}</h4><p>${content}</p></div>`).join("");
        notes.forEach(({dataValues}) => {
            const {title, content} = dataValues;
            const newNote = document.createElement("div");
            newNote.innerHTML = `<h4>${title}</h4><p>${content}</p>`;
            notesList.append(newNote)
        });
    }).catch((err) => { 
        console.error("[ERROR/index.html] - loadNotes",err);
        alert("노트를 불러오는데 실패했습니다");
    });
}

// 노트 저장
saveButton.addEventListener("click", () => {
    const note = {
        title: noteTitle.value.trim(),
        content: noteContent.value
    }
    if (note.title) {
        window.api.saveNote(note).then(() => {
            alert("노트 저장됨");
            loadNotes();
        }).catch((err) => {
            console.error("[ERROR/index.html] - saveNote", err);
            alert("노트 저장 실패");
        });
    } else {
        alert("제목을 입력해주세요");
    }
});

loadNotes();