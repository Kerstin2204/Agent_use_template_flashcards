const STORAGE_KEY = "wordPairs";
let wordPairs = loadWordPairs();
const wordPairForm = document.querySelector("#word-pair-form");
const englishInput = document.querySelector("#english-word");
const germanInput = document.querySelector("#german-word");
const formMessage = document.querySelector("#form-message");
const wordPairList = document.querySelector("#word-pair-list");
const practiceCard = document.querySelector("#practice-card");
const practiceEnglish = document.querySelector("#practice-english");
const practiceGerman = document.querySelector("#practice-german");
const nextCardButton = document.querySelector("#next-card");
const practiceMessage = document.querySelector("#practice-message");
let practiceIndex = 0;

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

  if (practiceIndex >= wordPairs.length) {
    practiceIndex = 0;
  }

  saveWordPairs();
  renderWordPairs();
  renderPracticeCard();
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
  renderPracticeCard();
}

// Shows the current card in English and hides its German answer.
function renderPracticeCard() {
  practiceGerman.hidden = true;

  if (wordPairs.length === 0) {
    practiceEnglish.textContent = "";
    practiceGerman.textContent = "";
    practiceCard.disabled = true;
    nextCardButton.disabled = true;
    practiceMessage.textContent = "Keine Wortpaare zum Üben vorhanden.";
    return;
  }

  const wordPair = wordPairs[practiceIndex];
  practiceEnglish.textContent = wordPair.english;
  practiceGerman.textContent = wordPair.german;
  practiceCard.disabled = false;
  nextCardButton.disabled = false;
  practiceMessage.textContent = "";
}

// Reveals the German translation on the practice card.
function revealGermanWord() {
  practiceGerman.hidden = false;
}

// Selects a random card that is different from the current card when possible.
function showNextRandomCard() {
  if (wordPairs.length > 1) {
    let nextIndex = Math.floor(Math.random() * (wordPairs.length - 1));

    if (nextIndex >= practiceIndex) {
      nextIndex++;
    }

    practiceIndex = nextIndex;
  }

  renderPracticeCard();
}

wordPairForm.addEventListener("submit", addWordPair);
practiceCard.addEventListener("click", revealGermanWord);
nextCardButton.addEventListener("click", showNextRandomCard);
renderWordPairs();
renderPracticeCard();