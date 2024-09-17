const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    flowbite.content(),
    "./frontend/src/**/*.{js,jsx,ts,tsx,html}",
  ],
  plugins: [
    // ...
    flowbite.plugin(),
    require("flowbite/plugin")({
      charts: true,
    }),
  ],
};
