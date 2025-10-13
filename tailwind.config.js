export default {
    // content: ['./src/app/**/*.{ts,tsx,js,jsx}', './src/components/**/*.{ts,tsx,js,jsx}'],
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './@/**/*.{js,ts,jsx,tsx,mdx}', // For shadcn/ui components
    ],
    theme: { extend: {} },
    plugins: []
};