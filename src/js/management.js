import createNode from '../helpers/createNode';
import createAppearanceListNode from './appearances';
import createStatusNode from './status';
import {updateCharacterListNode} from './characters';

const createManagementNode = ({quantityPeoplePerSeason, appearanceList, statusList}) => {
    const managementNode = createNode({
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
                    class: ['management__graph'],
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
    const appearanceRootNode = managementNode.querySelector('#appearance');
    const statusRootNode = managementNode.querySelector('#status');
    const btnSearch = managementNode.querySelector('#btn-search');

    appearanceRootNode.append(createAppearanceListNode(appearanceList));
    statusRootNode.append(createStatusNode(statusList));

    btnSearch.addEventListener('click', () => updateCharacterListNode());

    return managementNode;
};

export default createManagementNode;