import { useEffect, useState } from 'react';
import useHttpRequest from '../../hooks/use-httpRequest';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const MEALS_URL =
	'https://food-order-37e3e-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
	const [meals, setMeals] = useState([]);
	const { isLoading, error, sendRequest: fetchMeals } = useHttpRequest();

	useEffect(() => {
		const transformMeal = (mealObj) => {
			const loadedMeals = [];
			for (const mealKey in mealObj) {
				loadedMeals.push({
					id: mealKey,
					name: mealObj[mealKey].name,
					description: mealObj[mealKey].description,
					price: mealObj[mealKey].price,
				});
			}
			setMeals(loadedMeals);
		};

		fetchMeals(
			{
				url: MEALS_URL,
			},
			transformMeal
		);
	}, [fetchMeals]);

	const mealsList = meals.map((meal) => (
		<MealItem
			id={meal.id}
			key={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}
		/>
	));

	let content = mealsList;

	if (error) {
		content = <button onClick={fetchMeals}>Try again</button>;
	}

	if (isLoading) {
		content = 'Loading meals...';
	}

	return (
		<section className={classes.meals}>
			<Card>
				<ul>{content}</ul>
			</Card>
		</section>
	);
};

export default AvailableMeals;
