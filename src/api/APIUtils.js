import { API_ENDPOINT } from './../utils/constants';
import { normalizeWord } from './../logic/utils';

export async function getRandomWord() {
    return fetch(API_ENDPOINT).then(res => res.json()).then(data => normalizeWord(data[0]));
}