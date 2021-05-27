import charactersApi from '../api/Characters';
import createManagementNode from './management';
import {addScrollEventForRenderCharacters, createInitialCharactersNode} from './characters';
import Chart from './Chart';

export default class App {
    characters = [];
    chartData = [];
    appearanceList = [];
    statusList = [];

    constructor(rootNode) {
        this.rootNode = rootNode;

        this.init();
    }

    async init() {
        await this.getData();
        this.render();
    }

    async getData() {
        const {data} = await charactersApi.getAllCharacters();
        this.characters = data;

        let charactersPerSeasons = {};

        this.characters.forEach(({status, appearance}) => {
            if (!this.statusList.includes(status)) {
                this.statusList.push(status);
            }

            charactersPerSeasons = appearance.reduce((acc, cur) => {
                acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

                return acc;
            }, charactersPerSeasons);
        });

        this.chartData = Object.values(charactersPerSeasons);
        this.appearanceList = Object.keys(charactersPerSeasons);
    }

    render() {
        this.rootNode.appendChild(createManagementNode({appearanceList: this.appearanceList, statusList: this.statusList}));
        this.rootNode.appendChild(createInitialCharactersNode(this.characters));

        addScrollEventForRenderCharacters();

        new Chart(this.chartData);
    };
};
