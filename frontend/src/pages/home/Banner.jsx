import React from 'react'
import bannerImg from "../../assets/banner.png";

const Banner = () => {
  return (
    <div className='flex flex-col md:flex-row-reverse items-center justify-between py-16 gap-12'>
      <div className='md:w-1/2 w-full flex items-center md:justify-end'>
        <img className="w-full h-auto" src={bannerImg} />
      </div>
      <div className='md:w-1/2 w-full'>
        <h1 className='md:text-5xl text-2xl font-medium mb-7'>Trending This Week</h1>
        <p className='mb-10'>Explore this week's newest arrivals in our movie collection. From blockbuster hits to indie favorites, find the perfect film to add to your collection and enjoy at home. Whether you love action, drama, or comedy, these fresh releases have something for every movie fan.</p>

        <button
          onClick={() => {
            const el = document.getElementById("top-sellers");
            if (el) {
              el.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className='btn-primary'>Explore Now</button>
      </div>
    </div>
  )
}

export default Banner