/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**", // السماح بجميع الصور ضمن هذا المسار
      },
    ],
  },
};

export default nextConfig;
