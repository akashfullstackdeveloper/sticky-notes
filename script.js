const containerElement = document.getElementsByClassName("container")[0];
const btnadd = document.getElementsByClassName("btn-add")[0];

function getLocalStorage() {
  return JSON.parse(localStorage.getItem("akash-app") || "[]");
}

getLocalStorage().forEach((element) => {
  const textElement = creatTextElement(element.id, element.content);
  containerElement.insertBefore(textElement, btnadd);
});

function creatTextElement(id, content) {
  const textElement = document.createElement("textarea");
  textElement.classList.add("sticky");
  textElement.value = content;
  textElement.placeholder = "enter your notes";
  textElement.addEventListener("change", () => {
    updateNotes(id, textElement.value);
  });
  textElement.addEventListener("dblclick", () => {
    const check = confirm("Are you sure you want to delete?");
    if (check) {
      deleteNote(id, textElement);
    }
  });
  return textElement;
}

function addSticky() {
  const notes = getLocalStorage();
  const noteObject = {
    id: Math.floor(Math.random() * 9999),
    content: "",
  };
  notes.push(noteObject);
  localStorage.setItem("akash-app", JSON.stringify(notes));
  const textElement = creatTextElement(noteObject.id, noteObject.content);
  containerElement.insertBefore(textElement, btnadd);
}

btnadd.addEventListener("click", addSticky);

function saveNotes(notes) {
  localStorage.setItem("akash-app", JSON.stringify(notes));
}

function updateNotes(id, content) {
  const notes = getLocalStorage();
  const updateElement = notes.filter((note) => note.id == id)[0];
  updateElement.content = content;
  saveNotes(notes);
}

function deleteNote(id, textElement) {
  const notes = getLocalStorage().filter((note) => note.id != id);
  saveNotes(notes);
  containerElement.removeChild(textElement);
}
