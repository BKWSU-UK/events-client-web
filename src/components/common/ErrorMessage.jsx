import React from "react";


export default function ErrorMessage({cols=12, errorMessage}) {
    return <div className={`col-${cols} pt-4`}>
        <div className="row alert alert-warning">
            <div className="col-12">{errorMessage}</div>
        </div>
    </div>
}