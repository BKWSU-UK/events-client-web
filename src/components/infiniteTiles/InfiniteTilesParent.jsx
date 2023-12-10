import {InfiniteTileContextProvider} from "../../context/InfiniteTileContext";
import InfiniteTiles from "./InfiniteTiles";

export default function InfiniteTilesParent(props) {
  return <InfiniteTileContextProvider>
    <InfiniteTiles props={props}/>
  </InfiniteTileContextProvider>
}