export default class DOMHelpers {
    getHtmlNode ({tag = 'div', attributes = {}, children = ''}) {
        const node = document.createElement(tag);
        const attrKeysArr = Object.keys(attributes);

        if (attrKeysArr.length) {
            attrKeysArr.forEach((attrKey) => {
                let attrValue = attributes[attrKey];
                attrValue = !Array.isArray(attrValue) ? attrValue : attrValue.join(' ');

                return node.setAttribute(attrKey, attrValue);
            })
        }

        if (typeof children === 'string') {
            const textNode = document.createTextNode(children);
            node.appendChild(textNode)
            return node;
        }

        children.forEach((childNode) => {
            node.append(this.getHtmlNode(childNode));
        });

        return node;
    }
}
