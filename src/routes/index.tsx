import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgePercent, Check, Heart, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

import coposInox from "@/assets/copos-inox.jpg";
import kitFerramentas from "@/assets/kit-ferramentas.jpg";
import canetaDepiladora from "@/assets/caneta-depiladora.jpg";

const HERO_IMAGE = "https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Saliions Promo | Achadinhos selecionados para o dia a dia" },
      { name: "description", content: "Ofertas e achadinhos de casa, beleza, pets, áudio e ferramentas. Escolha, veja os detalhes e pague direto na página do vendedor." },
      { property: "og:title", content: "Saliions Promo | Achadinhos selecionados para o dia a dia" },
      { property: "og:description", content: "Boas escolhas, preços melhores: ofertas de casa, beleza, pets, tecnologia e muito mais." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: HERO_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: HERO_IMAGE },
    ],
  }),
  component: Index,
});

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  details: string[];
  image: string;
  paymentUrl?: string;
  price?: number;
  originalPrice?: number;
  badge: string;
};

const products: Product[] = [
  { id: 1, name: "Mini Aspirador Automotivo Portátil", price: 49.99, originalPrice: 79.99, category: "Automotivo", description: "Ajude a manter o interior do carro limpo com um aspirador compacto e sem fio, ideal para poeira e pequenas sujeiras em bancos, tapetes, frestas e painéis.", details: ["Portátil e recarregável", "Para frestas, estofados e tapetes", "Entrada informada: DC 5 V / 1–2 A", "Produto ilustrativo; confirme os acessórios com o vendedor"], image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/e3s5SpnqjSMG", badge: "PRATICIDADE" },
  { id: 2, name: "Conjunto com 10 Copos de Inox 175 ml", price: 109.95, originalPrice: 139.95, category: "Casa e cozinha", description: "Conjunto de copos em aço inox com acabamento hexagonal martelado e parede dupla, uma opção elegante para servir café, chá e outras bebidas.", details: ["10 copos em aço inox", "Capacidade: 175 ml cada", "Altura: 8,5 cm", "Boca: 6,5 cm; base: 5,5 cm"], image: coposInox, paymentUrl: "https://pay.kaiross.com.br/2KXXPAtSF7C1", badge: "KIT COM 10" },
  { id: 3, name: "Jogo de Ferramentas com 46 Peças e Maleta", price: 59.95, originalPrice: 89.95, category: "Ferramentas", description: "Kit compacto para pequenos reparos e tarefas do dia a dia, com soquetes, bits, catraca, extensões e acessórios organizados em uma maleta.", details: ["45 ferramentas e 1 maleta", "Encaixe informado: 1/4 polegada", "Maleta: 24 × 13 × 5 cm", "Material informado: aço e termoplástico"], image: kitFerramentas, paymentUrl: "https://pay.kaiross.com.br/qVSEg6zQPlds", badge: "46 PEÇAS" },
  { id: 4, name: "Escova Secadora para Pets AJ-U07", price: 62.95, originalPrice: 92.95, category: "Pets", description: "Escova secadora 2 em 1 que combina escovação e secagem para ajudar nos cuidados com cães e gatos.", details: ["Cerdas com pontas protegidas, conforme descrição", "Medidas informadas: 12 × 23 cm", "Voltagem informada: 110 V — não bivolt", "Use com cuidado e siga as instruções do fabricante"], image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/smydxoUcFkjr", badge: "CUIDADO PET" },
  { id: 5, name: "Kit com 2 Joelheiras de Compressão", price: 35.95, originalPrice: 65.95, category: "Esporte e bem-estar", description: "Joelheiras elásticas para suporte e compressão durante atividades cotidianas ou exercícios, conforme a necessidade individual.", details: ["Kit com 2 unidades", "Cores: verde e preto", "Tamanho único informado", "Medidas informadas: 27 × 17 cm; confira o ajuste antes de comprar"], image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/kAKhwrn5cqaj", badge: "KIT COM 2" },
  { id: 6, name: "Câmera Lâmpada Wi-Fi 360° Full HD", price: 142.79, originalPrice: 172.79, category: "Eletrônicos e segurança", description: "Câmera em formato de lâmpada com conectividade Wi-Fi, visualização remota e recursos de monitoramento descritos pelo fornecedor.", details: ["Resolução anunciada: 1080p / 2 MP", "Wi-Fi 2,4 GHz", "Movimento informado: 355° horizontal / 100° vertical", "MicroSD até 128 GB informado; proteção IP44", "Confirme compatibilidade e requisitos do aplicativo"], image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/ilnB3FsAZPj9", badge: "CASA CONECTADA" },
  { id: 7, name: "Caixa de Som Boombox 3 Preta", price: 269.95, originalPrice: 299.95, category: "Áudio", description: "Caixa de som portátil de visual robusto para ouvir música em casa ou em encontros. Confira a versão exata e os recursos disponíveis antes da compra.", details: ["Bluetooth 5.1 informado", "Alimentação informada: 100–240 V", "Autonomia anunciada na descrição: cerca de 5 horas", "Cartão SD, USB e rádio FM precisam ser confirmados para a versão ofertada", "Não presumimos que seja produto original de uma marca específica"], image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/MIfgAsPIQXbt", badge: "SOM PORTÁTIL" },
  { id: 8, name: "Kit com 2 Rádios Comunicadores BF-777S", price: 119.95, originalPrice: 149.95, category: "Eletrônicos", description: "Par de rádios comunicadores portáteis para comunicação em atividades ao ar livre, trabalho e passeios, sujeito às regras locais de uso de radiofrequência.", details: ["Kit com 2 rádios e acessórios descritos", "16 canais informados", "Bateria informada: 1500 mAh", "Alcance real varia conforme terreno e obstáculos", "Verifique homologação e regras aplicáveis da Anatel"], image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/wBKPbcay4IEZ", badge: "KIT COM 2" },
  { id: 9, name: "Robô Aspirador de Pó Recarregável", price: 99.95, originalPrice: 129.95, category: "Casa e limpeza", description: "Robô compacto para ajudar na manutenção diária de poeira e sujeiras leves, com perfil baixo para alcançar alguns espaços sob móveis.", details: ["Potência informada: 18 W; sucção anunciada: 2800 Pa", "Depósito de pó: 0,3 L", "Bateria: 1200 mAh; autonomia anunciada de até 60 min", "Tempo de carga informado: 4 horas", "Dimensões: 30 × 30 × 7,8 cm", "Voltagem informada: 110 V"], image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/tYqxcMAI4lDS", badge: "LIMPEZA PRÁTICA" },
  { id: 10, name: "Mini Calibrador Compressor Elétrico Portátil", price: 119.99, originalPrice: 149.99, category: "Automotivo", description: "Bomba de ar portátil recarregável para ajudar a calibrar pneus e inflar itens compatíveis durante viagens ou no uso diário.", details: ["Potência informada: 50 W; corrente: 10 A", "Fluxo de ar anunciado: 25 L/min", "Alimentação USB-C, 5 V", "Quatro modos informados: carro, bicicleta, veículo elétrico e bola", "Dimensões aproximadas: 13,7 × 8,9 × 4,7 cm", "Confirme pressão máxima e compatibilidade antes do uso"], image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/HI2hG38Byctr", badge: "PORTÁTIL" },
  { id: 11, name: "Caneta Depiladora Elétrica para Sobrancelhas", price: 35.99, originalPrice: 65.99, category: "Beleza e cuidados", description: "Mini depilador facial em formato de caneta, com luz LED integrada para ajudar a visualizar os pelos durante o cuidado com a região das sobrancelhas.", details: ["Recarregável por USB", "Luz LED na ponta", "Potência informada: 2 W", "Autonomia anunciada: até 45 minutos", "Tempo de carga informado: 8 horas", "Cores sortidas conforme disponibilidade"], image: canetaDepiladora, paymentUrl: "https://pay.kaiross.com.br/a7biEuF1r3NB", badge: "BELEZA PRÁTICA" },
  { id: 12, name: "Fone de Ouvido Bluetooth P9 AIR", price: 44.99, originalPrice: 74.99, category: "Áudio", description: "Fone sem fio estilo over-ear com controles integrados para músicas e chamadas. As especificações são as anunciadas pelo fornecedor; confirme os recursos exatos da versão antes da compra.", details: ["Bluetooth sem fio; alcance anunciado de até 10 m (a descrição também menciona 15 m)", "Bateria informada: 400 mAh; reprodução anunciada de até 10 horas", "Tempo de carregamento informado: cerca de 2 horas", "Alto-falantes de 40 mm; sensibilidade informada: 105 ± 3 dB", "Microfone integrado e suporte a cartão TF anunciados", "Carregamento USB; cabo USB incluído", "Cancelamento de ruído ativo não confirmado — confira com o vendedor"], image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/oJUbV5vtwS13", badge: "ÁUDIO SEM FIO" },
];

const categories = ["Todos", ...Array.from(new Set(products.map((product) => product.category)))];

const benefits = [
  { icon: Truck, title: "Envio a consultar", text: "Consulte as condições do vendedor" },
  { icon: ShieldCheck, title: "Compra segura", text: "Confira os detalhes de cada produto" },
  { icon: Check, title: "Compra direta", text: "Pagamento na página do vendedor" },
];

const extraPhotos = [
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80",
];

function Index() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    (product.name + " " + product.description + " " + product.category).toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR"))
  ), [category, search]);

  const toggle = (list: number[], id: number) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setSelectedImage(product.image);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div id="inicio" className="min-h-screen bg-surface font-sans text-foreground">
      <header className="sticky top-0 z-30 bg-brand">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 pt-3 sm:gap-4">
          <a href="#inicio" className="flex shrink-0 items-center gap-2.5 text-brand-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-citron text-citron-foreground"><ShoppingBag size={19} /></span>
            <span className="hidden leading-none sm:block"><span className="block font-display text-xl font-extrabold tracking-tight">saliions</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.35em] text-citron">promo</span></span>
          </a>
          <label className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-background py-1.5 pl-4 pr-1.5 shadow-lg shadow-black/10">
            <Search size={18} className="shrink-0 text-muted-foreground" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos, marcas e muito mais..." className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground" />
            <span className="hidden shrink-0 rounded-full bg-primary px-4 py-2 text-xs font-bold text-primary-foreground sm:block">Buscar</span>
          </label>
          <div className="hidden shrink-0 items-center gap-1.5 rounded-full border border-brand-foreground/20 px-3 py-2 text-sm font-semibold text-brand-foreground md:flex"><Heart size={16} className="text-citron" fill={favorites.length ? "currentColor" : "none"} /> {favorites.length}</div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none]">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${category === item ? "bg-citron text-citron-foreground" : "border border-brand-foreground/20 text-brand-foreground/75 hover:border-citron/60 hover:text-brand-foreground"}`}
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      <main>
        <section className="mx-auto max-w-6xl px-4 pt-6">
          <div className="relative overflow-hidden rounded-3xl bg-brand">
            <img src={HERO_IMAGE} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand via-brand/90 to-brand/40" />
            <div className="relative px-6 py-10 sm:px-10 sm:py-14">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-citron px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-citron-foreground"><BadgePercent size={13} /> Ofertas do dia</span>
              <h1 className="mt-4 max-w-lg font-display text-3xl font-bold leading-[1.05] text-brand-foreground sm:text-5xl">Boas escolhas, preços melhores</h1>
              <p className="mt-3 max-w-sm text-sm text-brand-foreground/70 sm:text-base">Achadinhos para casa, beleza, pets, tecnologia e muito mais.</p>
              <a href="#produtos" className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Ver ofertas <ArrowRight size={16} /></a>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-6xl px-4 pt-5">
          <div className="grid gap-3 sm:grid-cols-3">
            {benefits.map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon size={18} /></span>
                <span><strong className="block text-sm font-semibold">{title}</strong><span className="text-xs text-muted-foreground">{text}</span></span>
              </div>
            ))}
          </div>
        </section>

        <section id="produtos" className="mx-auto max-w-6xl px-4 py-8">
          {selectedProduct ? (
            <div className="rounded-3xl border border-border bg-card p-4 sm:p-6">
              <button onClick={() => { setSelectedProduct(null); setSelectedImage(""); }} className="mb-5 inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-semibold text-primary transition hover:bg-primary/5"><ArrowLeft size={18} /> Voltar para os produtos</button>
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <div className="overflow-hidden rounded-2xl border border-border bg-background">
                    <img src={selectedImage || selectedProduct.image} alt={selectedProduct.name + " — foto ilustrativa"} width={1024} height={1024} className="aspect-square w-full object-contain sm:max-h-[520px]" />
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[selectedProduct.image, ...extraPhotos].map((photo, index) => <button key={photo + index} onClick={() => setSelectedImage(photo)} className={`overflow-hidden rounded-xl border-2 ${(selectedImage || selectedProduct.image) === photo ? "border-citron" : "border-border"}`} aria-label={`Ver foto ilustrativa ${index + 1}`}><img src={photo} alt="" loading="lazy" width={500} height={500} className="aspect-square w-full object-cover" /></button>)}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Fotos ilustrativas para visualização. Confirme as imagens reais do modelo com o vendedor.</p>
                </div>
                <div>
                  <span className="inline-block rounded-full bg-citron px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-citron-foreground">{selectedProduct.badge}</span>
                  <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">{selectedProduct.category}</p>
                  <h2 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">{selectedProduct.name}</h2>
                  {selectedProduct.price !== undefined && <div className="mt-3 flex flex-wrap items-baseline gap-3"><span className="text-sm text-muted-foreground line-through">{(selectedProduct.originalPrice ?? selectedProduct.price + 30).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span><span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-800">OFERTA</span><p className="font-display text-3xl font-bold text-primary">{selectedProduct.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p></div>}
                  <p className="mt-4 leading-relaxed text-foreground/80">{selectedProduct.description}</p>
                  <h3 className="mt-6 font-display text-lg font-semibold">Informações completas</h3>
                  <ul className="mt-3 space-y-3">{selectedProduct.details.map((detail) => <li key={detail} className="flex gap-2 text-sm text-foreground/80"><Check size={17} className="mt-0.5 shrink-0 text-primary" /><span>{detail}</span></li>)}</ul>
                  <div className="mt-7 rounded-2xl bg-surface p-4"><p className="text-sm font-semibold">Compra e entrega</p><p className="mt-1 text-sm text-muted-foreground">Preço, pagamento, disponibilidade e condições de entrega são apresentados pelo vendedor na página de compra.</p>
                    {selectedProduct.paymentUrl ? <a href={selectedProduct.paymentUrl} target="_blank" rel="noreferrer" className="mt-4 block w-full rounded-full bg-primary px-4 py-3 text-center font-semibold text-primary-foreground transition hover:bg-primary/90">Comprar agora <ArrowRight className="ml-1 inline" size={17} /></a> : <button disabled className="mt-4 w-full rounded-full bg-secondary px-4 py-3 text-muted-foreground">Em breve</button>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-2xl font-bold tracking-tight">Ofertas para você</h2>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">{visibleProducts.length} produtos</span>
              </div>
              {visibleProducts.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => (
                <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative bg-background">
                    <button onClick={() => openProduct(product)} className="block w-full" aria-label={"Ver informações de " + product.name}><img src={product.image} alt={product.name + " — imagem ilustrativa"} loading="lazy" width={1024} height={1024} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" /></button>
                    <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-citron px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-citron-foreground">{product.badge}</span>
                    <button onClick={() => setFavorites((c) => toggle(c, product.id))} className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary shadow transition hover:bg-background" aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{product.category}</p>
                    <button onClick={() => openProduct(product)} className="text-left font-display text-[15px] font-semibold leading-snug transition group-hover:text-primary">{product.name}</button>
                    {product.price !== undefined && <div className="mt-1 flex flex-wrap items-baseline gap-2"><span className="text-xs text-muted-foreground line-through">{(product.originalPrice ?? product.price + 30).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</span><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">OFERTA</span><p className="font-display text-xl font-bold text-primary">{product.price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</p></div>}
                    <p className="line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-semibold text-success"><Truck size={14} /> Envio a consultar</span>
                    <div className="mt-3 grid gap-2">
                      <button onClick={() => openProduct(product)} className="w-full rounded-full border border-primary/25 px-3 py-2 text-xs font-semibold text-primary transition hover:bg-primary/5">Ver detalhes completos</button>
                      {product.paymentUrl ? <a href={product.paymentUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="block w-full rounded-full bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Comprar agora</a> : <button disabled className="w-full rounded-full bg-secondary px-3 py-2.5 text-sm text-muted-foreground">Em breve</button>}
                    </div>
                  </div>
                </article>
              ))}</div> : <div className="mt-5 rounded-2xl border border-border bg-card px-6 py-16 text-center"><Search size={28} className="mx-auto text-muted-foreground" /><h3 className="mt-3 font-display text-lg font-semibold">Nenhum produto encontrado</h3><button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-3 text-sm font-semibold text-primary hover:underline">Limpar filtros</button></div>}
              <p className="mt-6 text-xs text-muted-foreground">Imagens ilustrativas. Especificações podem variar conforme a versão do produto. Pagamento realizado em página externa do vendedor.</p>
            </>
          )}
        </section>
      </main>

      <footer className="bg-brand"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-brand-foreground/60 md:flex-row md:justify-between"><span>© {new Date().getFullYear()} Saliions Promo. Todos os direitos reservados.</span><a href="#inicio" className="font-semibold text-citron hover:underline">Voltar ao topo ↑</a></div></footer>
    </div>
  );
}
