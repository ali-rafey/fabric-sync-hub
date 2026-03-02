import './BlogsSection.css';

const blogs = [
  {
    id: 1,
    title: 'The Art of Denim: From Cotton to Canvas',
    excerpt: 'Explore how raw cotton is transformed into premium denim through our meticulous weaving and finishing process.',
    date: 'Feb 2026',
    tag: 'Fabric',
  },
  {
    id: 2,
    title: 'Understanding GSM: A Buyer\'s Guide',
    excerpt: 'What does GSM mean for your fabric choice? We break down weight, drape, and durability for every application.',
    date: 'Jan 2026',
    tag: 'Guide',
  },
  {
    id: 3,
    title: 'Sustainable Textiles: Our Commitment',
    excerpt: 'How Fanaar Fabrics integrates eco-friendly practices from sourcing to sampling without compromising quality.',
    date: 'Dec 2025',
    tag: 'Sustainability',
  },
  {
    id: 4,
    title: 'Twill vs Plain Weave: Choosing Right',
    excerpt: 'A detailed comparison of two foundational weave structures and when to use each for optimal results.',
    date: 'Nov 2025',
    tag: 'Education',
  },
];

export function BlogsSection() {
  return (
    <div className="blogs-container">
      <div className="blogs-header">
        <span className="blogs-label">Insights</span>
        <h2 className="blogs-title">Articles & Blogs</h2>
      </div>

      <div className="blogs-grid">
        {blogs.map((blog) => (
          <article key={blog.id} className="blog-card">
            <div className="blog-card-top">
              <span className="blog-tag">{blog.tag}</span>
              <span className="blog-date">{blog.date}</span>
            </div>
            <h3 className="blog-card-title">{blog.title}</h3>
            <p className="blog-card-excerpt">{blog.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
