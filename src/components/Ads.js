import React from 'react';

export default function (props) {
    return (
        <div className="ad">
            <h1>Products Grid</h1>
            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            <p>But first, a word from our sponsors:</p>
            {
                <img class="img-responsive" src={`/ads/?r=${props.ran}`} />
            }
        </div>
    );
}