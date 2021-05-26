import createNode from '../helpers/createNode';

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
let characters = [];
let charactersLength;
let charactersWasRendered = 0;
let characterWasUsedIndex = 0;
let characterRenderStep = 1;
let showElementsByStep = 10;

const createCharacterNode = (character) => {
    const {
        name,
        img,
        nickname,
        portrayed,
        status,
        occupation = [],
        appearance = [],
    } = character;
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

const elementsShowInStart = () => {
    const clientHeight = document.documentElement.clientHeight;

    showElementsByStep = (clientHeight / 400) * 5;
};

const createCharacterListNode = () => {
    const appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];
    const statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    const characterListNode = document.createDocumentFragment();

    for (characterWasUsedIndex; characterWasUsedIndex < charactersLength && charactersWasRendered < showElementsByStep * characterRenderStep; characterWasUsedIndex++) {
        const character = characters[characterWasUsedIndex];

        if (!Object.keys(statusSelected).length && !appearanceListSelected.length) {
            characterListNode.append(createCharacterNode(character));
            charactersWasRendered++;
            continue;
        }

        const isMatchStatus = character.status === statusSelected.value;
        const isMatchCharacterAppearance = character.appearance.some((characterAppearanceNumber) => appearanceListSelected.includes(characterAppearanceNumber.toString()));
        const isMatchAppearance = character.appearance.length && isMatchCharacterAppearance;

        if ((isMatchStatus && isMatchAppearance)
            || isMatchAppearance && !Object.keys(statusSelected).length
            || isMatchStatus && !appearanceListSelected.length) {
            characterListNode.append(createCharacterNode(character));
            charactersWasRendered++;
        }
    }

    characterRenderStep++;

    return characterListNode;
};

const createInitialCharactersNode = (data) => {
    characters = data;
    charactersLength = characters.length;
    elementsShowInStart();
    characterListNode.append(createCharacterListNode());

    return charactersNode;
};

const updateCharacterListNode = () => {
    charactersWasRendered = 0;
    characterWasUsedIndex = 0;
    characterRenderStep = 1;
    characterListNode.innerHTML = '';
    characterListNode.append(createCharacterListNode());
};

const addScrollEventForRenderCharacters = () => {
    const characterNode = characterListNode.querySelector('.character');
    const characterNodeHeight = characterNode.getBoundingClientRect().height;
    const {height: charactersBlockHeight, top: charactersBlockOffsetTop} = characterListNode.getBoundingClientRect();
    const clientHeight = document.documentElement.clientHeight;
    let debounceTimer;

    document.addEventListener('scroll', () => {
        if (characterWasUsedIndex === charactersLength) {
            return;
        }

        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        debounceTimer = setTimeout(() => {
            const scrollTop = document.documentElement.scrollTop;

            if (charactersBlockHeight + charactersBlockOffsetTop - characterNodeHeight * 3 < scrollTop + clientHeight) {
                characterListNode.append(createCharacterListNode());
            }
        }, 50);
    });
};

export {
    addScrollEventForRenderCharacters,
    createInitialCharactersNode,
    updateCharacterListNode
};