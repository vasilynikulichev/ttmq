import './styles/main.scss';
import App from './js/App';
import charactersApi from './api/Characters';

(async () => {
    const appearanceNode = document.getElementById('appearance');
    const statusNode = document.getElementById('status');
    const charactersNode = document.getElementById('characters');
    const {data, status} = await charactersApi.getAllCharacters();
    const app = new App(data, appearanceNode, statusNode, charactersNode);

    app.render();
})();