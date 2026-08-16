import Link from "next/link";
import { loginAction } from "@/app/admin/actions";

export function AdminLogin({ error }: { error: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-16">
      <div className="w-full max-w-sm rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
        <div className="flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-orange-500 text-xl font-black text-black">
            P
          </span>
          <span className="text-lg font-black text-white">
            PHONE<span className="text-orange-500">SMART</span>
          </span>
        </div>

        <h1 className="mt-6 text-2xl font-black text-white">Painel da loja</h1>
        <p className="mt-1 text-sm text-neutral-400">
          Área restrita. Informe a senha para ver os pedidos e as ordens de serviço.
        </p>

        <form action={loginAction} className="mt-6">
          <label className="text-sm font-bold text-neutral-300">
            Senha
            <input
              type="password"
              name="password"
              required
              autoFocus
              placeholder="••••••••"
              className="mt-1 h-12 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-4 font-normal text-white outline-none focus:border-orange-500"
            />
          </label>

          {error && (
            <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-400">
              Senha incorreta. Tente novamente.
            </p>
          )}

          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-orange-500 py-3 font-black text-black transition hover:bg-orange-400"
          >
            Entrar no painel
          </button>
        </form>

        <Link
          href="/"
          className="mt-5 block text-center text-sm text-neutral-500 hover:text-orange-500"
        >
          ← Voltar para a loja
        </Link>
      </div>
    </div>
  );
}
