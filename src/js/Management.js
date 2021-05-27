import createNode from '../helpers/createNode';
import Appearances from './Appearances';
import Status from './Status';
import {updateCharacterListNode} from './characters';

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

        new Appearances(appearanceRootNode, this.appearanceList);
    }

    renderStatus() {
        const statusRootNode = this.managementNode.querySelector('#status');

        new Status(statusRootNode, this.statusList);
    }

    addBtnSearchEvent() {
        const btnSearch = this.managementNode.querySelector('#btn-search');

        btnSearch.addEventListener('click', () => {
            updateCharacterListNode();
        });
    }
};

// let filterWasChanged = false;
//
// const filterWasChange = () => {
//     filterWasChanged =  true;
// };

// const createManagementNode = ({appearanceList, statusList}) => {
    // const managementNode = createNode({
    //     tag: 'section',
    //     attributes: {
    //         class: ['management'],
    //     },
    //     children: [{
    //         attributes: {
    //             class: ['container'],
    //         },
    //         children: [{
    //             tag: 'h1',
    //             attributes: {
    //                 class: ['management__title'],
    //             },
    //             children: 'What is Lorem Ipsum?'
    //         }, {
    //             attributes: {
    //                 class: ['management__chart'],
    //                 id: 'chart'
    //             },
    //         }, {
    //             tag: 'section',
    //             attributes: {
    //                 class: ['management__filter', 'filter'],
    //             },
    //             children: [{
    //                 attributes: {
    //                     class: ['filter__appearance', 'appearance'],
    //                     id: 'appearance'
    //                 },
    //             }, {
    //                 attributes: {
    //                     class: ['filter__status', 'status'],
    //                     id: 'status'
    //                 },
    //             }, {
    //                 tag: 'button',
    //                 attributes: {
    //                     class: ['filter__btn-search'],
    //                     type: 'button',
    //                     id: 'btn-search'
    //                 },
    //                 children: 'Search',
    //             }],
    //         }]
    //     }]
    // });
    // const appearanceRootNode = managementNode.querySelector('#appearance');
    // const statusRootNode = managementNode.querySelector('#status');
    // const btnSearch = managementNode.querySelector('#btn-search');

    // appearanceRootNode.appendChild(createAppearanceListNode(appearanceList, filterWasChange));
    // statusRootNode.appendChild(createStatusNode(statusList, filterWasChange));

    // btnSearch.addEventListener('click', () => {
    //     if (filterWasChanged) {
    //         filterWasChanged = false;
    //         updateCharacterListNode();
    //     }
    // });

    // return managementNode;
// };

// export default createManagementNode;