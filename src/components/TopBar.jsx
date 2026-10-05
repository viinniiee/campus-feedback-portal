import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import Wordmark from './Wordmark'

export default function TopBar({ name, admin = false }) {
  const navigate = useNavigate()
  async function logout() {
    await supabase.auth.signOut()
    document.cookie = 'lastUser=; Max-Age=0; path=/; SameSite=Lax'
    navigate('/')
  }
  return <header className="topbar"><Wordmark/><div className="topbar-right"><span className="hello">{admin ? 'Admin view' : name}</span><button className="text-button" onClick={logout}>Sign out</button></div></header>
}
