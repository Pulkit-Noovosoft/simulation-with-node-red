class ControlPlot {
    constructor(svg) {
        this.svg = svg;
        this.height = svg.getBoundingClientRect().height;
        this.width = svg.getBoundingClientRect().width;
        this.drawCoordinateAxis();
    }

    setXRange(minXTick, maxXTick) {
        this.minXTick = minXTick;
        this.maxXTick = maxXTick;
        this.setXTickSize();
    }

    setXTickSize() {
        this.XTicks = this.maxXTick - this.minXTick + 1;
        this.XTickSize = (this.width - 50) / this.XTicks;
    }

    setYRange(minYTick, maxYTick) {
        this.minYTick = minYTick;
        this.maxYTick = maxYTick;
        this.setYTickSize();
    }

    setYTickSize() {
        this.YTicks = this.maxYTick - this.minYTick;
        this.YTickSize = (this.height - 60) / this.YTicks;
    }

    drawLineWithId(svg, {
        x1 = 0, y1 = 0, x2 = 0, y2 = 0, stroke = 'black', strokeWidth = 1, strokeType = 'solid', id = null
    }) {
        let element = id ? document.getElementById(id + "_line") : null;

        if (!element) {
            element = document.createElementNS(svgNS, 'line');
        }

        if (id) {
            element.setAttributeNS(null, 'id', id + "_line");
        }

        element.setAttributeNS(null, 'x1', x1.toString());
        element.setAttributeNS(null, 'y1', y1.toString());
        element.setAttributeNS(null, 'x2', x2.toString());
        element.setAttributeNS(null, 'y2', y2.toString());
        element.setAttributeNS(null, 'stroke', stroke.toString());
        element.setAttributeNS(null, 'stroke-width', strokeWidth.toString());
        element.setAttributeNS(null, 'shape-rendering', 'crispEdges');

        if (strokeType === 'dashed') {
            element.setAttributeNS(null, 'stroke-dasharray', '4');
        }

        svg.appendChild(element);
    }

    drawCoordinateAxis() {
        // X-axis
        drawLine(this.svg, {x1: 30, y1: this.height - 20, x2: this.width - 3, y2: this.height - 20});
        // Y-axis
        drawLine(this.svg, {x1: 30, y1: 10, x2: 30, y2: this.height - 20});
    }

    removeElementsByTagName(tagName) {
        const elements = this.svg.getElementsByTagName(tagName)
        while (elements[0]) elements[0].parentNode.removeChild(elements[0])
    }

    getHours(timestamp) {
        const hours = timestamp.getHours();
        return hours < 10 ? "0" + hours : hours;
    }

    getMin(timestamp) {
        const min = timestamp.getMinutes();
        return min < 10 ? "0" + min : min;
    }

    getSeconds(timestamp) {
        const secs = timestamp.getSeconds();
        return secs < 10 ? "0" + secs : secs;
    }

    drawXTicksLabels(dataPoints, isAverage) {
        for (let i = 1; i <= this.XTicks; i += 1) {
            // axis ticks
            drawLine(this.svg, {
                x1: 30 + this.XTickSize * i,
                y1: this.height - 20,
                x2: 30 + this.XTickSize * i,
                y2: this.height - 16
            });

            const timeStamp = new Date(parseInt(dataPoints[i - 1][0]));
            let label;

            if (isAverage) {
                label = this.getHours(timeStamp) + ":" + this.getMin(timeStamp);
            } else {
                label = this.getMin(timeStamp) + ":" + this.getSeconds(timeStamp);
            }

            // TODO: check if there is a standard method

            // axis labels
            drawText(this.svg, {
                x: 15 + this.XTickSize * i,
                y: this.height - 6,
                text: label
            });
        }
    }

    drawXUnit(isAverage) {
        const unit = isAverage ? "Hour:Min" : "Min:Sec";
        drawText(this.svg, {
            x: 5,
            y: this.height - 6,
            text: unit
        });
    }

    drawYTicksLabels() {
        for (let i = this.minYTick; i <= this.maxYTick; i += 1) {
            // axis ticks
            drawLine(this.svg, {
                x1: 26,
                y1: 20 + this.YTickSize * (i - this.minYTick),
                x2: 30,
                y2: 20 + this.YTickSize * (i - this.minYTick)
            });

            // axis labels
            drawText(this.svg, {
                x: 10,
                y: 22 + this.YTickSize * (i - this.minYTick),
                text: (this.maxYTick - (i - this.minYTick)).toString()
            });
        }
    }

    joinPoints(dataPoints, l, r, color, id) {
        if (l < 0) return;

        const point1 = dataPoints[l];
        const point2 = dataPoints[r];

        this.drawLineWithId(this.svg, {
            x1: 30 + this.XTickSize + (l * this.XTickSize),
            y1: 20 + (this.maxYTick - point1[1]) * this.YTickSize,
            x2: 30 + +this.XTickSize + (r * this.XTickSize),
            y2: 20 + (this.maxYTick - point2[1]) * this.YTickSize,
            stroke: color,
            strokeWidth: 2,
            id: id
        });
    }

    plotPoints(dataPoints, color, frequency, isAverage) {
        this.setXRange(1, dataPoints.length);
        this.removeElementsByTagName("text")
        this.drawXTicksLabels(dataPoints, isAverage);
        this.drawXUnit(isAverage);
        this.drawYTicksLabels();

        dataPoints.forEach((point, index) => {
            drawCircle(this.svg, {
                cx: 30 + this.XTickSize + (index * this.XTickSize),
                cy: 20 + (this.maxYTick - point[1]) * this.YTickSize,
                r: 2.5,
                fill: color,
                id: frequency + index
            });
            this.joinPoints(dataPoints, index - 1, index, color, index + frequency);
        })
    }
}