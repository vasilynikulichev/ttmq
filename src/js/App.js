import createNode from '../utils/createNode';
import Select from './components/Select';

export default class App {
    characters = [];
    statuses = [];
    appearances = [];
    quantityPeoplePerSeason = {};

    constructor(data, appearanceRootNode, statusRootNode, charactersRootNode) {
        this.characters = data;
        this.appearanceRootNode = appearanceRootNode;
        this.statusRootNode = statusRootNode;
        this.charactersRootNode = charactersRootNode;
    }

    getData() {
        this.characters.forEach(({status, appearance}) => {
            if (!this.statuses.includes(status)) {
                this.statuses.push(status);
            }

            this.countQuantityPeoplePerSeason(appearance);
        });

        this.countAppearances();
    }

    countQuantityPeoplePerSeason(appearance = []) {
        this.quantityPeoplePerSeason = appearance.reduce((acc, cur) => {
            acc[cur] = acc[cur] ? acc[cur] + 1 : 1;

            return acc;
        }, this.quantityPeoplePerSeason)
    }

    countAppearances() {
        this.appearances = Object.keys(this.quantityPeoplePerSeason);
    }

    render() {
        this.getData();
        this.renderAppearance();
        this.renderCharacters();
        this.renderSelect();
    }

    createNodeAppearance(number) {
        return createNode({
            tag: 'label',
            attributes: {
                class: ['appearance__item'],
            },
            children: [
                {
                    tag: 'input',
                    attributes: {
                        type: 'checkbox',
                        name: 'appearance',
                        value: number,
                    },
                },
                {
                    tag: 'span',
                    children: `Season ${number}`
                },
            ],
        });
    }

    renderAppearance() {
        const wrapper = document.createDocumentFragment();

        this.appearances.forEach((appearance) => {
            const appearanceNode = this.createNodeAppearance(appearance);

            appearanceNode.addEventListener('change', function(event) {
                const value = event.target.value;

                if (this.checked) {
                    console.log("Checkbox is checked..", value);
                } else {
                    console.log("Checkbox is not checked..", value);
                }
            });

            wrapper.append(appearanceNode);
        });

        this.appearanceRootNode.append(wrapper);
    }

    createNodeCharacter({
        name,
        img,
        nickname,
        portrayed,
        status,
        occupation = [],
        appearance = [],
    }) {
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

    renderCharacters() {
        // const wrapper = document.createDocumentFragment();
        const wrapper = createNode({
            tag: 'div',
            attributes: {
                class: ['characters'],
                id: 'characters',
            },
        });

        this.characters.forEach((character) => {
            wrapper.append(this.createNodeCharacter(character));
        });

        // this.charactersRootNode.innerHTML = '';
        this.charactersRootNode.replaceWith(wrapper);
    }

    renderSelect() {
        const selectNode = createNode({
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
                    children: this.statuses.map((status) => ({
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
        const select = new Select(selectNode);

        this.statusRootNode.append(selectNode);
    }
}