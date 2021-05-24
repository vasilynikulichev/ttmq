import createNode from '../helpers/createNode';

let characters = [];
const charactersNode = createNode({
    attributes: {
        class: ['container']
    },
    children: [{
        attributes: {
            class: ['characters'],
            id: ['characters']
        },
    }],
});
const characterListNode = charactersNode.querySelector('#characters');

const createCharacterNode = ({
    name,
    img,
    nickname,
    portrayed,
    status,
    occupation = [],
    appearance = [],
}) => {
    return createNode({
        tag: 'section',
        attributes: {
            class: ['characters__item', 'character'],
        },
        children: [
            {
                tag: 'h3',
                attributes: {
                    class: ['character__name'],
                },
                children: name,
            },
            {
                tag: 'div',
                attributes: {
                    class: ['character__img'],
                    style: `background-image: url('${img}');`
                },
            },
            {
                tag: 'ul',
                attributes: {
                    class: ['character__info'],
                },
                children: [
                    {
                        tag: 'li',
                        attributes: {
                            class: ['character__info-item'],
                        },
                        children: [
                            {
                                tag: 'span',
                                children: 'Nickname',
                            },
                            {
                                tag: 'span',
                                children: nickname,
                            },
                        ],
                    },
                    {
                        tag: 'li',
                        attributes: {
                            class: ['character__info-item'],
                        },
                        children: [
                            {
                                tag: 'span',
                                children: 'Portrayed',
                            },
                            {
                                tag: 'span',
                                children: portrayed,
                            },
                        ],
                    },
                    {
                        tag: 'li',
                        attributes: {
                            class: ['character__info-item'],
                        },
                        children: [
                            {
                                tag: 'span',
                                children: 'Status',
                            },
                            {
                                tag: 'span',
                                children: status,
                            },
                        ],
                    },
                    {
                        tag: 'li',
                        attributes: {
                            class: ['character__info-item'],
                        },
                        children: [
                            {
                                tag: 'span',
                                children: 'Occupation',
                            },
                            {
                                tag: 'span',
                                children: occupation.join(', '),
                            },
                        ],
                    },
                    {
                        tag: 'li',
                        attributes: {
                            class: ['character__info-item'],
                        },
                        children: [
                            {
                                tag: 'span',
                                children: 'Appearance',
                            },
                            {
                                tag: 'span',
                                children: appearance.join(', '),
                            },
                        ],
                    },
                ],
            },

        ],
    });
};

const createCharacterListNode = () => {
    const appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];
    const statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    const characterListNode = document.createDocumentFragment();

    characters.forEach((character) => {
        if (!Object.keys(statusSelected).length && !appearanceListSelected.length) {
            characterListNode.append(createCharacterNode(character));
            return;
        }

        const isMatchStatus = character.status === statusSelected.value;
        const isMatchCharacterAppearance = character.appearance.some((characterAppearanceNumber) => appearanceListSelected.includes(characterAppearanceNumber.toString()));
        const isMatchAppearance = character.appearance.length && isMatchCharacterAppearance;

        if (isMatchStatus && isMatchAppearance) {
            characterListNode.append(createCharacterNode(character));
        }
    });

    return characterListNode;
};

const createCharactersNode = (data) => {
    characters = data;
    characterListNode.append(createCharacterListNode());

    return charactersNode;
};

const updateCharacterListNode = () => {
    characterListNode.innerHTML = '';
    characterListNode.append(createCharacterListNode());
};

export {
    createCharactersNode,
    updateCharacterListNode
};