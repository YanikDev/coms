module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Make sure this includes all your component files
    "./public/index.html"
  ],
  // Add this important setting when using Material-UI
  important: '#root', // Or your root element ID
  corePlugins: {
    // Disable preflight to prevent conflicts with Material-UI
    preflight: false,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}