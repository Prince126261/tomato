import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import Explore from '../../components/ExploreMenu/Explore';
import Food from '../../components/FoodDisplay/Food';
import AppDownload from '../../components/AppDownload/AppDownload';

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <div>
      <Header />
      <Explore category={category} setCategory={setCategory}/>
      <Food category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home