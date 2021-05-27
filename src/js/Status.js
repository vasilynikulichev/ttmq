import createNode from '../helpers/createNode';
import Select from './components/Select';

export default class Status {
    statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    titleNode;
    selectNode;

    constructor(rootNode, statusList) {
        this.rootNode = rootNode;
        this.statusList = statusList;

        this.init();
    }

    init() {
        this.createTitleNode();
        this.createSelectNode();
        this.addSelectEvent();
        this.render();
    }

    render() {
        const statusNode = document.createDocumentFragment();

        statusNode.appendChild(this.titleNode);
        statusNode.appendChild(this.selectNode);

        this.rootNode.appendChild(statusNode);
    }

    createTitleNode() {
        this.titleNode = createNode({
            attributes: {
                class: ['status__title']
            },
            children: 'Status:'
        });
    }

    createSelectNode() {
        this.selectNode = createNode({
            attributes: {
                class: ['select'],
                id: ['select'],
            },
            children: [
                {
                    tag: 'button',
                    attributes: {
                        class: ['select__title'],
                    },
                    children: 'Select'
                },
                {
                    tag: 'ul',
                    attributes: {
                        class: ['select__list'],
                    },
                    children: this.statusList.map((status) => ({
                        tag: 'li',
                        attributes: {
                            class: ['select__option'],
                            'data-value': status,
                        },
                        children: status
                    }))
                },
            ],
        });
    }

    addSelectEvent() {
        new Select(this.selectNode, this.statusSelected);

        this.selectNode.addEventListener('select', ({detail}) => {
            localStorage.setItem('statusSelected', JSON.stringify(detail));
        });
    }
};

// let statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
//
// const createStatusNode = (statusList, filterWasChange) => {
//     const statusNode = document.createDocumentFragment();
//     const titleNode = createNode({
//         attributes: {
//             class: ['status__title']
//         },
//         children: 'Status:'
//     });
//     const selectNode = createNode({
//         attributes: {
//             class: ['select'],
//             id: ['select'],
//         },
//         children: [
//             {
//                 tag: 'button',
//                 attributes: {
//                     class: ['select__title'],
//                 },
//                 children: 'Select'
//             },
//             {
//                 tag: 'ul',
//                 attributes: {
//                     class: ['select__list'],
//                 },
//                 children: statusList.map((status) => ({
//                     tag: 'li',
//                     attributes: {
//                         class: ['select__option'],
//                         'data-value': status,
//                     },
//                     children: status
//                 }))
//             },
//         ],
//     });
//
//     new Select(selectNode, statusSelected);
//
//     selectNode.addEventListener('select', ({detail}) => {
//         filterWasChange();
//         localStorage.setItem('statusSelected', JSON.stringify(detail));
//     });
//
//
//     statusNode.appendChild(titleNode);
//     statusNode.appendChild(selectNode);
//
//     return statusNode;
// };

// export default createStatusNode;