import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   experimental: {
//     serverActions: {
//       bodySizeLimit: "5mb", // Increase the body size limit for server actions
//     }
// },
// }
// const withPWA = require('next-pwa')({
//   dest: 'public',
//   register: true,
//   skipWaiting: true,
// });

// module.exports = withPWA({
//   // your existing Next.js config
// });





// export default nextConfig;
// next.config.js

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // Increase upload size for server actions
    },
  },
  // Any other config can go here too
};

module.exports = withPWA(nextConfig);

