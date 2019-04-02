import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
	return (
		<div className="NotFound">
			<section className="NotFound__section">
				<p className="NotFound__section__p1">404</p>
				<p className="NotFound__section__p2">PAGE NOT FOUND</p>
        <p className="NotFound__section__p3">There's nothing here.</p>
				<Link to="/">
					<button className="NotFound__backBtn">Go back</button>
				</Link>
			</section>
		</div>
	);
}
