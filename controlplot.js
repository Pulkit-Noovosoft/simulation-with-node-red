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

    // drawLineWithId(svg, {x1 = 0, y1 = 0, x2 = 0, y2 = 0, stroke = 'black', strokeWidth = 1, strokeType = 'solid', id = null}) {
    //     let element = id ? document.getElementById(id + "_") : null;
    //
    //     if (!element) {
    //         element = document.createElementNS(svgNS, 'line');
    //     }
    //
    //     element.setAttributeNS(null, 'x1', x1.toString());
    //     element.setAttributeNS(null, 'y1', y1.toString());
    //     element.setAttributeNS(null, 'x2', x2.toString());
    //     element.setAttributeNS(null, 'y2', y2.toString());
    //     element.setAttributeNS(null, 'stroke', stroke.toString());
    //     element.setAttributeNS(null, 'stroke-width', strokeWidth.toString());
    //     element.setAttributeNS(null, 'shape-rendering', 'crispEdges');
    //
    //     if (strokeType === 'dashed') {
    //         element.setAttributeNS(null, 'stroke-dasharray', '4');
    //     }
    //
    //     svg.appendChild(element);
    // }

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

    drawXTicksLabels(dataPoints) {
        for (let i = 1; i <= this.XTicks; i += 1) {
            // axis ticks
            drawLine(this.svg, {
                x1: 30 + this.XTickSize * i,
                y1: this.height - 20,
                x2: 30 + this.XTickSize * i,
                y2: this.height - 16
            });

            const timeStamp = new Date(parseInt(dataPoints[i - 1][0]));
            let min = timeStamp.getMinutes();
            if (min < 10) min = "0" + min;

            let secs = timeStamp.getSeconds();
            if (secs < 10) secs = "0" + secs;

            const label = min + ":" + secs;
            // axis labels
            drawText(this.svg, {
                x: 15 + this.XTickSize * i,
                y: this.height - 6,
                text: label
            });
        }
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

    drawZones() {
        for (let i = 1; i <= this.XTicks; i += 1) {
            // vertical zone
            drawRectangle(this.svg, {
                x: 30 + (this.XTickSize * i) - (this.XTickSize / 3),
                y: 20,
                width: 2 * (this.XTickSize / 3),
                height: this.height - 40,
                fill: "lightblue"
            });
        }
    }

    joinPoints(dataPoints, l, r, color) {
        if (l < 0) return;

        const point1 = dataPoints[l];
        const point2 = dataPoints[r];

        drawLine(this.svg, {
            x1: 30 + this.XTickSize + (l * this.XTickSize),
            y1: 20 + (this.maxYTick - point1[1]) * this.YTickSize,
            x2: 30 + +this.XTickSize + (r * this.XTickSize),
            y2: 20 + (this.maxYTick - point2[1]) * this.YTickSize,
            stroke: color,
            strokeWidth: 2
        });
    }

    plotPoints(dataPoints, color, frequency) {
        this.setXRange(1, dataPoints.length);
        this.removeElementsByTagName("text")
        this.drawXTicksLabels(dataPoints);
        this.drawYTicksLabels();
        // this.drawZones();

        dataPoints.forEach((point, index) => {
            drawCircle(this.svg, {
                cx: 30 + this.XTickSize + (index * this.XTickSize),
                cy: 20 + (this.maxYTick - point[1]) * this.YTickSize,
                r: 2.5,
                fill: color,
                id: frequency + index
            });
            // this.joinPoints(dataPoints, index - 1, index, color);
        })
    }
}