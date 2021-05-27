import createNode from '../helpers/createNode';
import Select from './Select';
import charactersInstance from './Characters';

class Status {
    statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    titleNode;
    selectNode;
    statusWasUpdated = false;

    render(rootNode, statusList) {
        this.rootNode = rootNode;
        this.statusList = statusList;

        this.createTitleNode();
        this.createSelectNode();
        this.addSelectEvent();

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
            charactersInstance.updateStatusSelected(detail);
            this.statusWasUpdated = true;
        });
    }
}

const statusInstance = new Status();

export default statusInstance;
