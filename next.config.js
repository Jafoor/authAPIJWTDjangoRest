/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: "https",
            hostname: "*.googleusercontent.com",
            port: "",
            pathname: "**",
          },
        ],
      },
    env: {
        GOOGLE_CLIENT_ID: "458482525105-le0eglbfjslieehjg8d27onnaqmver5i.apps.googleusercontent.com",
        GOOGLE_CLIENT_SECRET: "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",
        NEXTAUTH_SECRET: "kjfasldfiewufhslkawi"
    }
}

module.exports = nextConfig
