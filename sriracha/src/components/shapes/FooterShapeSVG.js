import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
import { Dimensions, View } from "react-native";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

const width = Dimensions.get("window").width;
const height = (Dimensions.get("window").width * 149) / 375;

function FooterShapeSVG(props) {
  return (
    <View
      style={{
        width: width,
        height: height,
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
      }}
    >
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 375 149"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
      >
        <G filter="url(#prefix__filter0_d)">
          <Path
            d="M375 46C253.836 85.524 74.515 62.468 0 46v103h375V46z"
            fill="gray"
          />
          <Path
            d="M375 46C253.836 85.524 74.515 62.468 0 46v103h375V46z"
            stroke="#000"
            strokeWidth="0"
          />
        </G>
        <Defs></Defs>
      </Svg>
    </View>
  );
}

export default FooterShapeSVG;
