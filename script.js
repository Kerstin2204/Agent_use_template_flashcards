const wordPairs = [];
const wordPairForm = document.querySelector("#word-pair-form");
const englishInput = document.querySelector("#english-word");
const germanInput = document.querySelector("#german-word");
const formMessage = document.querySelector("#form-message");
const wordPairList = document.querySelector("#word-pair-list");

// Shows every word pair from the current page session in the list.
function renderWordPairs() {
  wordPairList.innerHTML = "";

  for (const wordPair of wordPairs) {
    const listItem = document.createElement("li");
    listItem.textContent = wordPair.english + " - " + wordPair.german;
    wordPairList.appendChild(listItem);
  }
}

// Adds a non-empty English and German word pair to the current page session.
function addWordPair(event) {
  event.preventDefault();

  const englishWord = englishInput.value.trim();
  const germanWord = germanInput.value.trim();

  if (englishWord === "" || germanWord === "") {
    formMessage.textContent = "Bitte beide Wörter eingeben.";
    return;
  }

  wordPairs.push({ english: englishWord, german: germanWord });
  wordPairForm.reset();
  formMessage.textContent = "Wortpaar hinzugefügt.";
  renderWordPairs();
}

wordPairForm.addEventListener("submit", addWordPair);