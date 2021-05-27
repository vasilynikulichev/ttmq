import charactersApi from '../api/Characters';
import Management from './Management';
import Chart from './Chart';
import Characters from './Characters';

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
        new Management(this.rootNode, {appearanceList: this.appearanceList, statusList: this.statusList});
        new Characters(this.rootNode, this.characters);

        const chartNode = document.getElementById('chart');
        new Chart(chartNode, this.chartData);
    };
};
