<template>
  <section class="pt-24 pb-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-white/70 dark:bg-black/70 xl:min-h-screen">
    <!-- Título principal -->
    <div class="text-center mb-12 animate-blurred-fade-in">
      <h1 class="text-4xl md:text-5xl font-bold text-black dark:text-white mb-4">
        Planes de suscripción
      </h1>
      <p class="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        Elige el plan que mejor se adapte a tu experiencia gamer.
      </p>
    </div>

    <!-- Tarjetas de suscripción -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 animate-blurred-fade-in">
      <!-- Free -->
      <div class="bg-gray-100/80 dark:bg-zinc-900/80 rounded-2xl shadow-lg p-6 flex flex-col justify-between text-center border border-gray-300 dark:border-zinc-700">
        <div>
          <h2 class="text-2xl font-semibold text-black dark:text-white mb-2">Free</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Lo esencial para cualquier jugador.</p>
          <ul class="text-left text-gray-800 dark:text-gray-300 mb-6 space-y-2">
            <li>✔️ Acceso al catálogo de juegos</li>
            <li>✔️ Ver información y detalles</li>
            <li>✔️ Guardar juegos en favoritos</li>
          </ul>
        </div>
        <div>
          <div class="text-2xl font-bold text-black dark:text-white mb-4">Gratis</div>
          <button class="bg-gray-300 dark:bg-zinc-700 text-black dark:text-white font-semibold py-2 px-4 rounded-lg cursor-default">
            Plan actual
          </button>
        </div>
      </div>

      <!-- Gamer -->
      <div class="bg-[#f3e8ff]/80 dark:bg-[#241d34]/80 border-4 border-[#c084fc] rounded-2xl shadow-2xl p-6 flex flex-col justify-between text-center transform scale-105">
        <div>
          <h2 class="text-2xl font-semibold text-black dark:text-white mb-2">Gamer</h2>
          <p class="text-gray-700 dark:text-gray-300 mb-4">Lleva tu experiencia un paso más allá.</p>
          <ul class="text-left text-gray-800 dark:text-gray-300 mb-6 space-y-2">
            <li>✔️ Todo del plan Free</li>
            <li>✔️ Sin anuncios</li>
            <li>✔️ 10% descuento en servidores</li>
            <li>✔️ Acceso a lanzamientos recientes (Latest)</li>
            <li>✔️ Deja comentarios y valoraciones</li>
          </ul>
        </div>
        <div>
          <div class="text-2xl font-bold text-black dark:text-white mb-4">5,99€ / mes</div>
          <button class="bg-[#c084fc] hover:bg-[#e9d5ff] text-black font-semibold py-2 px-6 rounded-lg transition duration-300">
            Suscribirse
          </button>
        </div>
      </div>

      <!-- Hardcore -->
      <div class="bg-gray-100/80 dark:bg-zinc-900/80 rounded-2xl shadow-lg p-6 flex flex-col justify-between text-center border-2 border-yellow-400">
        <div>
          <h2 class="text-2xl font-semibold text-black dark:text-white mb-2">Hardcore</h2>
          <p class="text-gray-600 dark:text-gray-400 mb-4">Para los jugadores más exigentes.</p>
          <ul class="text-left text-gray-800 dark:text-gray-300 mb-6 space-y-2">
            <li>✔️ Todo del plan Gamer</li>
            <li>✔️ 20% descuento en servidores</li>
            <li>✔️ Badges e iconos exclusivos</li>
            <li>✔️ Comentarios con capturas y clips (30s)</li>
          </ul>
        </div>
        <div>
          <div class="text-2xl font-bold text-black dark:text-white mb-4">12,99€ / mes</div>
          <button class="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold py-2 px-6 rounded-lg transition duration-300">
            Suscribirse
          </button>
        </div>
      </div>
    </div>
  </section>
</template>