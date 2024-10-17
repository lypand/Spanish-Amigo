declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

interface ImportMeta {
    env: {
        VITE_BACKEND_BASE_URL: string;
        VITE_GOOGLE_CLIENT_ID: string;
    };
}