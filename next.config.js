/** @type {import('next').NextConfig} */

const dns = require("dns");

// import dns from "dns";

dns.setDefaultResultOrder("ipv4first")
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
        NEXTAUTH_SECRET: "kjfasldfiewufhslkawi",
        MONGO_URI:"mongodb+srv://jafoor:12abAB@interview-prep.wiowktp.mongodb.net/quick-prep",
        APP_URI:"http://localhost:3000"
    }
}

module.exports = nextConfig
