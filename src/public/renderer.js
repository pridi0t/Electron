const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");

// 전체 노트 불러오기
function loadNotes() {
    // 이전 노트 초기화
    notesList.innerHTML = "";
    
    window.api.loadNotes().then((notes) => {
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
    const newNote = {
        title: noteTitle.value.trim(),
        content: noteContent.value
    }
    if (newNote.title) {
        window.api.saveNote(newNote).then(() => {
            alert("노트 저장됨");
            // 성공시 마지막 요소만 끝에 추가
            const newEle = document.createElement("div");
            newEle.innerHTML = `<h4>${newNote.title}</h4><p>${newNote.content}</p>`;
            notesList.append(newEle);
        }).catch((err) => {
            console.error("[ERROR/index.html] - saveNote", err);
            alert("노트 저장 실패");
        });
    } else {
        alert("제목을 입력해주세요");
    }
});

loadNotes();