import createNode from '../utils/createNode';
import Select from './components/Select';
import charactersApi from '../api/Characters';

export default class App {
    characters = [];
    statuses = [];
    statusSelected = {};
    appearances = [];
    appearancesSelected = [];
    quantityPeoplePerSeason = {};

    constructor(appearanceId, statusId, charactersId) {
        this.appearanceRootNode = document.getElementById(appearanceId);
        this.statusRootNode = document.getElementById(statusId);
        this.charactersRootNode = document.getElementById(charactersId);

        this.init();
    }

    async init() {
        await this.getData();
        this.getLocalStoreData();
        this.render();
        this.addButtonSearchEvent();
    }

    addButtonSearchEvent() {
        const btnNode = document.getElementById('btn-search');
        btnNode.addEventListener('click', () => this.renderCharacters());
    }

    async getData() {
        const {data} = await charactersApi.getAllCharacters();
        this.characters = data;

        this.characters.forEach(({status, appearance}) => {
            if (!this.statuses.includes(status)) {
                this.statuses.push(status);
            }

            this.countQuantityPeoplePerSeason(appearance);
        });

        this.countAppearances();
    }

    getLocalStoreData() {
        this.appearancesSelected = JSON.parse(localStorage.getItem('appearancesSelected')) || [];
        this.statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};
    }

    render() {
        this.renderAppearance();
        this.renderCharacters();
        this.renderSelect();
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

    createNodeAppearance(number) {
        const attributes = {
            type: 'checkbox',
            name: 'appearance',
            value: number,
        };

        if (this.appearancesSelected.includes(number)) {
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

    renderAppearance() {
        const wrapper = document.createDocumentFragment();

        this.appearances.forEach((appearance) => {
            const appearanceNode = this.createNodeAppearance(appearance);

            appearanceNode.addEventListener('change', ({target}) => {
                const {value, checked} = target;

                if (checked) {
                    this.appearancesSelected.push(value);
                    localStorage.setItem('appearancesSelected', JSON.stringify(this.appearancesSelected));
                } else {
                    const index = this.appearancesSelected.indexOf(value);
                    this.appearancesSelected.splice(index, 1);
                    localStorage.setItem('appearancesSelected', JSON.stringify(this.appearancesSelected));
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
        const wrapper = document.createDocumentFragment();

        this.characters.forEach((character) => {
            if (!Object.keys(this.statusSelected).length && !this.appearancesSelected.length) {
                wrapper.append(this.createNodeCharacter(character));
                return;
            }

            const isMatchStatus = character.status === this.statusSelected.value;
            const isMatchCharacterAppearance = character.appearance.some((characterAppearanceNumber) => this.appearancesSelected.includes(characterAppearanceNumber.toString()));
            const isMatchAppearance = character.appearance.length && isMatchCharacterAppearance;

            if (isMatchStatus || isMatchAppearance) {
                wrapper.append(this.createNodeCharacter(character));
            }
        });

        this.charactersRootNode.innerHTML = '';
        this.charactersRootNode.append(wrapper);
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

        new Select(selectNode, this.statusSelected);

        selectNode.addEventListener('select', ({detail}) => {
            this.statusSelected = detail;
            localStorage.setItem('statusSelected', JSON.stringify(detail));
        });

        this.statusRootNode.append(selectNode);
    }
}