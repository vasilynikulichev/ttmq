import createNode from '../helpers/createNode';
import Select from './Select';

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
