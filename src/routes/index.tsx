import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight, BadgePercent, Check, ChevronDown, Heart, Menu, PackageCheck,
  Search, ShieldCheck, ShoppingBag, Sparkles, Truck, X, Plus, Minus,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice: number;
  badge: string;
  image: string;
  rating: string;
};

const products: Product[] = [
  { id: 1, name: "Fone Bluetooth Pro", category: "Eletrônicos", price: 89.9, oldPrice: 149.9, badge: "MAIS VENDIDO", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", rating: "4.9" },
  { id: 2, name: "Relógio Minimalista", category: "Acessórios", price: 119.9, oldPrice: 189.9, badge: "OFERTA", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85", rating: "4.8" },
  { id: 3, name: "Óculos Urban Style", category: "Acessórios", price: 49.9, oldPrice: 89.9, badge: "−44%", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85", rating: "4.7" },
  { id: 4, name: "Bolsa Everyday", category: "Moda", price: 79.9, oldPrice: 129.9, badge: "OFERTA", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=900&q=85", rating: "4.9" },
  { id: 5, name: "Garrafa Térmica", category: "Casa", price: 39.9, oldPrice: 69.9, badge: "−43%", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=85", rating: "4.8" },
  { id: 6, name: "Tênis Casual", category: "Moda", price: 139.9, oldPrice: 219.9, badge: "QUERIDINHO", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85", rating: "4.9" },
  { id: 7, name: "Luminária de Mesa", category: "Casa", price: 64.9, oldPrice: 99.9, badge: "OFERTA", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85", rating: "4.6" },
  { id: 8, name: "Mini Speaker", category: "Eletrônicos", price: 59.9, oldPrice: 99.9, badge: "−40%", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85", rating: "4.8" },
];

const categories = ["Todos", "Eletrônicos", "Acessórios", "Moda", "Casa"];
const money = (value: number) => value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function Index() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<number, number>>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [notice, setNotice] = useState("");

  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    product.name.toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR"))
  ), [category, search]);

  const cartCount = Object.values(cart).reduce((sum, count) => sum + count, 0);
  const cartItems = products.filter((product) => (cart[product.id] || 0) > 0);
  const cartTotal = cartItems.reduce((sum, product) => sum + product.price * cart[product.id], 0);

  function addToCart(product: Product) {
    setCart((current) => ({ ...current, [product.id]: (current[product.id] || 0) + 1 }));
    setNotice(product.name + " adicionado ao carrinho!");
    window.setTimeout(() => setNotice(""), 2200);
  }

  function changeQuantity(id: number, amount: number) {
    setCart((current) => {
      const next = { ...current, [id]: (current[id] || 0) + amount };
      if (next[id] <= 0) delete next[id];
      return next;
    });
  }

  return (
    <div className="store-shell min-h-screen bg-white text-slate-950">
      <div className="bg-slate-950 px-4 py-2.5 text-center text-xs font-medium tracking-wide text-white sm:text-sm">
        <span className="inline-flex items-center justify-center gap-2"><Sparkles size={14} className="text-amber-300" /> OFERTAS QUE VALEM A PENA — até 50% OFF em produtos selecionados <ArrowRight size={14} /></span>
      </div>

      <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <button className="flex items-center gap-2 text-left" onClick={() => { setCategory("Todos"); setSearch(""); window.scrollTo({ top: 0, behavior: "smooth" }); }} aria-label="Ir para o início">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-400 text-slate-950"><ShoppingBag size={21} strokeWidth={2.5} /></span>
            <span><span className="block text-xl font-black leading-none tracking-tight">saliions<span className="text-amber-500">.</span></span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-slate-500">promo</span></span>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-600 md:flex">
            <a href="#ofertas" className="transition hover:text-amber-600">Ofertas</a>
            <a href="#produtos" className="transition hover:text-amber-600">Produtos</a>
            <a href="#beneficios" className="transition hover:text-amber-600">Por que comprar aqui?</a>
          </nav>

          <div className="flex items-center gap-2">
            <label className="hidden items-center gap-2 rounded-full bg-slate-100 px-4 py-2.5 lg:flex">
              <Search size={17} className="text-slate-400" />
              <input value={search} onChange={(event) => { setSearch(event.target.value); document.getElementById("produtos")?.scrollIntoView({ behavior: "smooth" }); }} placeholder="Buscar produtos..." className="w-36 bg-transparent text-sm outline-none placeholder:text-slate-400 xl:w-48" />
            </label>
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-full p-2.5 hover:bg-slate-100 md:hidden" aria-label="Abrir menu"><Menu size={21} /></button>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 rounded-full bg-slate-950 px-3.5 py-2.5 text-sm font-bold text-white transition hover:bg-amber-500 hover:text-slate-950 sm:px-4" aria-label="Abrir carrinho">
              <ShoppingBag size={18} /><span className="hidden sm:inline">Carrinho</span>
              {cartCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-400 px-1 text-[11px] font-black text-slate-950">{cartCount}</span>}
            </button>
          </div>
        </div>
        {menuOpen && <div className="border-t border-slate-100 px-5 py-4 md:hidden"><div className="grid gap-3 text-sm font-semibold"><a href="#ofertas" onClick={() => setMenuOpen(false)}>Ofertas</a><a href="#produtos" onClick={() => setMenuOpen(false)}>Produtos</a><a href="#beneficios" onClick={() => setMenuOpen(false)}>Por que comprar aqui?</a><label className="flex items-center gap-2 rounded-xl bg-slate-100 px-3 py-2"><Search size={16}/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produtos..." className="w-full bg-transparent outline-none"/></label></div></div>}
      </header>

      <main>
        <section id="ofertas" className="relative overflow-hidden bg-[#f7f5f0]">
          <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/80 px-3.5 py-2 text-xs font-extrabold uppercase tracking-[0.13em] text-amber-700"><BadgePercent size={15}/> Achadinhos da semana</span>
              <h1 className="mt-6 text-4xl font-black leading-[1.04] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">Boas escolhas.<br/><span className="text-amber-500">Preços melhores.</span></h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">Produtos que facilitam seu dia a dia, estilo que combina com você e ofertas que cabem no bolso.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href="#produtos" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-slate-950/10 transition hover:-translate-y-0.5 hover:bg-amber-500 hover:text-slate-950">Ver ofertas <ArrowRight size={17}/></a>
                <a href="#beneficios" className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white/60 px-6 py-3.5 text-sm font-bold text-slate-800 transition hover:bg-white">Conheça a loja</a>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-slate-500 sm:text-sm">
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-600"/> Seleção especial</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-600"/> Preços acessíveis</span>
                <span className="inline-flex items-center gap-2"><Check size={16} className="text-emerald-600"/> Compra simples</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-xl">
              <div className="absolute -left-3 top-8 z-10 rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/10 sm:-left-7">
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.16em] text-slate-400">Ofertas de até</span>
                <span className="mt-1 block text-3xl font-black tracking-tight text-slate-950">50% <span className="text-amber-500">OFF</span></span>
              </div>
              <div className="overflow-hidden rounded-[2rem] bg-slate-200 shadow-2xl shadow-slate-900/10">
                <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=90" alt="Interior de loja moderna com produtos selecionados" className="h-[340px] w-full object-cover sm:h-[440px]" />
              </div>
              <div className="absolute -bottom-4 right-3 flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-xl shadow-slate-900/10 sm:-right-4 sm:p-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><ShoppingBag size={22}/></span>
                <span><span className="block text-sm font-extrabold text-slate-900">Seu próximo achado</span><span className="mt-0.5 block text-xs text-slate-500">está a um clique de distância</span></span>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-7xl gap-5 px-4 py-7 sm:grid-cols-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><Truck size={21}/></span><span><strong className="block text-sm font-extrabold">Entrega para você</strong><span className="text-xs text-slate-500">Consulte as opções de envio</span></span></div>
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><ShieldCheck size={21}/></span><span><strong className="block text-sm font-extrabold">Compra com tranquilidade</strong><span className="text-xs text-slate-500">Informações claras em cada etapa</span></span></div>
            <div className="flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700"><PackageCheck size={21}/></span><span><strong className="block text-sm font-extrabold">Achadinhos selecionados</strong><span className="text-xs text-slate-500">Praticidade e estilo no mesmo lugar</span></span></div>
          </div>
        </section>

        <section id="produtos" className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div><span className="text-xs font-extrabold uppercase tracking-[0.2em] text-amber-600">Escolhas que valem</span><h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">Ofertas em destaque<span className="text-amber-500">.</span></h2><p className="mt-2 text-sm text-slate-500 sm:text-base">Encontre seu próximo favorito por um preço especial.</p></div>
            <label className="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 lg:hidden"><Search size={17} className="text-slate-400"/><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar produtos..." className="min-w-0 bg-transparent text-sm outline-none"/></label>
          </div>
          <div className="mt-7 flex gap-2 overflow-x-auto pb-2">
            {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold transition ${category === item ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-600 hover:bg-amber-100 hover:text-slate-950"}`}>{item}</button>)}
          </div>

          {visibleProducts.length > 0 ? <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {visibleProducts.map((product) => <article key={product.id} className="group overflow-hidden rounded-2xl border border-slate-100 bg-white transition duration-300 hover:-translate-y-1 hover:border-amber-200 hover:shadow-xl hover:shadow-slate-900/5 sm:rounded-3xl">
              <div className="relative overflow-hidden bg-slate-100">
                <img src={product.image} alt={product.name} loading="lazy" className="aspect-[4/4.2] w-full object-cover transition duration-500 group-hover:scale-105"/>
                <span className="absolute left-2.5 top-2.5 rounded-full bg-amber-400 px-2.5 py-1.5 text-[9px] font-black tracking-wide text-slate-950 sm:left-3 sm:top-3 sm:text-[10px]">{product.badge}</span>
                <button onClick={() => setFavorites((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} className={`absolute right-2.5 top-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:scale-110 sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${favorites.includes(product.id) ? "text-rose-500" : "text-slate-600"}`} aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart size={17} fill={favorites.includes(product.id) ? "currentColor" : "none"}/></button>
              </div>
              <div className="p-3.5 sm:p-4">
                <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-xs">{product.category}</span>
                <h3 className="mt-1.5 min-h-10 text-sm font-extrabold leading-snug text-slate-900 sm:text-base">{product.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-xs text-amber-500"><span>★</span><strong className="text-slate-700">{product.rating}</strong><span className="text-slate-400">· avaliação</span></div>
                <div className="mt-3"><span className="block text-xs text-slate-400 line-through">{money(product.oldPrice)}</span><span className="mt-0.5 block text-xl font-black tracking-tight text-slate-950 sm:text-2xl">{money(product.price)}</span><span className="mt-1 block text-[10px] font-medium text-slate-500 sm:text-xs">ou consulte condições de pagamento</span></div>
                <button onClick={() => addToCart(product)} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-3 py-3 text-xs font-extrabold text-white transition hover:bg-amber-400 hover:text-slate-950 sm:text-sm"><Plus size={16}/> Adicionar ao carrinho</button>
              </div>
            </article>)}
          </div> : <div className="mt-8 rounded-3xl border border-dashed border-slate-200 px-6 py-16 text-center"><Search size={28} className="mx-auto text-slate-300"/><h3 className="mt-3 text-lg font-bold">Nenhum produto encontrado</h3><p className="mt-1 text-sm text-slate-500">Tente outra busca ou escolha uma categoria diferente.</p><button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-4 font-bold text-amber-700 underline">Limpar filtros</button></div>}
          <p className="mt-7 text-center text-xs leading-5 text-slate-400">* Produtos, valores, avaliações e descontos exibidos são exemplos demonstrativos e devem ser conferidos antes de publicar a loja.</p>
        </section>

        <section className="px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 overflow-hidden rounded-[2rem] bg-slate-950 p-7 text-white sm:p-10 md:flex-row md:items-center lg:p-14">
            <div><span className="inline-flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-400"><Sparkles size={15}/> Seu próximo achado te espera</span><h2 className="mt-3 max-w-xl text-3xl font-black tracking-tight sm:text-4xl">Comprar bem também é aproveitar.</h2><p className="mt-3 max-w-xl text-sm leading-6 text-slate-300 sm:text-base">Explore a seleção Saliions Promo e descubra produtos para deixar sua rotina ainda melhor.</p></div>
            <a href="#produtos" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-amber-400 px-6 py-3.5 text-sm font-black text-slate-950 transition hover:bg-amber-300">Explorar produtos <ArrowRight size={17}/></a>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div className="flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-400"><ShoppingBag size={18}/></span><span><strong className="block text-sm font-black">saliions promo</strong><span className="text-xs text-slate-500">Boas escolhas, preços melhores.</span></span></div>
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} Saliions Promo. Todos os direitos reservados.</p>
          <a href="#ofertas" className="text-xs font-bold text-slate-600 hover:text-amber-600">Voltar ao topo ↑</a>
        </div>
      </footer>

      {notice && <div role="status" className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-2xl"><Check size={17} className="text-emerald-400"/>{notice}</div>}

      {cartOpen && <div className="fixed inset-0 z-50">
        <button aria-label="Fechar carrinho" className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px]" onClick={() => setCartOpen(false)}/>
        <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-5"><div><h2 className="text-xl font-black">Seu carrinho</h2><p className="mt-1 text-xs text-slate-500">{cartCount} {cartCount === 1 ? "item" : "itens"} selecionados</p></div><button onClick={() => setCartOpen(false)} className="rounded-full p-2 hover:bg-slate-100" aria-label="Fechar"><X size={21}/></button></div>
          <div className="flex-1 overflow-y-auto px-5 py-4">
            {cartItems.length === 0 ? <div className="flex h-full flex-col items-center justify-center text-center"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><ShoppingBag size={28}/></span><h3 className="mt-4 text-lg font-extrabold">Seu carrinho está vazio</h3><p className="mt-1 text-sm text-slate-500">Adicione produtos e eles aparecerão aqui.</p><button onClick={() => setCartOpen(false)} className="mt-5 rounded-full bg-slate-950 px-5 py-3 text-sm font-bold text-white">Explorar produtos</button></div> : <div className="space-y-5">{cartItems.map((product) => <div key={product.id} className="flex gap-3"><img src={product.image} alt={product.name} className="h-24 w-24 rounded-2xl object-cover"/><div className="min-w-0 flex-1"><h3 className="font-extrabold">{product.name}</h3><p className="mt-1 font-black">{money(product.price)}</p><div className="mt-3 inline-flex items-center gap-3 rounded-full border border-slate-200 px-2 py-1"><button onClick={() => changeQuantity(product.id, -1)} aria-label="Diminuir quantidade"><Minus size={14}/></button><span className="min-w-4 text-center text-sm font-bold">{cart[product.id]}</span><button onClick={() => changeQuantity(product.id, 1)} aria-label="Aumentar quantidade"><Plus size={14}/></button></div></div><button onClick={() => changeQuantity(product.id, -(cart[product.id] || 0))} aria-label="Remover produto" className="self-start p-1 text-slate-400 hover:text-rose-500"><X size={17}/></button></div>)}</div>}
          </div>
          {cartItems.length > 0 && <div className="border-t border-slate-100 p-5"><div className="flex items-center justify-between"><span className="text-sm text-slate-500">Subtotal</span><strong className="text-2xl font-black">{money(cartTotal)}</strong></div><p className="mt-2 text-xs leading-5 text-slate-400">Frete e pagamento serão definidos na etapa de finalização.</p><button onClick={() => setNotice("O checkout precisa ser configurado antes de receber pedidos.")} className="mt-4 w-full rounded-full bg-amber-400 px-5 py-4 text-sm font-black text-slate-950 transition hover:bg-amber-300">Continuar para finalizar <ArrowRight size={17} className="ml-1 inline"/></button></div>}
        </aside>
      </div>}
    </div>
  );
}
