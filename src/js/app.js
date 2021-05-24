import charactersApi from '../api/Characters';
import createManagementNode from './management';
import {createCharactersNode} from './characters';

const getData = async () => {
    const {data} = await charactersApi.getAllCharacters();
    const statusList = [];
    let quantityPeoplePerSeason = {};

    data.forEach(({status, appearance}) => {
        if (!statusList.includes(status)) {
            statusList.push(status);
        }

        quantityPeoplePerSeason = appearance.reduce((acc, cur) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            return acc;
        }, quantityPeoplePerSeason);
    });

    return {
        characters: data,
        quantityPeoplePerSeason,
        appearanceList: Object.keys(quantityPeoplePerSeason),
        statusList,
    };
};


const renderApp = async () => {
    const {characters, quantityPeoplePerSeason, appearanceList, statusList} = await getData();
    const appNode = document.getElementById('app');

    appNode.append(createManagementNode({quantityPeoplePerSeason, appearanceList, statusList}));
    appNode.append(createCharactersNode(characters));
};

export default renderApp;
