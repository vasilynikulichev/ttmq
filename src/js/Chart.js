import createNode from '../helpers/createNode';

export default class Chart {
    paddingLeft = 30;
    paddingBottom = 30;
    paddingRight = 10;
    ctx;
    height;
    width;
    maxY;
    minY;
    dataLength;

    constructor(charactersPerSeasons) {
        this.data = Object.values(charactersPerSeasons);
        this.init();
        this.render();
    }

    init() {
        const chartNode = document.getElementById('chart');
        const {height, width} = chartNode.getBoundingClientRect();
        this.height = height;
        this.width = width

        const canvasNode = createNode({
            tag: 'canvas',
            attributes: {
                width: this.width,
                height: this.height,
            }
        });
        chartNode.append(canvasNode);

        this.ctx = canvasNode.getContext('2d');
        this.dataLength = this.data.length;

        const maxData = Math.max(...this.data);
        this.maxY = maxData + (10 - maxData % 10);

        const minData = Math.min(...this.data);
        this.minY = minData - (10 + minData % 5);
    }

    render() {
        this.renderLeftValues();
        this.renderBottomValues();
        this.renderHorizontalLines();
        this.renderGraph();
        this.renderDots();
    }

    getXPixel(value) {
        return ((this.width - (this.paddingLeft + this.paddingRight)) / (this.dataLength - 1)) * value + ((this.paddingLeft - this.paddingRight) * 1.5);
    }

    getYPixel(value) {
        return this.height - (((this.height - this.paddingBottom) / (this.maxY - this.minY)) * (value - this.minY)) - this.paddingBottom;
    }

    renderLeftValues() {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = this.ctx.font.replace(/\d+px/, '14px');
        this.ctx.textAlign = 'right';
        this.ctx.textBaseline = 'middle';

        for(let i = this.minY; i < this.maxY; i += 10) {
            this.ctx.fillText(i, this.paddingLeft - 10, this.getYPixel(i));
        }
    }

    renderBottomValues() {
        this.ctx.fillStyle = '#fff';
        this.ctx.font = this.ctx.font.replace(/\d+px/, '14px');

        for(let i = 0; i < this.dataLength; i ++) {
            this.ctx.fillText(i + 1, this.getXPixel(i), this.height - this.paddingBottom + 20);
        }
    }

    renderHorizontalLines() {
        this.ctx.strokeStyle = '#85a3cc';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();

        for(let i = this.minY; i < this.maxY; i += 10) {
            this.ctx.moveTo(this.getXPixel(0), this.getYPixel(i));
            this.ctx.lineTo(this.width - this.paddingRight, this.getYPixel(i));
        }

        this.ctx.stroke();
    }

    renderGraph() {
        this.ctx.strokeStyle = '#d0dff2';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(this.getXPixel(0), this.getYPixel(this.data[0]));

        for (let i = 1; i < this.dataLength; i ++) {
            const x1 = this.getXPixel(i - 1);
            const y1 = this.getYPixel(this.data[i - 1]);
            const x2 = this.getXPixel(i);
            const y2 = this.getYPixel(this.data[i]);
            const k1 = 30;

            if (this.data[i - 1] > this.data[i]) {
                this.ctx.bezierCurveTo(x1 + k1, y1, x2 - k1, y2, x2, y2);
                continue;
            }

            if (this.data[i - 1] < this.data[i]) {
                this.ctx.bezierCurveTo(x1 + k1, y1, x2 - k1, y2, x2, y2);
                continue;
            }

            this.ctx.lineTo(x2, y2);
        }

        this.ctx.stroke();
    }

    renderDots() {
        for(let i = 0; i < this.dataLength; i ++) {
            this.ctx.fillStyle = '#f7f9fc';
            this.ctx.beginPath();
            this.ctx.arc(this.getXPixel(i), this.getYPixel(this.data[i]), 5, 0, Math.PI * 2, true);
            this.ctx.fill();

            this.ctx.fillStyle = '#468efb';

            this.ctx.beginPath();
            this.ctx.arc(this.getXPixel(i), this.getYPixel(this.data[i]), 2, 0, Math.PI * 2, true);
            this.ctx.fill();
        }
    }
};
