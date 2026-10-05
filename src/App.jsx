import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { supabase } from './lib/supabase'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Admin from './pages/Admin'

function Protected({ session, role, children, adminOnly = false }) {
  if (!session) return <Navigate to="/" replace />
  if (adminOnly && role !== 'admin') return <Navigate to="/dashboard" replace />
  if (!adminOnly && role === 'admin') return <Navigate to="/admin" replace />
  return children
}

export default function App() {
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  async function loadProfile(user) {
    if (!user) { setProfile(null); return }
    const { data } = await supabase.from('profiles').select('id,name,email,role').eq('id', user.id).single()
    setProfile(data || null)
  }

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      setSession(data.session)
      await loadProfile(data.session?.user)
      setLoading(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, nextSession) => {
  setSession(nextSession)
  await loadProfile(nextSession?.user)
  if (_event === 'SIGNED_OUT') navigate('/')
    })
    return () => listener.subscription.unsubscribe()
  }, [navigate])

  if (loading) return <div className="screen-loader"><span>Loading the portal</span></div>

  return <Routes>
    <Route path="/" element={session ? <Navigate to={profile?.role === 'admin' ? '/admin' : '/dashboard'} replace /> : <Login />} />
    <Route path="/register" element={session ? <Navigate to="/dashboard" replace /> : <Register />} />
    <Route path="/dashboard" element={<Protected session={session} role={profile?.role}><Dashboard profile={profile} /></Protected>} />
    <Route path="/admin" element={<Protected session={session} role={profile?.role} adminOnly><Admin profile={profile} /></Protected>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
}
