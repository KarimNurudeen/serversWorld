'use client'

import { useState } from 'react'
import { ThumbsUp, ThumbsDown, MessageCircle, Send, LogIn } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

interface Comment {
  id: string
  author: string
  content: string
  date: string
  likes: number
  dislikes: number
}

export default function CommentSection({ postId }: { postId: string }) {
  const { user, openAuthModal } = useAuth()

  const [comments, setComments]   = useState<Comment[]>([])
  const [content, setContent]     = useState('')
  const [likes, setLikes]         = useState(0)
  const [dislikes, setDislikes]   = useState(0)
  const [userVote, setUserVote]   = useState<'like' | 'dislike' | null>(null)
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
    if (!user || !content.trim()) return
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 400))
    setComments((prev) => [
      {
        id: Date.now().toString(),
        author: user.name,
        content: content.trim(),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0,
        dislikes: 0,
      },
      ...prev,
    ])
    setContent('')
    setSubmitting(false)
  }

  // Suppress unused variable warning for postId (used when wiring to real API)
  void postId

  return (
    <div className="border-t border-divider pt-10">
      {/* Like / Dislike */}
      <div className="flex items-center gap-4 mb-10">
        <span className="text-secondary-text font-secondary text-body-md">Was this article helpful?</span>
        <button
          onClick={() => handleVote('like')}
          className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
            userVote === 'like'
              ? 'border-white bg-white text-background'
              : 'border-divider text-secondary-text hover:text-white hover:border-white/50'
          }`}
        >
          <ThumbsUp size={15} /> {likes}
        </button>
        <button
          onClick={() => handleVote('dislike')}
          className={`flex items-center gap-2 px-4 py-2 border transition-colors ${
            userVote === 'dislike'
              ? 'border-white bg-white text-background'
              : 'border-divider text-secondary-text hover:text-white hover:border-white/50'
          }`}
        >
          <ThumbsDown size={15} /> {dislikes}
        </button>
      </div>

      {/* Comments header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle size={20} className="text-white/60" />
        <h3 className="font-primary font-semibold text-title-md text-white">
          Comments ({comments.length})
        </h3>
      </div>

      {/* Comment form — gated behind auth */}
      {user ? (
        /* Signed-in: show form with name pre-filled */
        <form onSubmit={handleSubmit} className="mb-10 border border-divider p-6 space-y-4">
          <div className="flex items-center gap-3 pb-4 border-b border-divider">
            <div className="h-9 w-9 border border-white/30 bg-white/10 flex items-center justify-center shrink-0">
              <span className="text-white font-primary font-bold text-sm">{user.name[0].toUpperCase()}</span>
            </div>
            <div>
              <p className="text-white font-primary font-semibold text-body-md">{user.name}</p>
              <p className="text-secondary-text text-body-sm font-secondary">{user.email}</p>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts on this article..."
            required
            rows={4}
            className="input-field resize-none w-full"
          />
          <button
            type="submit"
            disabled={submitting || !content.trim()}
            className="btn-primary flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={14} />
            {submitting ? 'POSTING...' : 'POST COMMENT'}
          </button>
        </form>
      ) : (
        /* Signed-out: auth gate */
        <div className="mb-10 border border-divider p-8 text-center">
          <div className="flex h-14 w-14 items-center justify-center border border-divider mx-auto mb-4">
            <MessageCircle size={22} className="text-white/40" />
          </div>
          <h4 className="font-primary font-semibold text-title-md text-white mb-2">
            Sign in to join the conversation
          </h4>
          <p className="text-secondary-text text-body-md font-secondary leading-relaxed mb-6 max-w-sm mx-auto">
            Sign in to leave a comment. No account yet? You can create one from the sign-in screen.
          </p>
          <button
            onClick={() => openAuthModal('login')}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <LogIn size={14} /> SIGN IN
          </button>
        </div>
      )}

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-divider p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-9 w-9 border border-divider flex items-center justify-center bg-surface">
                  <span className="text-white font-primary font-bold text-sm">{comment.author[0].toUpperCase()}</span>
                </div>
                <div>
                  <p className="text-white font-primary font-semibold text-body-md">{comment.author}</p>
                  <p className="text-secondary-text text-body-sm font-secondary">{comment.date}</p>
                </div>
              </div>
              <p className="text-secondary-text font-secondary text-body-md leading-relaxed">{comment.content}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-secondary-text font-secondary text-body-md text-center py-8 border border-divider">
          No comments yet.{' '}
          {user ? 'Be the first to share your thoughts!' : (
            <button onClick={() => openAuthModal('signup')} className="text-white underline underline-offset-2 hover:no-underline">
              Sign up
            </button>
          )}{' '}
          {!user && (
            <button onClick={() => openAuthModal('login')} className="text-white underline underline-offset-2 hover:no-underline">
              Sign in
            </button>
          )}{!user && ' to join the conversation.'}
        </p>
      )}
    </div>
  )
}
