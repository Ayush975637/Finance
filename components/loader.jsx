// components/RupeeLoader.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const RupeeLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <motion.div
        className="text-6xl font-bold"
        animate={{
          rotate: [0, 360],
          color: ["#FF9933", "#FFFFFF", "#138808"], // Saffron, White, Green
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        ₹
      </motion.div>
    </div>
  );
};

export default RupeeLoader;
// "use client";
// import { motion } from "framer-motion";

// export default function RuppeLoader() {
//   return (
//     <div className="flex items-center justify-center h-screen bg-white">
//       <motion.div
//         className="relative w-20 h-20"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8 }}
//       >
//         {/* Saffron glowing center */}
//         <motion.div
//           className="absolute top-1/2 left-1/2 w-6 h-6 bg-orange-500 rounded-full shadow-lg"
//           style={{ transform: "translate(-50%, -50%)" }}
//           animate={{
//             scale: [1, 1.1, 1],
//             opacity: [0.9, 1, 0.9],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.5,
//             ease: "easeInOut",
//           }}
//         />

//         {/* Orbiting green dot */}
//         <motion.div
//           className="absolute w-3 h-3 bg-green-600 rounded-full"
//           style={{
//             top: "50%",
//             left: "50%",
//             transformOrigin: "0 -32px",
//           }}
//           animate={{
//             rotate: 360,
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 2,
//             ease: "linear",
//           }}
//         />
//       </motion.div>
//     </div>
//   );
// }

// "use client";
// import React from "react";
// import { motion } from "framer-motion";

// export default function RuppeLoader() {
//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-white">
//       <div className="w-60 h-3 relative overflow-hidden rounded-full shadow-md border border-gray-200">
//         <motion.div
//           className="absolute h-full w-1/3 bg-gradient-to-r from-orange-500 via-white to-green-600"
//           animate={{ x: ["-100%", "100%"] }}
//           transition={{
//             repeat: Infinity,
//             duration: 1.5,
//             ease: "linear",
//           }}
//         />
//       </div>
//       <p className="mt-4 text-sm text-gray-500 font-medium animate-pulse">
//         Loading intelligence...
//       </p>
//     </div>
//   );
// }

// components/UltraTricolorLoader.jsx
// "use client";

// import React from "react";
// import { motion } from "framer-motion";

// const RuppeLoader = () => {
//   return (
//     <div className="w-full h-[300px] flex items-center justify-center relative">
//       {/* Chakra Ring */}
//       <motion.div
//         className="absolute w-28 h-28 rounded-full border-4 border-dashed border-white"
//         animate={{ rotate: 360 }}
//         transition={{
//           repeat: Infinity,
//           ease: "linear",
//           duration: 2,
//         }}
//         style={{
//           boxShadow: "0 0 15px #1a73e8, 0 0 30px #1a73e8",
//         }}
//       />

//       {/* Tricolor Pulse */}
//       <motion.div
//         className="w-20 h-20 rounded-full flex items-center justify-center font-bold text-4xl shadow-lg"
//         animate={{
//           background: [
//             "linear-gradient(135deg, #FF9933, #FFF)",
//             "linear-gradient(135deg, #FFF, #138808)",
//             "linear-gradient(135deg, #138808, #FF9933)",
//           ],
//           scale: [1, 1.1, 1],
//         }}
//         transition={{
//           repeat: Infinity,
//           duration: 1.8,
//           ease: "easeInOut",
//         }}
//       >
//         <motion.span
//           animate={{
//             rotate: [0, -10, 10, 0],
//           }}
//           transition={{
//             repeat: Infinity,
//             duration: 2,
//             ease: "easeInOut",
//           }}
//           className="text-white font-extrabold drop-shadow-xl"
//         >
//           ₹
//         </motion.span>
//       </motion.div>
//     </div>
//   );
// };

// export default RuppeLoader;

