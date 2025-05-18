<script setup>
import { ref } from 'vue';

const email = ref('');
const submitted = ref(false);

function handleSubmit() {
    // Simulación de envío
    if (email.value) {
        submitted.value = true;
        setTimeout(() => {
            submitted.value = false;
            email.value = '';
        }, 3000);
    }
}
</script>

<template>
    <section class="pt-20 pb-40 px-4 md:px-10 lg:px-32 bg-white/70 dark:bg-black/70 text-gray-900 dark:text-white">
        <!-- HERO -->
        <div class="text-center mb-16 animate-blurred-fade-in">
            <h1 class="text-4xl md:text-5xl font-bold mb-4">Rent your game server</h1>
            <p class="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Play with your friends on stable and secure servers for games like Minecraft, Valheim, and more. Set up
                in minutes.
            </p>
        </div>

        <!-- FEATURES -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 animate-blurred-fade-in">
            <div class="bg-white/60 dark:bg-black/60 p-6 rounded-2xl shadow">
                <h3 class="text-xl font-semibold mb-2">Easy to set up</h3>
                <p>Choose your game, select a plan, and start playing in under 5 minutes.</p>
            </div>
            <div class="bg-white/60 dark:bg-black/60 p-6 rounded-2xl shadow">
                <h3 class="text-xl font-semibold mb-2">High performance</h3>
                <p>Optimized servers with top-tier hardware ensuring 99.9% uptime.</p>
            </div>
            <div class="bg-white/60 dark:bg-black/60 p-6 rounded-2xl shadow">
                <h3 class="text-xl font-semibold mb-2">24/7 support</h3>
                <p>Our team is always available when you need help.</p>
            </div>
        </div>

        <!-- PRICING PLANS -->
        <div class="text-center mb-12 animate-blurred-fade-in">
            <h2 class="text-3xl font-bold mb-6">Plans (Coming soon)</h2>
            <div class="flex flex-col md:flex-row justify-center gap-8">
                <div class="bg-white/70 dark:bg-black/70 p-6 rounded-2xl shadow w-full max-w-sm">
                    <h3 class="text-xl font-bold mb-2">Starter</h3>
                    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">Perfect for casual play with friends.</p>
                    <p class="text-2xl font-bold mb-4">4€/month</p>
                    <ul class="text-left mb-4 space-y-2">
                        <li>✅ 2 GB RAM</li>
                        <li>✅ Up to 10 players</li>
                        <li>✅ Automatic backups</li>
                    </ul>
                    <button disabled
                        class="w-full bg-[#b197ff] text:black dark:text-white font-medium py-2 rounded-lg cursor-not-allowed">
                        Coming soon
                    </button>
                </div>
                <div class="bg-white/70 dark:bg-black/70 p-6 rounded-2xl shadow w-full max-w-sm border-2 border-[#b197ff]">
                    <h3 class="text-xl font-bold mb-2">Premium</h3>
                    <p class="mb-4 text-sm text-gray-500 dark:text-gray-400">For active communities and more power.</p>
                    <p class="text-2xl font-bold mb-4">9€/month</p>
                    <ul class="text-left mb-4 space-y-2">
                        <li>✅ 6 GB RAM</li>
                        <li>✅ Up to 25 players</li>
                        <li>✅ SSH access</li>
                    </ul>
                    <button disabled
                        class="w-full bg-[#b197ff] text:black dark:text-white font-medium py-2 rounded-lg cursor-not-allowed">
                        Coming soon
                    </button>
                </div>
            </div>
        </div>

        <!-- NOTIFICATION FORM -->
        <div class="text-center mt-16 max-w-xl mx-auto animate-blurred-fade-in">
            <h3 class="text-xl font-semibold mb-4">Want us to notify you when we launch?</h3>
            <form @submit.prevent="handleSubmit" class="flex flex-col sm:flex-row items-center justify-center gap-4">
                <input v-model="email" type="email" required placeholder="Your email address"
                    class="w-full sm:w-auto px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 dark:bg-gray-800" />
                <button type="submit"
                    class="bg-[#b197ff] text-black dark:text-white font-semibold px-6 py-2 rounded-md hover:text-white dark:hover:text-black hover:bg-[#DCD0FF] transition">
                    Notify me
                </button>
            </form>
            <p v-if="submitted" class="text-green-600 dark:text-green-400 mt-3">We'll notify you when it's available!
            </p>
        </div>
    </section>
</template>
