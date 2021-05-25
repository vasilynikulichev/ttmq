import charactersApi from '../api/Characters';
import createManagementNode from './management';
import {createCharactersNode} from './characters';

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
    const managementNode = createManagementNode({charactersPerSeasons, appearanceList, statusList});

    appNode.append(managementNode);
    appNode.append(createCharactersNode(characters));
};

export default renderApp;
