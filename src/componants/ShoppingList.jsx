import { useState } from "react";
import { plantList } from "../datas/plantList";
import PlantItem from "./PlantItem";
import Categories from "./Categories";
import "../styles/ShoppingList.css";

function ShoppingList({ cart, updateCart, activeCategory, setActiveCategory }) {
  const categories = plantList.reduce(
    (acc, plant) =>
      acc.includes(plant.category) ? acc : acc.concat(plant.category),
    []
  );

  function addToCart(name, price) {
    const currentPlantSaved = cart.find((plant) => plant.name === name);
    if (currentPlantSaved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      updateCart([
        ...cartFilteredCurrentPlant,
        { name, price, amount: currentPlantSaved.amount + 1 },
      ]);
    } else {
      updateCart([...cart, { name, price, amount: 1 }]);
    }
  }

  function removeFromCart(name) {
    const currentPlantRemoved = cart.find((plant) => plant.name === name);
    if (currentPlantRemoved) {
      const cartFilteredCurrentPlant = cart.filter(
        (plant) => plant.name !== name
      );
      if (currentPlantRemoved.amount > 1) {
        updateCart([
          ...cartFilteredCurrentPlant,
          {
            name,
            price: currentPlantRemoved.price,
            amount: currentPlantRemoved.amount - 1,
          },
        ]);
      } else {
        updateCart([...cartFilteredCurrentPlant]);
      }
    }
  }

  return (
    <div className="lmj-shopping-list">
      <Categories
        categories={categories}
        setActiveCategory={setActiveCategory}
        activeCategory={activeCategory}
      />

      <ul className="lmj-plant-list">
        {plantList.map(({ id, cover, name, water, light, price, category }) =>
          !activeCategory || activeCategory === category ? (
            <div key={id}>
              <PlantItem
                cover={cover}
                name={name}
                water={water}
                light={light}
              />
              <button onClick={() => addToCart(name, price)}>Ajouter</button>
              {cart.find((plant) => plant.name === name) ? (
                <button onClick={() => removeFromCart(name)}>Retirer</button>
              ) : null}
            </div>
          ) : null
        )}
      </ul>
    </div>
  );
}

export default ShoppingList;
