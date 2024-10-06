const noteTitle = document.getElementById("inputNoteTitle");
const noteContent = document.getElementById("inputNoteContent");
const saveButton = document.getElementById("saveButton");
const notesList = document.getElementById("notesList");
const contentBox = document.getElementById("noteContent");

function addListButton(id, title) {
    // 버튼 생성
    const newBtn = document.createElement("button");
    newBtn.innerHTML = `${title}`;
    newBtn.setAttribute("noteId", id);;
    newBtn.addEventListener("click", () => loadNoteContent(id));

    // 버튼 스타일 추가
    newBtn.style.marginTop = "3px";
    newBtn.style.padding = "10px";
    newBtn.style.width = "100%";
    newBtn.style.border = "1px solid black";
    newBtn.style.borderRadius = "5px";
    newBtn.style.textAlign = "left";
    newBtn.style.overflow = "hidden";
    newBtn.style.textOverflow = "ellipsis";
    newBtn.style.backgroundColor = "white";

    notesList.append(newBtn);
}

// 전체 노트 제목 리스트 불러오기
function loadNoteTitleList() {
    // 이전 노트 초기화
    notesList.innerHTML = "";

    window.api.loadNoteTitleList().then((notes) => {
        notes.forEach((note) => {
            const {id, title} = note;
            addListButton(id, title);
        });
    }).catch((err) => {
        console.error("[ERROR/renderer.js] - loadNoteTitleList",err);
        alert("노트 목록을 불러오는데 실패했습니다");
    });
}

// 특정 노트 불러오기
function loadNoteContent(id) {
    window.api.loadNoteContent(id).then((note) => {
        const { title, content } = note;
        contentBox.innerHTML = "";
        contentBox.innerHTML = `<h2>${title}</h2><hr/><p>${content}</p>`;
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
            addListButton(id, newNote.title);
        }).catch((err) => {
            console.error("[ERROR/index.html] - saveNote", err);
            alert("노트 저장 실패");
        });
    } else {
        alert("제목을 입력해주세요");
    }
});

// loadNoteTitleList();

/* 파일과 노트 동기화 */
function convertFileToNote() {
    // 이전 노트 초기화
    notesList.innerHTML = "";
    
    window.api.convertFileToNote().then((notes) => {
        notes.forEach((note) => {
            const {title} = note;
            addListButton("_", title);
        });
    }).catch((err) => {
        console.error("[ERROR/renderer.js] - convertFileToNote", err);
        alert("파일을불러오는데 실패했습니다");
    });
}

convertFileToNote();