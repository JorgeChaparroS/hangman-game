export function getValidCharacter(event) {
    if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
        return event.key.toUpperCase();
    }
}

export function normalizeWord(word) {
    return word.normalize('NFD').replace(/[\u0300-\u036f]/g,"");
}

export function letterGeneratesError(characterPressed, word, allCharactersPressed) {
    if (!characterPressed) {
        return false;
    }
    const wordAsArray = word.split('');
    if (allCharactersPressed?.includes(characterPressed)) {
        return true;
    } else if (!wordAsArray.includes(characterPressed)) {
        return true;
    } 
    return false;
}

export function generateArrayMatchingLetters(word, previousArray, characterPressed) {
    const newArray = [...previousArray];
    const wordAsArray = word.split('');
    const indexesToAdd = [];
    wordAsArray.forEach((letter, index) => {
        if (letter === characterPressed) {
            indexesToAdd.push(index);
        }
    });
    for (let index of indexesToAdd) {
        newArray[index] = characterPressed;
    }
    return newArray;
}