import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        // colors: {
        //     primary: "",
        // },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
            },
            colors: {
                primary: "#fff",
                primary2: "#151515",
                secondary1: "#FF2F43",
                secondary2: "#000",
                gray1: "#989898",
                gray2: "#E7E7E7",
                gray3: "#F0F0F0",
                gray4: "#F4F4F4",
            },
            gridTemplateColumns: {
                cards: "repeat(auto-fill,minmax(18em,1fr))",
            },
            transitionProperty: {
                smooth: "0.3s cubic-bezier(0.4, 0, 0, 1)",
            },
        },
    },

    plugins: [],
};
export default config;
