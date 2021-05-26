import charactersApi from '../api/Characters';
import createManagementNode from './management';
import {addScrollEventForRenderCharacters, createInitialCharactersNode} from './characters';
import Chart from './Chart';

const getData = async () => {
    const {data} = await charactersApi.getAllCharacters();
    const statusList = [];
    let charactersPerSeasons = {};

    data.forEach(({status, appearance}) => {
        if (!statusList.includes(status)) {
            statusList.push(status);
        }

        charactersPerSeasons = appearance.reduce((acc, cur) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            return acc;
        }, charactersPerSeasons);
    });

    return {
        characters: data,
        charactersPerSeasons,
        appearanceList: Object.keys(charactersPerSeasons),
        statusList,
    };
};


const renderApp = async () => {
    const {characters, charactersPerSeasons, appearanceList, statusList} = await getData();
    const appNode = document.getElementById('app');

    appNode.append(createManagementNode({appearanceList, statusList}));
    appNode.append(createInitialCharactersNode(characters));

    addScrollEventForRenderCharacters();

    new Chart(charactersPerSeasons);
};

export default renderApp;
