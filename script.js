const wordPairs = [];
const wordPairForm = document.querySelector("#word-pair-form");
const englishInput = document.querySelector("#english-word");
const germanInput = document.querySelector("#german-word");
const formMessage = document.querySelector("#form-message");

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
}

wordPairForm.addEventListener("submit", addWordPair);