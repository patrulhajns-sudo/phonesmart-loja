"use client";

import { useState, useEffect } from 'react';

type Product = {
  id: number;
  name: string;
  brand: string;
  condition: string;
  storage: string;
  price: number;
  stock: number;
  featured: boolean;
  badge: string | null;
};

function formatBRL(cents: number) {
  return (cents / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch('/api/products?limit=100')
      .then((r) => r.json())
      .then((data) => {
        setProducts(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [authenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'phonesmart70x7') {
      setAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta');
    }
  };

  if (!authenticated) {
    return (
      <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000, #1f2937)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center', color: 'white' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🛡️</div>
          <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Painel da Loja</h1>
          <p style={{ color: '#9ca3af', marginBottom: '30px' }}>Área restrita. Informe a senha.</p>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              style={{ width: '100%', padding: '12px 20px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', color: 'white', fontSize: '16px', textAlign: 'center', boxSizing: 'border-box', marginBottom: '12px' }}
            />
            <button
              type="submit"
              style={{ width: '100%', padding: '12px', background: '#f97316', color: 'white', fontWeight: 'bold', borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '16px' }}
            >
              Entrar no painel
            </button>
          </form>
          {error && <p style={{ color: '#f87171', marginTop: '16px' }}>{error}</p>}
          <a href="/" style={{ color: '#6b7280', fontSize: '14px', marginTop: '24px', display: 'inline-block' }}>← Voltar para a loja</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <header style={{ background: 'linear-gradient(90deg, #000, #1f2937)', color: 'white', padding: '32px 0' }}>
        <div style={{ maxWidth: '1152px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📱</div>
            <span style={{ fontSize: '24px', fontWeight: 'bold' }}>PHONE<span style={{ color: '#f97316' }}>SMART</span></span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Painel da Loja</h1>
          <p style={{ color: '#9ca3af' }}>Produtos e pedidos</p>
        </div>
      </header>

      <main style={{ maxWidth: '1152px', margin: '0 auto', padding: '48px 24px' }}>
        <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', padding: '24px', overflowX: 'auto' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827', marginBottom: '20px' }}>
            📦 Produtos Cadastrados ({products.length})
          </h2>
          {loading ? (
            <p style={{ color: '#6b7280', textAlign: 'center', padding: '32px 0' }}>Carregando produtos...</p>
          ) : (
            <table style={{ width: '100%', fontSize: '14px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <thead style={{ background: '#111827', color: 'white' }}>
                <tr>
                  <th style={{ padding: '12px 16px', borderTopLeftRadius: '12px' }}>Nome</th>
                  <th style={{ padding: '12px 16px' }}>Marca</th>
                  <th style={{ padding: '12px 16px' }}>Condição</th>
                  <th style={{ padding: '12px 16px' }}>Preço</th>
                  <th style={{ padding: '12px 16px', borderTopRightRadius: '12px' }}>Estoque</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: '#111827' }}>
                      {p.name}
                      {p.badge && <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold', background: '#fed7aa', color: '#c2410c' }}>{p.badge}</span>}
                      {p.featured && <span style={{ marginLeft: '4px', padding: '2px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold', background: '#fef3c7', color: '#a16207' }}>⭐ Destaque</span>}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#4b5563' }}>{p.brand}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '999px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        background: p.condition === 'Novo' ? '#d1fae5' : p.condition === 'Seminovo' ? '#fed7aa' : '#e5e7eb',
                        color: p.condition === 'Novo' ? '#047857' : p.condition === 'Seminovo' ? '#c2410c' : '#374151',
                      }}>
                        {p.condition}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#ea580c' }}>
                      {formatBRL(p.price)}
                    </td>
                    <td style={{ padding: '12px 16px', color: '#4b5563' }}>
                      {p.storage} • {p.stock} un.
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div style={{ marginTop: '32px', background: 'linear-gradient(135deg, #f97316, #ea580c)', borderRadius: '24px', padding: '32px', color: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>💡 Como editar produtos?</h3>
          <p style={{ color: '#fed7aa' }}>Por enquanto, me chame aqui e eu mudo pra você! Em breve terá botões aqui mesmo.</p>
        </div>
      </main>
    </div>
  );
}