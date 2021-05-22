import {baseUrl} from '../constants';
import Request from '../utils/Request';

class CharactersApi extends Request {
    entryPoint = `${baseUrl}/characters`;

    getAllCharacters() {
        return this.request(this.entryPoint);
    }
}

const charactersApi = new CharactersApi;

export default charactersApi;