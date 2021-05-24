import {baseUrl} from '../constants';
import Request from './Request';

class CharactersApi extends Request{
    entryPoint = `${baseUrl}/characters`;

    getAllCharacters() {
        return this.request(this.entryPoint);
    }
}

const charactersApi = new CharactersApi;

export default charactersApi;