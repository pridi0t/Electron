const syncConvBtn = document.getElementById("syncConvBtn");
const sidebarList = document.getElementById("sidebarList");
const contentBox = document.getElementById("contentBox");
// const noteTitle = document.getElementById("inputNoteTitle");
// const noteContent = document.getElementById("inputNoteContent");
// const saveBtn = document.getElementById("saveBtn");

function addListButton(id: number, title: string): void {
    // 버튼 생성
    const newBtn = document.createElement("button");
    newBtn.innerHTML = `${title}`;
    newBtn.setAttribute("noteId", id.toString());
    // newBtn.addEventListener("click", () => loadNoteContent(id));

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

    (sidebarList as HTMLElement).append(newBtn);
}

// 전체 대화 목록 불러오기
function loadConversationList() {
    // 이전 노트 초기화
    (sidebarList as HTMLElement).innerHTML = "";
    
    window.api.loadConversationList().then((conversations: any[]) => {
        conversations.forEach((convData: any) => {
            const formattedData = {
                id: convData.dataValues.id,
                title: convData.dataValues.title
            };
            addListButton(formattedData.id, formattedData.title);
        });
    }).catch((err: any) => {
        console.error("[ERROR/renderer.js] - loadConversationList",err);
        alert("대화 목록을 불러오는데 실패했습니다");
    });
}

// 대화 목록 동기화
(syncConvBtn as HTMLElement).addEventListener("click", () => {
    window.api.convertFileToDB().then(() => {
        loadConversationList();
    }).catch((err) => {
        console.error("[ERROR/renderer.js] - convertFileToDB", err);
        alert("대화 목록을 동기화하는데 실패했습니다");
    });
});

loadConversationList();

// // 특정 노트 불러오기
// function loadNoteContent(id: number): void {
//     window.api.loadNoteContent(id).then((note: any) => {
//         const { title, content } = note;
//         (contentBox as HTMLElement).innerHTML = "";
//         (contentBox as HTMLElement).innerHTML = `<h2>${title}</h2><hr/><p>${content}</p>`;
//     }).catch((err) => {
//         console.error("[ERROR/renderer.js] - loadNoteContent", err);
//         alert("노트를 불러오는데 실패했습니다.");
//     });
// }






// 노트 저장
// saveBtn.addEventListener("click", () => {
//     const newNote = {
//         title: noteTitle.value.trim(),
//         content: noteContent.value
//     }
//     if (newNote.title) {
//         window.api.saveNote(newNote).then((id) => {
//             alert("노트 저장됨");
//             addListButton(id, newNote.title);
//         }).catch((err) => {
//             console.error("[ERROR/index.html] - saveNote", err);
//             alert("노트 저장 실패");
//         });
//     } else {
//         alert("제목을 입력해주세요");
//     }
// });