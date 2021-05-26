import createNode from '../helpers/createNode';

const appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];

const createAppearanceNode = (number) => {
    const attributes = {
        type: 'checkbox',
        name: 'appearances',
        value: number,
    };

    if (appearanceListSelected.includes(number)) {
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
};

const createAppearanceListNode = (appearanceList, filterWasChange) => {
    const appearanceListNodeWrapper = document.createDocumentFragment();
    const titleNode = createNode({
        attributes: {
            class: ['appearance__title']
        },
        children: 'Appearance:'
    });
    const appearanceListNode = createNode({
        attributes: {
            class: ['appearance__list']
        },
    });

    for (let i = 0; i < appearanceList.length; i++) {
        const appearanceNode = createAppearanceNode(appearanceList[i]);

        appearanceNode.addEventListener('change', ({target}) => {
            const {value, checked} = target;
            filterWasChange();

            if (checked) {
                appearanceListSelected.push(value);
                localStorage.setItem('appearanceListSelected', JSON.stringify(appearanceListSelected));
            } else {
                const index = appearanceListSelected.indexOf(value);
                appearanceListSelected.splice(index, 1);
                localStorage.setItem('appearanceListSelected', JSON.stringify(appearanceListSelected));
            }
        });

        appearanceListNode.append(appearanceNode);
    };

    appearanceListNodeWrapper.append(titleNode);
    appearanceListNodeWrapper.append(appearanceListNode);

    return appearanceListNodeWrapper;
};

export default createAppearanceListNode;