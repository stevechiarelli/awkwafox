import React from "react";

const CsvToUl = (props) => {
    const list = props.package.split(", ");

    return (
        <ul>
            {list.map((item, index) => {
                return <li key={index}>{item}</li>
            })}
        </ul>
    );
}

export default CsvToUl;