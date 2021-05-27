import {baseUrl} from '../constants';
import Request from './Request';

class CharactersApi extends Request{
    entryPoint = `${baseUrl}/characters`;

    async getAllCharacters() {
        return await this.request('get', this.entryPoint);
    }
}

const charactersApi = new CharactersApi;

export default charactersApi;