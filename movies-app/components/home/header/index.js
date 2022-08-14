import Carousel from "./carousel";
import NavBar from "./navBar";

export default function Header({headerMov,ids}){
    return(
        <div className="w-screen h-screen bg-background relative">

            <Carousel headerMov={headerMov} ids={ids}/>
            <NavBar/>
        </div>
    )
}