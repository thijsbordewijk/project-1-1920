//input value in het vak krijgen na het invullen

const textArea = document.getElementById("textArea");
const inputValue = document.getElementById("textArea").value;
const sections = document.querySelectorAll("#docSection > section");
sections.forEach(section => {
  section.addEventListener("click", function() {
    console.log(this);
    const active = document.querySelector(".active");
    if (active) active.classList.remove("active");
    this.classList.add("active");
    if (!this.classList.contains("list")) {
      const content = this.textContent;
      textArea.value = content;
    }
    if (this.classList.contains("list")) {
      textArea.value = "";
      textArea.placeholder = "Klik op een list item";
      const listChilds = this.childNodes;
      const list = listChilds[3].childNodes;
      listButtonArray.forEach(list => list.classList.add("visible"));
    }
  });
});
let activeList;

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
  } else if (!active.classList.contains("listEssay")) {
    const value = textArea.value;
    activeChilds[0].textContent = value;
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

const createData =  () => {
  const cors = 'https://cors-anywhere.herokuapp.com/';
  const endpoint = 'https://zoeken.oba.nl/api/v1/search/?q=';
  const key = '1e19898c87464e239192c8bfe422f280';
  const secret = '4289fec4e962a33118340c888699438d';
  const detail = 'Default';
  

  const config = {
      Authorization: `Bearer ${secret}`
  };

  return {
      getData: async (query) => {
          let url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json`;
          let data = await fetch(url, config)
              .then(response => {               
                  return response.json();
              })
              .catch(err => {
                  console.log(err);
              });
              return data;
      },
      getPageData:  async (query, pageNumber) => {
          let page = pageNumber
          let url = `${cors}${endpoint}${query}&authorization=${key}&detaillevel=${detail}&output=json&page=${page}`;
          let data = await fetch(url, config)
              .then(response => {
                  return response.json();
              })
              .catch(err => {
                  console.log(err);
              });
          return data;
      },
      
      
  }
}

function getDataImage() {
  const getDataInput = document.querySelector(".searchbarBooks")
  getDataInput.addEventListener("input", async function() {
    getData(getDataInput.value)
  })

}

const data = createData();
let toggle = true;
async function getData(input) {
  let returnData;
  if (toggle) {
    toggle = false;
    const articles = document.querySelectorAll('.results .img-wrapper')
    articles.forEach(article => {
        article.remove()
    })
    returnData = await data.getData(input);
    toggle = true;
    console.log(returnData)
    createRender(returnData);
  }
}

const createRender = data => {
  const el = document.querySelector('.container');
  const results = data.results;

  results.forEach((item, i) => {
      if(item.coverimages.length === 1) {
          item.coverimages.push(item.coverimages[0])
      }
      if(item.coverimages[1].substring(0,9) === '~/assets/') {
          item.coverimages[1] = 'https://v111.nbc.bibliotheek.nl/thumbnail?uri=http://data.bibliotheek.nl/ggc/ppn/853318751&token=c1322402'
      }
    const html = `${item.coverimages !== undefined ? `<div class="img-wrapper"><img src=${item.coverimages[1]}></div>` : null}`;
        //   <h2>${item.titles[0]}</h2>
        //     <p>${item.summaries ? item.summaries[0] : "Geen samenvatting"}</p>
    el.insertAdjacentHTML("afterbegin", html);
  });
};

getDataImage()
