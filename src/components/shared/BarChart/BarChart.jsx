// react
import PropTypes from 'prop-types';
import { useEffect, useRef, useReducer } from 'react';

// utils
import { findDims } from '@/utils/findElementDims';

// d3
import * as d3 from 'd3';
import { findSum } from '@/utils/basicMathUtils';

const initialState = {
   canvasSize: null,
   graphSize: null,
   xScale: null,
   yScale: null,
   xAxis: null,
   yAxis: null,
   total: null,
};

const ACTIONS = {
   setCanvasSize: 'setCanvasSize',
   setGraphSize: 'setGraphSize',
   setXScale: 'setXScale',
   setYscale: 'setYscale',
   setXAxis: 'setXAxis',
   setYAxis: 'setYAxis',
   setTotal: 'setTotal',
};

const reducer = (state, { type, payload }) => {
   switch (type) {
      case ACTIONS.setCanvasSize:
         return { ...state, canvasSize: payload };
      case ACTIONS.setGraphSize:
         return { ...state, graphSize: payload };
      case ACTIONS.setXScale:
         return { ...state, xScale: payload };
      case ACTIONS.setYscale:
         return { ...state, yScale: payload };
      case ACTIONS.setXAxis:
         return { ...state, xAxis: payload };
      case ACTIONS.setYAxis:
         return { ...state, yAxis: payload };
      case ACTIONS.setTotal:
         return { ...state, total: payload };
      default:
         return state;
   }
};

const BarChart = ({ chartData, modifyClasses = '', ticksValue = 3 }) => {
   const svgRef = useRef(null);
   const graphRef = useRef(null);
   const [{ canvasSize, graphSize, xScale, yScale, total }, dispatch] =
      useReducer(reducer, initialState);

   useEffect(() => {
      const updateSizes = () => {
         const dims = findDims(svgRef);
         dispatch({ type: ACTIONS.setCanvasSize, payload: { ...dims } });
      };

      updateSizes();

      window.addEventListener('resize', updateSizes);
      return () => {
         window.removeEventListener('resize', updateSizes);
      };
   }, []);

   useEffect(() => {
      if (canvasSize) {
         const margins = {
            top: canvasSize.width * 0.035,
            right: canvasSize.width * 0.035,
            bottom: canvasSize.width * 0.07,
            left: canvasSize.width * 0.07,
         };

         const numbersArr = chartData.map(el => el.number);
         dispatch({ type: ACTIONS.setTotal, payload: findSum(numbersArr) });

         const width = canvasSize.width - margins.left - margins.right;
         const height = canvasSize.height - margins.top - margins.bottom;

         dispatch({
            type: ACTIONS.setGraphSize,
            payload: {
               width,
               height,
               margins,
               transform: `translate(${margins.left},${margins.top})`,
            },
         });

         dispatch({
            type: ACTIONS.setYscale,
            payload: d3
               .scaleLinear()
               .domain([0, d3.max(chartData, d => d.number) + 5])
               .range([height, 0]),
         });

         dispatch({
            type: ACTIONS.setXScale,
            payload: d3
               .scaleBand()
               .domain(chartData.map(el => el.name))
               .range([0, width])
               .paddingOuter(0.2)
               .paddingInner(0.3),
         });
      }
   }, [canvasSize, chartData]);

   useEffect(() => {
      if (graphRef?.current) {
         const graph = d3.select(graphRef.current);

         // Clear existing axes
         graph.select('.x-axis').selectAll('*').remove();
         graph.select('.y-axis').selectAll('*').remove();

         // creating Axes
         const xAxisGroup = graph
            .select('.x-axis')
            .attr('transform', `translate(0,${graphSize?.height})`);
         const yAxisGroup = graph.select('.y-axis');

         const xAxis = d3.axisBottom(xScale);
         const yAxis = d3.axisLeft(yScale).ticks(ticksValue);

         xAxisGroup.call(xAxis);
         yAxisGroup.call(yAxis);

         graph
            .selectAll('.axis line, .axis path')
            .attr('class', 'stroke-neutral-500');

         graph
            .selectAll('.axis text')
            .attr('class', 'text-neutral-500')
            .style('font-size', canvasSize.width * 0.03);
      }
   }, [graphSize, canvasSize, xScale, yScale, ticksValue]);

   return (
      // container
      <div className={`w-full p-4 h-full ${modifyClasses}`}>
         {/* canvas */}
         <svg ref={svgRef} className='w-full h-full'>
            {/* no data, show this text */}
            {graphSize && Number.isFinite(total) && total < 1 && (
               <text
                  style={{ fontSize: canvasSize.width * 0.04 }}
                  transform={`translate(${graphSize.width * 0.4},${
                     graphSize.height * 0.65
                  })`}
                  className='fill-textPrimary'
               >
                  No data available
               </text>
            )}

            {/* chart */}
            {graphSize && (
               <g
                  ref={graphRef}
                  width={graphSize.width}
                  height={graphSize.height}
                  transform={graphSize.transform}
               >
                  {chartData?.map(d => {
                     return (
                        <rect
                           className='fill-[#7dd3fc]'
                           key={d.id}
                           height={graphSize.height - yScale(d.number)}
                           width={xScale.bandwidth()}
                           y={yScale(d.number)}
                           x={xScale(d.name)}
                        ></rect>
                     );
                  })}

                  <g className='axis x-axis'></g>
                  <g className='axis y-axis'></g>
               </g>
            )}
         </svg>
      </div>
   );
};

BarChart.propTypes = {
   chartData: PropTypes.array,
   modifyClasses: PropTypes.string,
   ticks: PropTypes.number,
};

export default BarChart;
