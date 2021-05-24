import createNode from '../helpers/createNode';
import Select from './components/Select';

let statusSelected = JSON.parse(localStorage.getItem('statusSelected')) || {};

const createStatusNode = (statusList) => {
    const statusNode = document.createDocumentFragment();
    const titleNode = createNode({
        attributes: {
            class: ['status__title']
        },
        children: 'Status:'
    });
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
                children: statusList.map((status) => ({
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

    new Select(selectNode, statusSelected);

    selectNode.addEventListener('select', ({detail}) => {
        localStorage.setItem('statusSelected', JSON.stringify(detail));
    });


    statusNode.append(titleNode);
    statusNode.append(selectNode);

    return statusNode;
};

export default createStatusNode;