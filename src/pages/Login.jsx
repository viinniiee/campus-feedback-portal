import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function getCookie(name) { return document.cookie.split('; ').find(x => x.startsWith(name + '='))?.split('=')[1] || '' }

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const navigate = useNavigate()
  useEffect(() => setEmail(decodeURIComponent(getCookie('lastUser'))), [])

  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else { document.cookie = `lastUser=${encodeURIComponent(email)}; Max-Age=${60 * 60 * 24 * 7}; path=/; SameSite=Lax`; navigate('/dashboard') }
    setBusy(false)
  }
  return <main className="auth-page"><div className="auth-copy"><p className="eyebrow">Campus / feedback portal</p><h1>Speak up.<br/><em>Be heard.</em></h1><p>One place to report the everyday issues that affect campus life.</p></div><section className="auth-panel"><p className="eyebrow">Sign in</p><h2>Welcome back.</h2>{email && <p className="saved-note">Last used: {email}</p>}<form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="email" /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password" /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button></form><p className="switch">New here? <Link to="/register">Create an account</Link></p></section></main>
}
