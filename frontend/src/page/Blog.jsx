import React from "react";
import Layout from "../components/layout/layout";

const Blog = () => {
  return (
    <Layout
      title="Book Store Blog"
      description="Stay updated with the latest book releases, reading tips, and recommendations."
      keywords="blog, books, reading tips, new releases, book recommendations"
      author="Aadarsh Adhikari"
    >
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Book Store Blog</h1>
        <section className="space-y-8">
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Latest Book Releases in 2024</h2>
            <p className="text-gray-700">Discover the most anticipated book releases of 2024...</p>
          </article>
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Top 5 Must-Read Genres</h2>
            <p className="text-gray-700">Explore different genres and find your next favorite book...</p>
          </article>
          <article className="p-4 border-b border-gray-200">
            <h2 className="text-2xl font-semibold mb-2">Tips for Building a Reading Habit</h2>
            <p className="text-gray-700">Struggling to read more? Here are some practical tips to build a reading habit...</p>
          </article>
          {/* Add more blog articles as needed */}
        </section>
      </div>
    </Layout>
  );
};

export default Blog;
