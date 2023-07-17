import React from 'react'

const Header = () => {
  return (
    <div className="container my-24 mx-auto md:px-6">
  <section className="mb-32 text-center">
    <div className="flex justify-center">
      <div className="max-w-[800px]">
        <h2 className="mb-12 text-5xl font-bold tracking-tight md:text-6xl xl:text-7xl">
          Are you ready <br />
          <span className="text-primary dark:text-primary-400">for an adventure?</span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-300">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima
          officia consequatur adipisci tenetur repudiandae rerum quos.
        </p>
      </div>
    </div>
  </section>
</div>
  )
}

export default Header