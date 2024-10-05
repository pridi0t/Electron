const noteTitle = document.getElementById("noteTitle");
const noteContent = document.getElementById("noteContent");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");
const contentBox = document.getElementById("contentbox");

// 전체 노트 불러오기
function loadTitleList() {
    // 이전 노트 초기화
    notesList.innerHTML = "";

    window.api.loadTitleList().then((notes) => {
        notes.forEach((note) => {
            const {id, title} = note;
            
            // 버튼 생성
            const newBtn = document.createElement("button");
            newBtn.innerHTML = `${title}`;
            newBtn.setAttribute("noteId", id);;
            newBtn.addEventListener("click", () => loadNoteContent(id));

            notesList.append(newBtn);
        });
    }).catch((err) => {
        console.error("[ERROR/renderer.js] - loadTitleList",err);
        alert("노트 목록을 불러오는데 실패했습니다");
    });
}

// 특정 노트 불러오기
function loadNoteContent(id) {
    window.api.loadNoteContent(id).then((note) => {
        const { title, content } = note;
        contentBox.innerHTML = "";
        contentBox.innerHTML = `<h2>${title}</h2><p>${content}</p>`;
    }).catch((err) => {
        console.error("[ERROR/renderer.js] - loadNoteContent", err);
        alert("노트를 불러오는데 실패했습니다.");
    });
}

// 노트 저장
saveButton.addEventListener("click", () => {
    const newNote = {
        title: noteTitle.value.trim(),
        content: noteContent.value
    }
    if (newNote.title) {
        window.api.saveNote(newNote).then((id) => {
            alert("노트 저장됨");
            // 성공시 마지막 요소만 끝에 추가
            const newBtn = document.createElement("button");
            newBtn.innerHTML = `${newNote.title}`;
            newBtn.setAttribute("noteId", id);
            newBtn.addEventListener("click", () => loadNoteContent(id));
            
            notesList.append(newBtn);
        }).catch((err) => {
            console.error("[ERROR/index.html] - saveNote", err);
            alert("노트 저장 실패");
        });
    } else {
        alert("제목을 입력해주세요");
    }
});

loadTitleList();