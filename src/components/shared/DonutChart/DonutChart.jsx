// react
import React, { useEffect, useReducer, useRef } from 'react';
import PropTypes from 'prop-types';

// d3
import * as d3 from 'd3';

// utils
import { findDims } from '@/utils/findElementDims';

const initialState = {
   canvasSize: null,
   graphSize: null,
   pie: null,
   arc: null,
};

const ACTIONS = {
   setCanvasSize: 'setCanvasSize',
   setGraphSize: 'setGraphSize',
   setPie: 'setPie',
   setArc: 'setArc',
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
      default:
         return state;
   }
};

const DonutChart = ({ data, modifyClasses = '' }) => {
   const svgRef = useRef(null);

   const [{ canvasSize, graphSize, pie, arc }, dispatch] = useReducer(
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

         dispatch({
            type: ACTIONS.setGraphSize,
            payload: {
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
   }, [canvasSize]);

   return (
      <div className={`w-full h-full p-4 2md:p-6 ${modifyClasses}`}>
         {/* canvas */}
         <svg ref={svgRef} className='w-full h-full'>
            {/* graph */}

            {graphSize && (
               <g transform={graphSize.transform}>
                  {data?.map((d, i, arr) => {
                     return (
                        <React.Fragment key={d.id}>
                           <path
                              d={arc(pie(arr)[i])}
                              stroke='#fff'
                              strokeWidth={5}
                              fill={d.color}
                           ></path>
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

            {canvasSize && (
               <g
                  transform={`translate(${canvasSize.width * 0.7}, ${
                     canvasSize.height * 0.15
                  })`}
               >
                  {data?.map((d, i) => {
                     return (
                        <circle
                           key={d.id}
                           fill={d.color}
                           r={canvasSize.width * 0.015}
                           cy={i * canvasSize.width * 0.05}
                        ></circle>
                     );
                  })}

                  {data?.map((d, i) => {
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
   data: PropTypes.array,
   modifyClasses: PropTypes.string,
};

export default DonutChart;
