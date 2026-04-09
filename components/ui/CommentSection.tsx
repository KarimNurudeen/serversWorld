'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageCircle, Send } from 'lucide-react'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  likes: number
  dislikes: number
}

export default function CommentSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([])
  const [name, setName] = useState('')
  const [content, setContent] = useState('')
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  const [userVote, setUserVote] = useState<'like' | 'dislike' | null>(null)
  const [submitting, setSubmitting] = useState(false)

  function handleVote(type: 'like' | 'dislike') {
    if (userVote === type) {
      setUserVote(null)
      type === 'like' ? setLikes((l) => l - 1) : setDislikes((d) => d - 1)
    } else {
      if (userVote) {
        userVote === 'like' ? setLikes((l) => l - 1) : setDislikes((d) => d - 1)
      }
      setUserVote(type)
      type === 'like' ? setLikes((l) => l + 1) : setDislikes((d) => d + 1)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim() || !content.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 500))
    const newComment: Comment = {
      id: Date.now().toString(),
      author: name,
      content,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      likes: 0,
      dislikes: 0,
    }
    setComments((prev) => [newComment, ...prev])
    setName('')
    setContent('')
    setSubmitting(false)
  }

  return (
    <div className="border-t border-divider pt-10">
      {/* Like / Dislike */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-secondary-text font-secondary text-body-md">Was this article helpful?</span>
        <button
          onClick={() => handleVote('like')}
          className={`flex items-center gap-2 px-4 py-2 border transition-colors ${userVote === 'like' ? 'border-white bg-white text-background' : 'border-divider text-secondary-text hover:text-white hover:border-white/50'}`}
        >
          <ThumbsUp size={15} /> {likes}
        </button>
        <button
          onClick={() => handleVote('dislike')}
          className={`flex items-center gap-2 px-4 py-2 border transition-colors ${userVote === 'dislike' ? 'border-white bg-white text-background' : 'border-divider text-secondary-text hover:text-white hover:border-white/50'}`}
        >
          <ThumbsDown size={15} /> {dislikes}
        </button>
      </div>

      {/* Comments Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle size={20} className="text-white/60" />
        <h3 className="font-primary font-semibold text-title-md text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment Form */}
      <form onSubmit={handleSubmit} className="mb-10 space-y-4 border border-divider p-6">
        <h4 className="font-primary font-semibold text-body-lg text-white">Leave a Comment</h4>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          required
          className="input-field"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your thoughts..."
          required
          rows={4}
          className="input-field resize-none"
        />
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary flex items-center gap-2"
        >
          <Send size={14} />
          {submitting ? 'Posting...' : 'POST COMMENT'}
        </button>
      </form>

      {/* Comments List */}
      {comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-divider p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 border border-divider flex items-center justify-center bg-hint">
                    <span className="text-white font-primary font-bold text-sm">{comment.author[0].toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-white font-primary font-semibold text-body-md">{comment.author}</p>
                    <p className="text-secondary-text text-body-sm font-secondary">{comment.date}</p>
                  </div>
                </div>
              </div>
              <p className="text-secondary-text font-secondary text-body-md leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-secondary-text font-secondary text-body-md text-center py-8 border border-divider">
          No comments yet. Be the first to share your thoughts!
        </p>
      )}
    </div>
  )
}
