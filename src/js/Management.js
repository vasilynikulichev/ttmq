import createNode from '../helpers/createNode';
import appearancesInstance from './Appearances';
import statusInstance from './Status';
import charactersInstance from './Characters';

export default class Management {
    managementNode;

    constructor(rootNode, {appearanceList, statusList}) {
        this.rootNode = rootNode;
        this.appearanceList = appearanceList;
        this.statusList = statusList;

        this.init();
    }

    init() {
        this.createManagementNode();
        this.renderAppearance();
        this.renderStatus();
        this.addBtnSearchEvent();
        this.render();
    }

    render() {
        this.rootNode.appendChild(this.managementNode);
    }

    createManagementNode() {
        this.managementNode = createNode({
            tag: 'section',
            attributes: {
                class: ['management'],
            },
            children: [{
                attributes: {
                    class: ['container'],
                },
                children: [{
                    tag: 'h1',
                    attributes: {
                        class: ['management__title'],
                    },
                    children: 'What is Lorem Ipsum?'
                }, {
                    attributes: {
                        class: ['management__chart'],
                        id: 'chart'
                    },
                }, {
                    tag: 'section',
                    attributes: {
                        class: ['management__filter', 'filter'],
                    },
                    children: [{
                        attributes: {
                            class: ['filter__appearance', 'appearance'],
                            id: 'appearance'
                        },
                    }, {
                        attributes: {
                            class: ['filter__status', 'status'],
                            id: 'status'
                        },
                    }, {
                        tag: 'button',
                        attributes: {
                            class: ['filter__btn-search'],
                            type: 'button',
                            id: 'btn-search'
                        },
                        children: 'Search',
                    }],
                }]
            }]
        });
    }

    renderAppearance() {
        const appearanceRootNode = this.managementNode.querySelector('#appearance');

        appearancesInstance.render(appearanceRootNode, this.appearanceList);
    }

    renderStatus() {
        const statusRootNode = this.managementNode.querySelector('#status');

        statusInstance.render(statusRootNode, this.statusList);
    }

    addBtnSearchEvent() {
        const btnSearch = this.managementNode.querySelector('#btn-search');

        btnSearch.addEventListener('click', () => {
            if (!(statusInstance.statusWasUpdated || appearancesInstance.appearanceWasUpdated)) {
                return;
            }

            charactersInstance.updateCharacters();
            statusInstance.statusWasUpdated = false;
            appearancesInstance.appearanceWasUpdated = false;
        });
    }
}
