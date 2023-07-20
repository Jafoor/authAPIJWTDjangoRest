import React from 'react'

const Header = () => {
  return (
    <div className="container my-24 mx-auto md:px-6">
  <section className="mb-32 text-center">
    <div className="flex justify-center">
      <div className="max-w-[800px]">
        <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl xl:text-6xl">
          Are you ready <br />
          <span className="text-primary dark:text-primary-400">for your next interview?</span>
        </h2>
        <p className="text-lg text-neutral-500 dark:text-neutral-300">
        Master interviews with expert-curated questions & answers for job seekers and employers. Empower your career today!
        </p>
      </div>
    </div>
  </section>
</div>
  )
}

export default Header