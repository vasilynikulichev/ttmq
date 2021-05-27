import charactersApi from '../api/Characters';
import Management from './Management';
import Chart from './Chart';
import charactersInstance from './Characters';

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
        this.characters = await charactersApi.getAllCharacters();

        let charactersPerSeasons = {};

        for (let i = 0; i < this.characters.length; i++) {
            const {status, appearance} = this.characters[i];

            if (!this.statusList.includes(status)) {
                this.statusList.push(status);
            }

            charactersPerSeasons = appearance.reduce((acc, cur) => {
                acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

                return acc;
            }, charactersPerSeasons);
        }

        this.chartData = Object.values(charactersPerSeasons);
        this.appearanceList = Object.keys(charactersPerSeasons);
    }

    render() {
        new Management(this.rootNode, {appearanceList: this.appearanceList, statusList: this.statusList});
        charactersInstance.render(this.rootNode, this.characters);

        const chartNode = document.getElementById('chart');
        new Chart(chartNode, this.chartData);
    };
}
