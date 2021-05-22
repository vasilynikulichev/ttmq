import './styles/main.scss';
import charactersApi from './api/Characters';


const request = async () => {
    const result = await charactersApi.getAllCharacters();

    console.log(result);
};

request();