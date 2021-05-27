import createNode from '../helpers/createNode';

export default class Appearances {
    appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];
    titleNode;
    appearanceListNode;

    constructor(rootNode, appearanceList) {
        this.rootNode = rootNode;
        this.appearanceList = appearanceList;

        this.init();
    }

    init() {
        this.createTitleNode();
        this.createAppearanceListNode();
        this.addAppearanceToList();
        this.render();
    }

    render() {
        const appearanceNodeWrapper = document.createDocumentFragment();

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
                localStorage.setItem('appearanceListSelected', JSON.stringify(this.appearanceListSelected));
            } else {
                const index = this.appearanceListSelected.indexOf(value);
                this.appearanceListSelected.splice(index, 1);
                localStorage.setItem('appearanceListSelected', JSON.stringify(this.appearanceListSelected));
            }
        });
    }
};

// const appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];

// const createAppearanceNode = (number) => {
//     const attributes = {
//         type: 'checkbox',
//         name: 'appearances',
//         value: number,
//     };
//
//     if (appearanceListSelected.includes(number)) {
//         attributes.checked = true;
//     }
//
//     return createNode({
//         tag: 'label',
//         attributes: {
//             class: ['appearance__item'],
//         },
//         children: [
//             {
//                 tag: 'input',
//                 attributes
//             },
//             {
//                 tag: 'span',
//                 children: `Season ${number}`
//             },
//         ],
//     });
// };

// const createAppearanceListNode = (appearanceList, filterWasChange) => {
//     const appearanceListNodeWrapper = document.createDocumentFragment();
//     const titleNode = createNode({
//         attributes: {
//             class: ['appearance__title']
//         },
//         children: 'Appearance:'
//     });
//     const appearanceListNode = createNode({
//         attributes: {
//             class: ['appearance__list']
//         },
//     });
//
//     for (let i = 0; i < appearanceList.length; i++) {
//         const appearanceNode = createAppearanceNode(appearanceList[i]);
//
//         appearanceNode.addEventListener('change', ({target}) => {
//             const {value, checked} = target;
//             filterWasChange();
//
//             if (checked) {
//                 appearanceListSelected.push(value);
//                 localStorage.setItem('appearanceListSelected', JSON.stringify(appearanceListSelected));
//             } else {
//                 const index = appearanceListSelected.indexOf(value);
//                 appearanceListSelected.splice(index, 1);
//                 localStorage.setItem('appearanceListSelected', JSON.stringify(appearanceListSelected));
//             }
//         });
//
//         appearanceListNode.appendChild(appearanceNode);
//     }
//
//     appearanceListNodeWrapper.appendChild(titleNode);
//     appearanceListNodeWrapper.appendChild(appearanceListNode);
//
//     return appearanceListNodeWrapper;
// };

// export default createAppearanceListNode;