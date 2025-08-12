import React, { useContext } from 'react'
import "./Food.css"
import { StoreContext } from '../../context/StoreContext'
import Item from '../FoodItem/Item'

const Food = ({ category }) => {
  const { food_list } = useContext(StoreContext)
  return (
    <div className='food' id='food'>
      <h2>Top dishes near you</h2>
      <div className="display-food">
        {
          food_list.map((food, index) => {
            if (category === "All" || category === food.category) {
              return (
                <Item
                  key={index}
                  id={food._id}
                  name={food.name}
                  price={food.price}
                  description={food.description}
                  image={food.image}
                />
              )
            }

          })
        }
      </div>
    </div>
  )
}

export default Food