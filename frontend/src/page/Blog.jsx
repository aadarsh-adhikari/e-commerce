import React from "react";
import Layout from "../components/layout/layout";
const Blog = () => {
  return (
    <Layout
      title="Men's Wear Blog"
      description="Stay updated with the latest trends and fashion tips in men's wear."
      keywords="blog, men's fashion, style tips, trends"
      author="Aadarsh Adhikari"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Men's Wear Blog</h1>
        <section className="space-y-8">
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Latest Fashion Trends in 2024</h2>
            <p className="text-gray-700">Discover the hottest trends in men's fashion for 2024...</p>
          </article>
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">How to Style Your Outfits</h2>
            <p className="text-gray-700">Learn how to mix and match pieces to create stunning outfits...</p>
          </article>
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Top 10 Must-Have Accessories</h2>
            <p className="text-gray-700">Check out our list of must-have accessories for every man's wardrobe...</p>
          </article>
          {/* Add more blog articles as needed */}
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
