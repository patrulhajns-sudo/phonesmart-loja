'use client';

import { useState } from 'react';
import { products } from '@/data/products';
import { Shield, Smartphone, Check } from 'lucide-react';

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState('');

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
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-6">
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-2xl">
          <Shield className="mx-auto text-orange-500 mb-6" size={48} />
          <h1 className="text-3xl font-bold text-white mb-2">Painel da Loja</h1>
          <p className="text-gray-400 mb-8">Área restrita. Informe a senha.</p>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Senha"
              className="w-full px-6 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 transition-colors text-center"
            />
            <button
              type="submit"
              className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all"
            >
              Entrar no painel
            </button>
          </form>
          {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}
          <a href="/" className="text-gray-500 text-sm mt-6 inline-block hover:text-white transition-colors">← Voltar para a loja</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-black to-gray-900 text-white py-8">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center">
              <Smartphone size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold">PHONE<span className="text-orange-500">SMART</span></span>
          </div>
          <h1 className="text-3xl font-bold">Painel da Loja</h1>
          <p className="text-gray-400">Produtos e pedidos</p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl p-6 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Produtos Cadastrados ({products.length})</h2>
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-4 py-3 rounded-tl-xl">Nome</th>
                <th className="px-4 py-3">Marca</th>
                <th className="px-4 py-3">Condição</th>
                <th className="px-4 py-3">Preço</th>
                <th className="px-4 py-3 rounded-tr-xl">Estoque</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b hover:bg-orange-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{p.name}</td>
                  <td className="px-4 py-3 text-gray-600 capitalize">{p.brand}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${p.condition === 'novo' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-600'}`}>
                      {p.condition}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-bold text-orange-600">R$ {p.price.toLocaleString('pt-BR')}</td>
                  <td className="px-4 py-3 text-gray-600">{p.storage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold mb-2">Como editar produtos?</h3>
          <p className="text-orange-100 mb-4">Abra o arquivo no seu computador:</p>
          <code className="bg-black/30 px-4 py-2 rounded-lg text-sm block mb-4">Documentos/phonesmart/src/data/products.ts</code>
          <p className="text-sm text-orange-200">Edite os preços, depois salve, comite no GitHub Desktop e dê Push. O site atualiza sozinho!</p>
        </div>
      </main>
    </div>
  );
}