import React from "react";
import "./Loadingcss.css";
import LoadsCode from "./LoadsCode";

const Loading: React.FC = () => {

    return (
        <>
        {/* Loading Component */}
        <div className="loading-overlay">
            <LoadsCode />
        </div>
        </>
    )
}

export default Loading;