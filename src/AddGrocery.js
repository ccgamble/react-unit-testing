import React from 'react';
import classnames from 'classnames';
import Grocery from './Grocery';


const AddGrocery = ({ groceries, onClearGroceries }) => {
	return (
		<article>
			<form></form>
			<button
			 	className="Grocery-clear-btn"
				disabled={!groceries}
				onClick={()=>onClearGroceries()}>
				Clear Groceries
			</button>

			<h2>Grocery List</h2>

			<ul>
				{groceries ?
					(groceries.map(i => <Grocery key={i.id} name={i.name}/>))
					: []}
			</ul>

			{groceries ?
				<p className="Grocery-list-counter">Number of items: {groceries.length}</p>
				: <p></p>}
		</article>
	);
};

export default AddGrocery
