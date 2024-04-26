import { Link } from 'react-router-dom'

import { heroData } from '../utils/data'

const HomeContainer = () => {
  return (
    <article className="grid md:grid-cols-2 grid-cols-1 gap-2 w-full mb-20">
      <div className="flex flex-col items-start justify-between gap-6">
        <div className="flex flex-row items-center justify-between gap-2 bg-orange-100 pl-2 rounded-r-full">
          <span className="font-semibold text-base text-orange-500">
            Bike Delivery
          </span>

          <div className="w-8 h-8 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src="/images/delivery.png"
              alt="Delivery"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        <p className="font-bold lg:text-[4.5rem] text-[2.5rem] tracking-tighter text-textColor">
          The best Delivery in&nbsp;
          <span className="lg:text-[5rem] text-[3rem] text-orange-600">
            Your City
          </span>
        </p>

        <p className="text-base text-textColor md:text-left text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae,
          cum doloribus! Voluptates voluptatum adipisci libero et ab, reiciendis
          sapiente eius vitae ipsa harum excepturi sunt, veniam eveniet corporis
          tempora vero!
        </p>

        <Link
          to="/"
          className="bg-gradient-to-br from-orange-400 to-orange-500 md:w-auto w-full rounded-lg font-semibold text-center text-white py-2 px-4 hover:shadow-lg transition-all ease-in-out duration-100"
        >
          Order Now
        </Link>
      </div>

      <div className="relative flex flex-col items-start justify-center">
        <img
          src="/images/hero-bg.png"
          alt="Hero"
          className="ml-auto lg:w-auto lg:h-650 w-full h-420"
        />

        <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center flex-wrap py-4 gap-4">
          {heroData &&
            heroData.map((item) => (
              <div
                key={item.id}
                className="flex flex-col items-center justify-center lg:w-190 p-4 bg-cardOverlay drop-shadow-lg backdrop-blur-md rounded-3xl"
              >
                <img src={item.imageSrc} alt={item.name} className="w-20" />
                <p className="font-semibold text-textColor text-base">
                  {item.name}
                </p>
                <p className="font-semibold text-lightTextGray text-[12px] my-1">
                  {item.description}
                </p>
                <span className="font-semibold text-headingColor text-sm">
                  <small className="text-xs text-red-600">$</small> {item.price}
                </span>
              </div>
            ))}
        </div>
      </div>
    </article>
  )
}
export default HomeContainer
