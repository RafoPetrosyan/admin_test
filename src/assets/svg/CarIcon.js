import * as React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';

function CarIcon(props) {
   return (
      <Svg
         xmlns="http://www.w3.org/2000/svg"
         width={24}
         height={24}
         viewBox="0 0 24 24"
         fill="none"
         stroke="currentColor"
         strokeWidth={2}
         strokeLinecap="round"
         strokeLinejoin="round"
         className="lucide lucide-car-front"
         {...props}
      >
         <Path d="M21 8l-2 2-1.5-3.7A2 2 0 0015.646 5H8.4a2 2 0 00-1.903 1.257L5 10 3 8M7 14h.01M17 14h.01" />
         <Rect width={18} height={8} x={3} y={10} rx={2} />
         <Path d="M5 18v2M19 18v2" />
      </Svg>
   );
}

export default CarIcon;
