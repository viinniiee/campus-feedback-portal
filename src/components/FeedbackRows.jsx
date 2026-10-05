export default function FeedbackRows({ items, admin = false }) {
  if (!items.length) return <div className="empty-state">No feedback has been submitted for this category yet.</div>
  return <div className="feedback-list">{items.map(item => <article className="feedback-row" key={item.fb_id}>
    <div className="feedback-meta"><span>{admin ? `#${item.fb_id}` : item.user_name}</span><span className="category">{item.category}</span></div>
    <p>{item.message}</p>
    {item.created_at && <time>{new Date(item.created_at).toLocaleDateString()}</time>}
  </article>)}</div>
}
