import createNode from '../helpers/createNode';
import charactersInstance from './Characters';

class Appearances {
    appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];
    titleNode;
    appearanceListNode;
    appearanceWasUpdated = false;

    constructor() {
        this.init();
    }

    init() {
        this.createTitleNode();
        this.createAppearanceListNode();
    }

    render(rootNode, appearanceList) {
        this.rootNode = rootNode;
        this.appearanceList = appearanceList;
        const appearanceNodeWrapper = document.createDocumentFragment();

        this.addAppearanceToList();

        appearanceNodeWrapper.appendChild(this.titleNode);
        appearanceNodeWrapper.appendChild(this.appearanceListNode);

        this.rootNode.appendChild(appearanceNodeWrapper);
    }

    createTitleNode() {
        this.titleNode = createNode({
            attributes: {
                class: ['appearance__title']
            },
            children: 'Appearance:'
        });
    }

    createAppearanceListNode () {
        this.appearanceListNode = createNode({
            attributes: {
                class: ['appearance__list']
            },
        });
    }

    addAppearanceToList() {
        for (let i = 0; i < this.appearanceList.length; i++) {
            const appearanceNode = this.createAppearanceNode(this.appearanceList[i]);

            this.addAppearanceEvent(appearanceNode);

            this.appearanceListNode.appendChild(appearanceNode);
        }
    }

    createAppearanceNode(number) {
        const attributes = {
            type: 'checkbox',
            name: 'appearances',
            value: number,
        };

        if (this.appearanceListSelected.includes(number)) {
            attributes.checked = true;
        }

        return createNode({
            tag: 'label',
            attributes: {
                class: ['appearance__item'],
            },
            children: [
                {
                    tag: 'input',
                    attributes
                },
                {
                    tag: 'span',
                    children: `Season ${number}`
                },
            ],
        });
    }

    addAppearanceEvent(appearanceNode) {
        appearanceNode.addEventListener('change', ({target}) => {
            const {value, checked} = target;

            if (checked) {
                this.appearanceListSelected.push(value);
            } else {
                const index = this.appearanceListSelected.indexOf(value);
                this.appearanceListSelected.splice(index, 1);
            }

            localStorage.setItem('appearanceListSelected', JSON.stringify(this.appearanceListSelected));
            charactersInstance.updateAppearanceListSelected(this.appearanceListSelected)
            this.appearanceWasUpdated = true;
        });
    }
}

const appearancesInstance = new Appearances();

export default appearancesInstance;