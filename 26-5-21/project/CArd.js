import React from "react";
import "./Card.css";

function Card(props) {
    return (

        <div>
            <h2 className="title">Title:{props.name}</h2>
            <p className="cardbody">Body: {props.body}</p>
        </div>
    );
}

export default Card;