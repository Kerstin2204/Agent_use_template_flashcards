const STORAGE_KEY = "wordPairs";
let wordPairs = loadWordPairs();
const wordPairForm = document.querySelector("#word-pair-form");
const englishInput = document.querySelector("#english-word");
const germanInput = document.querySelector("#german-word");
const formMessage = document.querySelector("#form-message");
const wordPairList = document.querySelector("#word-pair-list");

// Loads saved word pairs from localStorage or returns an empty list.
function loadWordPairs() {
  const savedWordPairs = localStorage.getItem(STORAGE_KEY);

  if (savedWordPairs === null) {
    return [];
  }

  try {
    const parsedWordPairs = JSON.parse(savedWordPairs);

    if (Array.isArray(parsedWordPairs)) {
      return parsedWordPairs;
    }
  } catch (error) {
    return [];
  }

  return [];
}

// Saves the current word pairs in localStorage.
function saveWordPairs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(wordPairs));
}

// Shows every word pair from the current page session in the list.
function renderWordPairs() {
  wordPairList.innerHTML = "";

  for (let index = 0; index < wordPairs.length; index++) {
    const wordPair = wordPairs[index];
    const listItem = document.createElement("li");
    listItem.textContent = wordPair.english + " - " + wordPair.german;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Löschen";
    deleteButton.addEventListener("click", function () {
      deleteWordPair(index);
    });

    listItem.appendChild(deleteButton);
    wordPairList.appendChild(listItem);
  }
}

// Removes a word pair at the selected list position.
function deleteWordPair(index) {
  wordPairs.splice(index, 1);
  saveWordPairs();
  renderWordPairs();
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
  saveWordPairs();
  wordPairForm.reset();
  formMessage.textContent = "Wortpaar hinzugefügt.";
  renderWordPairs();
}

wordPairForm.addEventListener("submit", addWordPair);
renderWordPairs();