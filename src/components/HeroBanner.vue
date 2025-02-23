<template>
  <section class="bg-gray-100/60 backdrop-blur dark:bg-black/60 text-white mt-[64px]">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:items-center">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="bg-gradient-to-r from-[#DCD0FF] via-blue-500 to-[#b197ff] bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
          Welcome to..

          <span class="sm:block"> WhatTheGame </span>
        </h1>

        <p class="mx-auto mt-4 max-w-xl sm:text-xl/relaxed text-black dark:text-white">
          Your one-stop solution for finding the perfect game to play! What are you gonna play today?
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <RouterLink
            class="block w-full rounded border border-[#b197ff] bg-[#b197ff] px-12 py-3 text-sm font-medium text-black hover:bg-transparent dark:hover:text-white focus:outline-none active:text-opacity-75 sm:w-auto"
            to="/categories">
            Browse Categories
          </RouterLink>

          <RouterLink
            class="block w-full rounded border border-[#DCD0FF] px-12 py-3 text-sm font-medium text-black dark:text-white  hover:bg-[#DCD0FF] hover:text-black dark:hover:text-black focus:outline-none active:bg-opacity-75 sm:w-auto "
            to="/most-played">
            Browse Most Played
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>