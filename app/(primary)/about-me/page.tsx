import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const myImg = process.env.AUTHOR_IMAGE;

const page = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <Image
            src={myImg as string}
            alt="Abu Jafor Mohammad Saleh"
            height={200}
            width={200}
            className="w-32 h-32 mx-auto rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">Abu Jafor Mohammad Saleh</h1>
          <p className="text-gray-600 mb-4">Web Developer | Software Engineer</p>
        </div>
        <div className="text-center mb-6">
          <p className="text-gray-800">
            Hello! I&apos;m a passionate web developer with a love for creating user-friendly and responsive websites. I
            enjoy working with modern web technologies and constantly strive to improve my skills. When I&apos;m not coding,
            you can find me exploring new places or reading tech blogs.
          </p>
        </div>
        <div className="text-center">
          <Link
            href="https://www.linkedin.com/in/abujaformohammadsaleh/"
            target="_blank"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full mr-2 transition duration-300"
          >
            LinkedIn
          </Link>
          <Link
            href="mailto:abujaformdsaleh.2020@gmail.com"
            className="inline-block bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300"
          >
            Email
          </Link>
        </div>
      </div>
    </div>
  );
};

export default page;