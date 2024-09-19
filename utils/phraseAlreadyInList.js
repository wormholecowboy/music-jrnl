  export default function phraseAlreadyInList(phraseObj, list) {
    if (!list || list.length < 1) return false
    return list.some(
      (listPhraseObj) => listPhraseObj.phrase_id === phraseObj.phrase_id,
    );
  }

