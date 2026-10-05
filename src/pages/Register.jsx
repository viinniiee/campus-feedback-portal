import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Register() {
  const [form, setForm] = useState({ name:'', email:'', password:'' })
  const [error, setError] = useState(''); const [busy, setBusy] = useState(false); const navigate = useNavigate()
  const change = e => setForm({...form, [e.target.name]: e.target.value})
  async function submit(e) {
    e.preventDefault(); setError(''); setBusy(true)
    const { data, error } = await supabase.auth.signUp({ email:form.email, password:form.password, options:{ data:{ name:form.name } } })
    if (error) setError(error.message)
    else if (data.session) navigate('/dashboard')
    else setError('Account created. Check your email if confirmation is enabled, then sign in.')
    setBusy(false)
  }
  return <main className="auth-page"><div className="auth-copy"><p className="eyebrow">Campus / registration</p><h1>Your voice<br/><em>belongs here.</em></h1><p>Create an account and start sending feedback to the right department.</p></div><section className="auth-panel"><p className="eyebrow">Create account</p><h2>Start here.</h2><form onSubmit={submit}><label>Full name<input name="name" value={form.name} onChange={change} required /></label><label>Institutional email<input type="email" name="email" value={form.email} onChange={change} required /></label><label>Password<input type="password" name="password" value={form.password} onChange={change} minLength="6" required /></label>{error && <p className="form-error">{error}</p>}<button className="primary-button" disabled={busy}>{busy ? 'Creating…' : 'Create account'}</button></form><p className="switch">Already registered? <Link to="/">Sign in</Link></p></section></main>
}
