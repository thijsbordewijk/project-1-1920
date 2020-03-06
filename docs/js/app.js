//input value in het vak krijgen na het invullen

const inputValue = document.getElementById("textArea").value;
const sections = document.querySelectorAll("#docSection > section");
sections.forEach(section => {
  section.addEventListener("click", function() {
    console.log(this);
    const active = document.querySelector(".active");
    if (active) active.classList.remove("active");
    this.classList.add("active");
    if (this.classList.contains("list")) {
      const listChilds = this.childNodes;
      const list = listChilds[3].childNodes;
      console.log(list);
      listButtonArray.forEach(list => list.classList.add("visible"));
    }
  });
});
let activeList;

const textArea = document.getElementById("textArea");
const listButton1 = document.getElementById("listItem1");
const listButton2 = document.getElementById("listItem2");
const listButton3 = document.getElementById("listItem3");
const listButtonArray = [listButton1, listButton2, listButton3];

textArea.addEventListener("input", function() {
  const active = document.querySelector(".active");
  const activeChilds = active.childNodes;
  console.log(activeChilds);
  if (!active.classList.contains("list")) {
    listButtonArray.forEach(list => list.classList.remove("visible"));
    const value = textArea.value;
    activeChilds[1].textContent = value;
  } else if (active.classList.contains("list")) {
    const value = textArea.value;
    console.log(activeList, inputValue);
    activeList.textContent = value;
  }
});

listButtonArray.forEach(button => {
  button.addEventListener("click", function() {
    const active = document.querySelector(".active");
    const activeChilds = active.childNodes;
    const list = activeChilds[3].childNodes;
    const index = this.dataset.item;
    activeList = list[parseInt(index)];

    const content = activeList.textContent;
    textArea.value = content;
  });
});
