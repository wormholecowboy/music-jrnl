
export default function updateNameInArray(array, phraseObj, newName) {
  const id = phraseObj.phrase_id;
  console.log(phraseObj)
  console.log("fn id: ", id)
  console.log("array: ", array)
  console.log(newName)

  return array.map(phraseObj => {
    return phraseObj.phrase_id === id ? {...phraseObj, name: newName} : phraseObj;
  })
}
