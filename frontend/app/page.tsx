import { Button } from "flowbite-react";

export default async function HomePage() {
  return (
    <body className="bg-gradient-to-br from-gray-900 to-black">
      <div className="text-gray-300 container mx-auto p-8 overflow-hidden md:rounded-lg md:p-10 lg:p-12">
        <div className="flex justify-between">
          <h1 className="font-serif text-3xl font-medium">Citizenship</h1>
          <div className="flex">
            <Button
              as="a"
              href="/auth/login"
              className="self-start px-3 py-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
            >
              Login
            </Button>
            <Button
              as="a"
              href="/auth/register"
              className="self-start px-3 py-2 ml-2 leading-none text-gray-200 border border-gray-800 rounded-lg focus:outline-none focus:shadow-outline bg-gradient-to-b hover:from-indigo-500 from-gray-900 to-black"
            >
              Get started
            </Button>
          </div>
        </div>

        <div className="h-32 md:h-40"></div>

        <div className="relative z-0">
          <div className="relative z-20">
            <p className="font-sans text-4xl font-bold text-gray-200 max-w-5xl lg:text-7xl lg:pr-24 md:text-6xl">
              Spend less time coding and more time creating
            </p>

            <div className="h-10"></div>

            <p className="max-w-2xl font-serif text-xl text-gray-400 md:text-2xl">
              Imagine being able to spent less time... This is a demonstration landing
              page made with tailwindcss
            </p>
          </div>
          <div className="absolute top-0 right-0 hidden w-1/2 h-full lg:block z-10">
            <div className="-mr-24 rounded-lg md:rounded-l-full bg-gradient-to-br from-gray-800 to-black h-96"></div>
          </div>
        </div>
      </div>
    </body>
  );
}