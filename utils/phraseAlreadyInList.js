  export default function phraseAlreadyInList(phraseObj, list) {
    return list.some(
      (listPhraseObj) => listPhraseObj.phrase_id === phraseObj.phrase_id,
    );
  }

