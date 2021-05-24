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
    const appearanceListNode = document.createDocumentFragment();
    const titleNode = createNode({
        attributes: {
            class: ['appearance__title']
        },
        children: 'Appearance:'
    });

    appearanceListNode.append(titleNode);

    appearanceList.forEach((appearance) => {
        const appearanceNode = createAppearanceNode(appearance);

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
    });

    return appearanceListNode;
};

export default createAppearanceListNode;