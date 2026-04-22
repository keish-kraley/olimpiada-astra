"use client";

import { useState, useEffect, createContext, useContext } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AuthContext = createContext<{
  token: string;
  logout: () => void;
}>({ token: "", logout: () => {} });

export function useAuth() {
  return useContext(AuthContext);
}

function LoginForm({ onLogin }: { onLogin: (token: string) => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      localStorage.setItem("admin_token", password);
      onLogin(password);
    } else {
      setError("Senha inválida");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Painel Administrativo
        </h1>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Senha de acesso
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue outline-none"
          placeholder="Digite a senha"
          autoFocus
        />
        {error && (
          <p className="text-red-500 text-sm mb-4">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-blue text-white rounded-lg py-2 font-medium hover:bg-brand-blue-dark transition-colors disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/provas", label: "Provas e Documentos", icon: "📄" },
  { href: "/admin/galeria", label: "Galeria", icon: "🖼️" },
  { href: "/admin/contato", label: "Contato e Logos", icon: "📞" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    const saved = localStorage.getItem("admin_token");
    if (saved) {
      fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: saved }),
      }).then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setToken(saved);
        } else {
          localStorage.removeItem("admin_token");
        }
        setChecking(false);
      });
    } else {
      queueMicrotask(() => {
        if (!cancelled) setChecking(false);
      });
    }
    return () => { cancelled = true; };
  }, []);

  function logout() {
    localStorage.removeItem("admin_token");
    setToken(null);
  }

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-gray-500">Carregando...</div>
      </div>
    );
  }

  if (!token) {
    return <LoginForm onLogin={setToken} />;
  }

  return (
    <AuthContext.Provider value={{ token, logout }}>
      <div className="min-h-screen flex bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-brand-blue-dark text-white flex flex-col">
          <div className="p-6 border-b border-white/10">
            <Link href="/" className="text-lg font-bold">
              Olimpíada Astra
            </Link>
            <p className="text-xs text-white/60 mt-1">Painel Admin</p>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-white/10">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 rounded-lg text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
            >
              Sair
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </main>
      </div>
    </AuthContext.Provider>
  );
}
