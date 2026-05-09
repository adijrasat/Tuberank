import { useState, useEffect } from 'react'

const CATEGORIES = [
  'Science', 'History', 'AI & Technology', 'Business',
  'Politics', 'Music', 'Sports', 'Gaming', 'Comedy', 'Film & TV', 'Education', 'Other'
]

const SEED = [
  { id: 1, title: 'The Most Important Century', channel: 'Kurzgesagt', category: 'Science', videoId: 'LEENEFaVUzU', views: '12M', subscribers: '21M' },
  { id: 2, title: 'Optimization', channel: 'CGP Grey', category: 'Education', videoId: 'yVkdfJ9PkRQ', views: '8M', subscribers: '7M' },
  { id: 3, title: 'The Entire History of the World', channel: 'Sam ONeill', category: 'History', videoId: '-6Wu0Q7x5D0', views: '15M', subscribers: '5M' },
]

function App() {
  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('tuberank_videos')
    return saved ? JSON.parse(saved) : SEED
  })
  const [ratings, setRatings] = useState(() => {
    const saved = localStorage.getItem('tuberank_ratings')
    return saved ? JSON.parse(saved) : {}
  })
  const [activeCategory, setActiveCategory] = useState('All')
  const [showSubmit, setShowSubmit] = useState(false)
  const [newVideo, setNewVideo] = useState({ title: '', channel: '', category: 'Science', videoId: '' })
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('rating')

  useEffect(() => {
    localStorage.setItem('tuberank_videos', JSON.stringify(videos))
  }, [videos])

  useEffect(() => {
    localStorage.setItem('tuberank_ratings', JSON.stringify(ratings))
  }, [ratings])

  const getAvgRating = (id) => {
    const r = ratings[id]
    if (!r || r.length === 0) return 0
    return (r.reduce((a, b) => a + b, 0) / r.length).toFixed(1)
  }

  const rateVideo = (id, score) => {
    setRatings(prev => ({
      ...prev,
      [id]: [...(prev[id] || []), score]
    }))
  }

  const submitVideo = () => {
    if (!newVideo.title || !newVideo.channel || !newVideo.videoId) return
    const video = { ...newVideo, id: Date.now(), views: 'N/A', subscribers: 'N/A' }
    setVideos(prev => [...prev, video])
    setNewVideo({ title: '', channel: '', category: 'Science', videoId: '' })
    setShowSubmit(false)
  }

  const filtered = videos
    .filter(v => activeCategory === 'All' || v.category === activeCategory)
    .filter(v => v.title.toLowerCase().includes(search.toLowerCase()) || v.channel.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'rating') return getAvgRating(b.id) - getAvgRating(a.id)
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return 0
    })

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f0f', color: '#fff', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#1a1a1a', padding: '16px 24px', borderBottom: '1px solid #333', display: 'flex', alignItems: 'center', gap: 16 }}>
        <h1 style={{ margin: 0, fontSize: 24, color: '#ff4444' }}>📺 TubeRank</h1>
        <span style={{ color: '#aaa', fontSize: 14 }}>Community-powered YouTube ratings</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search videos..."
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #444', background: '#2a2a2a', color: '#fff', width: 200 }}
          />
          <button onClick={() => setShowSubmit(true)} style={{ padding: '8px 16px', borderRadius: 8, background: '#ff4444', color: '#fff', border: 'none', cursor: 'pointer' }}>
            + Submit
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: 8, padding: '16px 24px', flexWrap: 'wrap', borderBottom: '1px solid #222' }}>
        {['All', ...CATEGORIES].map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            style={{ padding: '6px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: activeCategory === cat ? '#ff4444' : '#2a2a2a', color: '#fff', fontSize: 13 }}>
            {cat}
          </button>
        ))}
        <select value={sortBy} onChange={e => setSortBy(e.target.value)}
          style={{ marginLeft: 'auto', padding: '6px 12px', borderRadius: 8, border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
          <option value="rating">Sort: Top Rated</option>
          <option value="title">Sort: A-Z</option>
        </select>
      </div>

      <main style={{ padding: 24 }}>
        {filtered.length === 0 && <p style={{ color: '#aaa', textAlign: 'center' }}>No videos found.</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 20 }}>
          {filtered.map(v => (
            <div key={v.id} style={{ background: '#1a1a1a', borderRadius: 12, overflow: 'hidden', border: '1px solid #2a2a2a' }}>
              <div style={{ position: 'relative' }}>
                <img
                  src={`https://img.youtube.com/vi/${v.videoId}/mqdefault.jpg`}
                  alt={v.title}
                  style={{ width: '100%', display: 'block', aspectRatio: '16/9', objectFit: 'cover' }}
                  onError={e => { e.target.style.display = 'none' }}
                />
                <span style={{ position: 'absolute', top: 8, right: 8, background: '#ff4444', color: '#fff', padding: '2px 8px', borderRadius: 12, fontSize: 12 }}>
                  {v.category}
                </span>
              </div>
              <div style={{ padding: 16 }}>
                <h3 style={{ margin: '0 0 4px', fontSize: 15, lineHeight: 1.4 }}>{v.title}</h3>
                <p style={{ margin: '0 0 12px', color: '#aaa', fontSize: 13 }}>{v.channel}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 22, fontWeight: 'bold', color: '#ffd700' }}>★ {getAvgRating(v.id) || '—'}</span>
                  <span style={{ color: '#666', fontSize: 12 }}>({(ratings[v.id] || []).length} votes)</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: 4 }}>
                    {[1,2,3,4,5].map(s => (
                      <button key={s} onClick={() => rateVideo(v.id, s)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: s <= getAvgRating(v.id) ? '#ffd700' : '#444' }}>
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showSubmit && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#1a1a1a', borderRadius: 16, padding: 32, width: 400, border: '1px solid #333' }}>
            <h2 style={{ margin: '0 0 20px' }}>Submit a Video</h2>
            {[['Title', 'title', 'text'], ['YouTube Video ID', 'videoId', 'text'], ['Channel', 'channel', 'text']].map(([label, key, type]) => (
              <div key={key} style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#aaa' }}>{label}</label>
                <input type={type} value={newVideo[key]} onChange={e => setNewVideo(p => ({ ...p, [key]: e.target.value }))}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #444', background: '#2a2a2a', color: '#fff', boxSizing: 'border-box' }} />
              </div>
            ))}
            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', marginBottom: 6, fontSize: 13, color: '#aaa' }}>Category</label>
              <select value={newVideo.category} onChange={e => setNewVideo(p => ({ ...p, category: e.target.value }))}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #444', background: '#2a2a2a', color: '#fff' }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={() => setShowSubmit(false)} style={{ flex: 1, padding: 12, borderRadius: 8, border: '1px solid #444', background: 'none', color: '#fff', cursor: 'pointer' }}>Cancel</button>
              <button onClick={submitVideo} style={{ flex: 1, padding: 12, borderRadius: 8, border: 'none', background: '#ff4444', color: '#fff', cursor: 'pointer' }}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
