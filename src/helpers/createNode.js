const createNode = ({tag = 'div', attributes = {}, children = ''}) => {
    const node = document.createElement(tag);
    const attrKeysArr = Object.keys(attributes);

    if (attrKeysArr.length) {
        for (let i = 0; i < attrKeysArr.length; i++) {
            const attrKey = attrKeysArr[i];
            let attrValue = attributes[attrKey];

            attrValue = !Array.isArray(attrValue) ? attrValue : attrValue.join(' ');

            node.setAttribute(attrKey, attrValue);
        }
    }

    if (typeof children === 'string') {
        const textNode = document.createTextNode(children);
        node.appendChild(textNode)
        return node;
    }

    for (let i = 0; i < children.length; i++) {
        node.append(createNode(children[i]));
    }

    return node;
};

export default createNode;