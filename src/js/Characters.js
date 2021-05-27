import createNode from '../helpers/createNode';

class Characters {
    appearanceListSelected = JSON.parse(localStorage.getItem('appearanceListSelected')) || [];
    statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    charactersBlockNode;
    characterListNode;
    charactersLength;
    charactersWasRendered = 0;
    characterWasUsedIndex = 0;
    characterRenderStep = 1;
    charactersFitOnDisplay = 5;

    constructor() {
        this.init();
    }

    init() {
        this.createCharactersBlockNode();
        this.getCharacterListNode();
        this.countCharactersFitOnDisplay();
    }

    render(rootNode, data) {
        this.rootNode = rootNode;
        this.characters = data;
        this.charactersLength = data.length;

        this.addCharactersInList();

        this.rootNode.appendChild(this.charactersBlockNode);

        this.addScrollEvent();
    }

    createCharactersBlockNode() {
        this.charactersBlockNode = createNode({
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
    }

    getCharacterListNode() {
        this.characterListNode = this.charactersBlockNode.querySelector('#characters');
    }

    createCharacterNode(character) {
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
    }

    addCharactersInList() {
        for (this.characterWasUsedIndex; this.characterWasUsedIndex < this.charactersLength && this.charactersWasRendered < this.charactersFitOnDisplay * this.characterRenderStep; this.characterWasUsedIndex++) {
            const character = this.characters[this.characterWasUsedIndex];
            const {appearance, status} = character;

            const hasSelectedStatus = Boolean(Object.keys(this.statusSelected).length);
            const hasSelectedAppearance = Boolean(this.appearanceListSelected.length);
            const hasSelectedFilter = !hasSelectedStatus && !hasSelectedAppearance;

            const isMatchStatus = status === this.statusSelected.value;
            const isMatchAppearance = appearance.length && appearance.some((characterAppearanceNumber) => this.appearanceListSelected.includes(characterAppearanceNumber.toString()));

            const isMatchStatusAndAppearance = isMatchStatus && isMatchAppearance;
            const isMatchOnlyStatus = isMatchStatus && !hasSelectedAppearance;
            const isMatchOnlyAppearance = isMatchAppearance && !hasSelectedStatus;
            const isMatchSomeFilter = isMatchStatusAndAppearance || isMatchOnlyStatus || isMatchOnlyAppearance;

            if (hasSelectedFilter || isMatchSomeFilter) {
                this.characterListNode.appendChild(this.createCharacterNode(character));
                this.charactersWasRendered++;
            }
        }

        this.characterRenderStep++;
    }

    countCharactersFitOnDisplay() {
        const clientHeight = document.documentElement.clientHeight;

        this.charactersFitOnDisplay = (clientHeight / 400) * 5;
    }

    addScrollEvent() {
        const characterNode = this.characterListNode.querySelector('.character');
        const characterNodeHeight = characterNode.getBoundingClientRect().height;
        const {height: charactersBlockHeight, top: charactersBlockOffsetTop} = this.characterListNode.getBoundingClientRect();
        const clientHeight = document.documentElement.clientHeight;
        let debounceTimer;

        document.addEventListener('scroll', () => {
            if (this.characterWasUsedIndex === this.charactersLength) {
                return;
            }

            if (debounceTimer) {
                clearTimeout(debounceTimer);
            }

            debounceTimer = setTimeout(() => {
                const scrollTop = document.documentElement.scrollTop;

                if (charactersBlockHeight + charactersBlockOffsetTop - characterNodeHeight * 3 < scrollTop + clientHeight) {
                    this.addCharactersInList();
                }
            }, 50);
        });
    }

    updateCharacters() {
        this.charactersWasRendered = 0;
        this.characterWasUsedIndex = 0;
        this.characterRenderStep = 1;

        this.characterListNode.innerHTML = '';
        this.addCharactersInList();
    }

    updateStatusSelected(value) {
        this.statusSelected = value;
    }

    updateAppearanceListSelected(value) {
        this.appearanceListSelected = value;
    }
}

const charactersInstance = new Characters();

export default charactersInstance;
