import {baseUrl} from '../constants';
import request from '../utils/request';

class CharactersApi {
    entryPoint = `${baseUrl}/characters`;

    getAllCharacters() {
        return request(this.entryPoint);
    }
}

const charactersApi = new CharactersApi;

export default charactersApi;