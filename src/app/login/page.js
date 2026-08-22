import { login } from './actions'

export default async function LoginPage(props) {
  const searchParams = await props.searchParams;
  
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#0a0a0a] rounded-2xl border border-white/10 p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white mb-2">Admin Login</h1>
          <p className="text-slate-400">Access the AI Content Engine</p>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">Password</label>
            <input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="w-full bg-[#050505] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50"
            />
          </div>
          
          <button 
            formAction={login}
            className="w-full py-4 rounded-xl bg-white text-[#050505] font-black uppercase tracking-widest hover:bg-slate-200 transition-colors"
          >
            Sign In
          </button>
          
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-red-900/30 text-red-400 text-center text-sm rounded-lg border border-red-900/50">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
