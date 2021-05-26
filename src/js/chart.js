import createNode from '../helpers/createNode';

const xPadding = 30;
const yPadding = 30;

const multipleRound5 = (value) => {
    const remainder = value % 5;

    if (remainder < 3) {
        return value - remainder;
    }

    return value + 5 - remainder;
};

const getXPixel = (value, width, dataLength) => {
    return ((width - xPadding) / dataLength) * value + (xPadding * 1.5);
};

const getYPixel = (value, height, maxY) => {
    return height - (((height - yPadding) / maxY) * value) - yPadding;
};

const initializationChart = (charactersPerSeasons) => {
    const chartNode = document.getElementById('chart');
    const {height: h, width: w} = chartNode.getBoundingClientRect();
    const canvasNode = createNode({
        tag: 'canvas',
        attributes: {
            class: ['chart__canvas'],
            width: w,
            height: h,
        }
    });
    chartNode.append(canvasNode);
    const charactersPerSeasonsArr = Object.values(charactersPerSeasons);
    const charactersPerSeasonsArrLength = charactersPerSeasonsArr.length;
    const ctx = canvasNode.getContext('2d');
    const canvasWidth = w;
    const canvasHeight = h;
    let maxY = Math.max(...charactersPerSeasonsArr);
    maxY = maxY + (10 - maxY % 10);
    let minY = multipleRound5(Math.min(...charactersPerSeasonsArr) - 10);

    // сезоны
    for(let i = 0; i < charactersPerSeasonsArrLength; i ++) {
        ctx.fillText(i + 1, getXPixel(i, canvasWidth, charactersPerSeasonsArrLength), canvasHeight - yPadding + 20);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    // кол-во персонажей
    for(let i = minY; i < maxY; i += 10) {
        ctx.fillText(i, xPadding - 10, getYPixel(i, canvasHeight, maxY));
    }

    // линии горизонт
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    for(let i = minY; i < maxY; i += 10) {
        ctx.moveTo(xPadding - 10, getYPixel(i, canvasHeight, maxY));
        ctx.lineTo(canvasWidth, getYPixel(i, canvasHeight, maxY));
    }
    ctx.stroke();

    // график
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    ctx.moveTo(getXPixel(0), getYPixel(charactersPerSeasonsArr[0]));

    for(let i = 0; i < charactersPerSeasonsArrLength; i ++) {
        ctx.lineTo(getXPixel(i, canvasWidth, charactersPerSeasonsArrLength), getYPixel(charactersPerSeasonsArr[i], canvasHeight, maxY));
    }
    ctx.stroke();

    // точки
    ctx.fillStyle = '#333';

    for(let i = 0; i < charactersPerSeasonsArrLength; i ++) {
        ctx.beginPath();
        ctx.arc(getXPixel(i, canvasWidth, charactersPerSeasonsArrLength), getYPixel(charactersPerSeasonsArr[i], canvasHeight, maxY), 4, 0, Math.PI * 2, true);
        ctx.fill();
    }
};

export default initializationChart;