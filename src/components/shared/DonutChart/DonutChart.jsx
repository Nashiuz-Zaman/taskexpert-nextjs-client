// react
import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

// d3
import * as d3 from 'd3';

// utils
import { findDims } from '@/utils/findElementDims';
import { findSum } from '@/utils/basicMathUtils';

const initialState = {
   canvasSize: null,
   graphSize: null,
   pie: null,
   arc: null,
   total: null,
};

const ACTIONS = {
   setCanvasSize: 'setCanvasSize',
   setGraphSize: 'setGraphSize',
   setPie: 'setPie',
   setArc: 'setArc',
   setTotal: 'setTotal',
};

const reducer = (state, { type, payload }) => {
   switch (type) {
      case ACTIONS.setCanvasSize:
         return { ...state, canvasSize: payload };
      case ACTIONS.setGraphSize:
         return { ...state, graphSize: payload };
      case ACTIONS.setPie:
         return { ...state, pie: payload };
      case ACTIONS.setArc:
         return { ...state, arc: payload };
      case ACTIONS.setTotal:
         return { ...state, total: payload };
      default:
         return state;
   }
};

const DonutChart = ({ chartData, modifyClasses = '' }) => {
   const svgRef = useRef(null);

   const [{ canvasSize, graphSize, pie, arc, total }, dispatch] = useReducer(
      reducer,
      initialState
   );

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
         const width = canvasSize.width - canvasSize.width * 0.3;
         const center = { x: width / 2, y: canvasSize.height / 2 };

         const numbersArr = chartData.map(el => el.number);
         dispatch({ type: ACTIONS.setTotal, payload: findSum(numbersArr) });

         dispatch({
            type: ACTIONS.setGraphSize,
            payload: {
               center,
               transform: `translate(${center.x},${center.y})`,
            },
         });

         const radius = width / 3.5;

         dispatch({
            type: ACTIONS.setPie,
            payload: d3
               .pie()
               .sort(null)
               .value(d => d.number),
         });

         dispatch({
            type: ACTIONS.setArc,
            payload: d3
               .arc()
               .outerRadius(radius)
               .innerRadius(radius / 2.5),
         });
      }
   }, [canvasSize, chartData]);

   return (
      <div className={`w-full h-full p-4 2md:p-6 relative ${modifyClasses}`}>
         {/* canvas */}
         <svg ref={svgRef} className='w-full h-full'>
            {/* no data, show this text */}
            {graphSize && Number.isFinite(total) && total < 1 && (
               <text
                  style={{ fontSize: canvasSize.width * 0.04 }}
                  transform={`translate(${canvasSize.width * 0.15},${
                     graphSize.center.y
                  })`}
                  className='fill-textPrimary'
               >
                  No data available
               </text>
            )}

            {/* donut chart */}
            {graphSize && (
               <g transform={graphSize.transform}>
                  {/* show data */}
                  {chartData?.map((d, i, arr) => {
                     return (
                        <React.Fragment key={d.id}>
                           {/* pie slices */}
                           <path
                              d={arc(pie(arr)[i])}
                              stroke='#fff'
                              strokeWidth={6}
                              fill={d.color}
                           ></path>

                           {/* percentage text */}
                           <text
                              className=' fill-white'
                              style={{
                                 textAnchor: 'middle',
                                 fontSize: canvasSize.width * 0.024,
                              }}
                              transform={`translate(${arc.centroid(
                                 pie(arr)[i]
                              )})`}
                           >
                              {d.percentage}%
                           </text>
                        </React.Fragment>
                     );
                  })}
               </g>
            )}

            {/* legends  */}
            {canvasSize && (
               <g
                  transform={`translate(${canvasSize.width * 0.7}, ${
                     canvasSize.height * 0.15
                  })`}
               >
                  {/* circles */}
                  {chartData?.map((d, i) => {
                     return (
                        <circle
                           key={d.id}
                           fill={d.color}
                           r={canvasSize.width * 0.015}
                           cy={i * canvasSize.width * 0.05}
                        ></circle>
                     );
                  })}

                  {/* text */}
                  {chartData?.map((d, i) => {
                     return (
                        <text
                           key={d.id}
                           className='fill-textPrimary'
                           fontSize={canvasSize.width * 0.015 * 2}
                           y={
                              i * canvasSize.width * 0.05 +
                              canvasSize.width * 0.0114
                           }
                           x={canvasSize.width * 0.03}
                        >
                           {d.name}
                        </text>
                     );
                  })}
               </g>
            )}
         </svg>
      </div>
   );
};

DonutChart.propTypes = {
   chartData: PropTypes.array,
   modifyClasses: PropTypes.string,
};

export default DonutChart;
