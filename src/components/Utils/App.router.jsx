import { Routes, Route } from "react-router-dom";
import { GamePage } from "../Pages/GamePage";
import { HomePage } from "../Pages/HomePage";

export const AppRouter = ()=>{
    return(
        <Routes>
                <Route path="/" element={<HomePage/>}></Route>
                <Route path="/game" element={<GamePage />}></Route>
        </Routes>
    )
}