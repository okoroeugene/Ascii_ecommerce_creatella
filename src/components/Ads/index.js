import React from 'react';

export default function ({query}) {
    return (
        <div className="ad">
            <h4>Products Grid</h4>
            <p>Here you're sure to find a bargain on some of the finest ascii available to purchase. Be sure to peruse our selection of ascii faces in an exciting range of sizes and prices.</p>
            <p>But first, a word from our sponsors:</p>
            {
                <img class="img-thumbnail img-responsive" src={`${API_URL}/ads/?r=${query}`} />
            }
        </div>
    );
}