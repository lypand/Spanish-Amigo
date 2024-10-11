declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

interface ImportMeta {
    env: {
        VITE_BACKEND_BASE_URL: string; // Add other environment variables as needed
        // Add more properties if you have other environment variables
    };
}