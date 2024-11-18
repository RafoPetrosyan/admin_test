import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

function SvgComponent(props) {
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
         className="lucide lucide-milestone"
         {...props}
      >
         <Path d="M12 13v8M12 3v3M4 6a1 1 0 00-1 1v5a1 1 0 001 1h13a2 2 0 001.152-.365l3.424-2.317a1 1 0 000-1.635l-3.424-2.318A2 2 0 0017 6z" />
      </Svg>
   );
}

export default SvgComponent;
