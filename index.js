let linkData = [];
const ulEl = document.getElementById("ul-el");
const inputEl = document.getElementById("input-el");
const saveInputBtn = document.getElementById("input-btn");
const msg = document.getElementById("msg");
saveInputBtn.addEventListener("click", saveInput);
function saveInput() {
  if (inputEl.value === "") {
    msg.textContent = "value not valid !";
  } else {
    msg.textContent = "";
    linkData.push(inputEl.value);
    localStorage.setItem("data", JSON.stringify(linkData));
    inputEl.value = "";
    carteLinks();
  }
}

const deleteBtn = document.getElementById("delete-btn");
deleteBtn.addEventListener("click", deleteAll);
function deleteAll() {
  linkData = [];
  ulEl.innerHTML = "";
  localStorage.setItem("data", JSON.stringify(linkData));
}

let carteLinks = () => {
  let linkLi = "";
  linkData.map((x, y) => {
    linkLi += `<li id=${y}>
        <a href="${x}" target="_blank">
        ${x}
        </a
        >
      </li>
`;
  });
  ulEl.innerHTML = linkLi;
};

const tabBtn = document.getElementById("tab-btn");
tabBtn.addEventListener("click", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    linkData.push(tabs[0].url);
    localStorage.setItem("data", JSON.stringify(linkData));
    carteLinks();
  });
});

(() => {
  linkData = JSON.parse(localStorage.getItem("data")) || [];
  carteLinks();
})();
