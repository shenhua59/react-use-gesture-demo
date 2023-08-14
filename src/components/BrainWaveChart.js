import React, { useState, useEffect, useRef } from 'react';
import { useGestureResponder } from 'react-gesture-responder';
import * as d3 from 'd3';

const SoundWaveChartWithDrag = ({ width, height }) => {
  const svgRef = useRef();
  const dataLength = Math.floor(width / 10);
  const sampleRate = 44100; // Audio sample rate
  const [data, setData] = useState([]);
  const [offset, setOffset] = useState(0);

  const gestures = useGestureResponder({
    onPan: ({ delta }) => {
      const newOffset = offset - delta[0] / 10;
      if (newOffset >= 0 && newOffset <= data.length - dataLength) {
        setOffset(newOffset);
      }
    }
  });

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    const xScale = d3.scaleLinear().domain([0, dataLength - 1]).range([0, width]);
    const yScale = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

    const line = d3.line()
      .x((_, i) => xScale(i))
      .y(d => yScale(d))
      .curve(d3.curveMonotoneX);

    const path = svg.select('.waveform-line');

    path.datum(data)
      .attr('d', line)
      .attr('transform', `translate(${-xScale(1) * offset}, 0)`);

  }, [data, width, height, offset]);

  useEffect(() => {
    const dataArray = new Float32Array(dataLength);
    for (let i = 0; i < dataLength; i++) {
      dataArray[i] = (Math.random() * 2) - 1; // Generate random sound data
    }
    setData(dataArray);
  }, [dataLength]);

  return (
    <svg {...gestures} ref={svgRef} width={width} height={height}>
      <path className="waveform-line" fill="none" stroke="blue" />
    </svg>
  );
};

export default SoundWaveChartWithDrag;
