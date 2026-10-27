import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BadgePercent, Check, Heart, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

export const Route = createFileRoute("/")({ component: Index });

type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  details: string[];
  image: string;
  paymentUrl?: string;
  badge: string;
};

const products: Product[] = [
  { id: 1, name: "Mini Aspirador Automotivo Portátil", category: "Automotivo", description: "Ajude a manter o interior do carro limpo com um aspirador compacto e sem fio, ideal para poeira e pequenas sujeiras em bancos, tapetes, frestas e painéis.", details: ["Portátil e recarregável", "Para frestas, estofados e tapetes", "Entrada informada: DC 5 V / 1–2 A", "Produto ilustrativo; confirme os acessórios com o vendedor"], image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/e3s5SpnqjSMG", badge: "PRATICIDADE" },
  { id: 2, name: "Conjunto com 10 Copos de Inox 175 ml", category: "Casa e cozinha", description: "Conjunto de copos em aço inox com acabamento hexagonal martelado e parede dupla, uma opção elegante para servir café, chá e outras bebidas.", details: ["10 copos em aço inox", "Capacidade: 175 ml cada", "Altura: 8,5 cm", "Boca: 6,5 cm; base: 5,5 cm"], image: "https://images.unsplash.com/photo-1514228742587-6b1558f0f93a?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/2KXXPAtSF7C1", badge: "KIT COM 10" },
  { id: 3, name: "Jogo de Ferramentas com 46 Peças e Maleta", category: "Ferramentas", description: "Kit compacto para pequenos reparos e tarefas do dia a dia, com soquetes, bits, catraca, extensões e acessórios organizados em uma maleta.", details: ["45 ferramentas e 1 maleta", "Encaixe informado: 1/4 polegada", "Maleta: 24 × 13 × 5 cm", "Material informado: aço e termoplástico"], image: "https://images.unsplash.com/photo-1581147036324-c1c89c2c8b5c?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/qVSEg6zQPlds", badge: "46 PEÇAS" },
  { id: 4, name: "Escova Secadora para Pets AJ-U07", category: "Pets", description: "Escova secadora 2 em 1 que combina escovação e secagem para ajudar nos cuidados com cães e gatos.", details: ["Cerdas com pontas protegidas, conforme descrição", "Medidas informadas: 12 × 23 cm", "Voltagem informada: 110 V — não bivolt", "Use com cuidado e siga as instruções do fabricante"], image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/smydxoUcFkjr", badge: "CUIDADO PET" },
  { id: 5, name: "Kit com 2 Joelheiras de Compressão", category: "Esporte e bem-estar", description: "Joelheiras elásticas para suporte e compressão durante atividades cotidianas ou exercícios, conforme a necessidade individual.", details: ["Kit com 2 unidades", "Cores: verde e preto", "Tamanho único informado", "Medidas informadas: 27 × 17 cm; confira o ajuste antes de comprar"], image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/kAKhwrn5cqaj", badge: "KIT COM 2" },
  { id: 6, name: "Câmera Lâmpada Wi-Fi 360° Full HD", category: "Eletrônicos e segurança", description: "Câmera em formato de lâmpada com conectividade Wi-Fi, visualização remota e recursos de monitoramento descritos pelo fornecedor.", details: ["Resolução anunciada: 1080p / 2 MP", "Wi-Fi 2,4 GHz", "Movimento informado: 355° horizontal / 100° vertical", "MicroSD até 128 GB informado; proteção IP44", "Confirme compatibilidade e requisitos do aplicativo"], image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/ilnB3FsAZPj9", badge: "CASA CONECTADA" },
  { id: 7, name: "Caixa de Som Boombox 3 Preta", category: "Áudio", description: "Caixa de som portátil de visual robusto para ouvir música em casa ou em encontros. Confira a versão exata e os recursos disponíveis antes da compra.", details: ["Bluetooth 5.1 informado", "Alimentação informada: 100–240 V", "Autonomia anunciada na descrição: cerca de 5 horas", "Cartão SD, USB e rádio FM precisam ser confirmados para a versão ofertada", "Não presumimos que seja produto original de uma marca específica"], image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/MIfgAsPIQXbt", badge: "SOM PORTÁTIL" },
  { id: 8, name: "Kit com 2 Rádios Comunicadores BF-777S", category: "Eletrônicos", description: "Par de rádios comunicadores portáteis para comunicação em atividades ao ar livre, trabalho e passeios, sujeito às regras locais de uso de radiofrequência.", details: ["Kit com 2 rádios e acessórios descritos", "16 canais informados", "Bateria informada: 1500 mAh", "Alcance real varia conforme terreno e obstáculos", "Verifique homologação e regras aplicáveis da Anatel"], image: "https://images.unsplash.com/photo-1508615070457-7baeba4003ab?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/wBKPbcay4IEZ", badge: "KIT COM 2" },
  { id: 9, name: "Robô Aspirador de Pó Recarregável", category: "Casa e limpeza", description: "Robô compacto para ajudar na manutenção diária de poeira e sujeiras leves, com perfil baixo para alcançar alguns espaços sob móveis.", details: ["Potência informada: 18 W; sucção anunciada: 2800 Pa", "Depósito de pó: 0,3 L", "Bateria: 1200 mAh; autonomia anunciada de até 60 min", "Tempo de carga informado: 4 horas", "Dimensões: 30 × 30 × 7,8 cm", "Voltagem informada: 110 V"], image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/tYqxcMAI4lDS", badge: "LIMPEZA PRÁTICA" },
  { id: 10, name: "Mini Calibrador Compressor Elétrico Portátil", category: "Automotivo", description: "Bomba de ar portátil recarregável para ajudar a calibrar pneus e inflar itens compatíveis durante viagens ou no uso diário.", details: ["Potência informada: 50 W; corrente: 10 A", "Fluxo de ar anunciado: 25 L/min", "Alimentação USB-C, 5 V", "Quatro modos informados: carro, bicicleta, veículo elétrico e bola", "Dimensões aproximadas: 13,7 × 8,9 × 4,7 cm", "Confirme pressão máxima e compatibilidade antes do uso"], image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/HI2hG38Byctr", badge: "PORTÁTIL" },
  { id: 11, name: "Caneta Depiladora Elétrica para Sobrancelhas", category: "Beleza e cuidados", description: "Mini depilador facial em formato de caneta, com luz LED integrada para ajudar a visualizar os pelos durante o cuidado com a região das sobrancelhas.", details: ["Recarregável por USB", "Luz LED na ponta", "Potência informada: 2 W", "Autonomia anunciada: até 45 minutos", "Tempo de carga informado: 8 horas", "Cores sortidas conforme disponibilidade"], image: "https://images.unsplash.com/photo-1583241800698-e8ab01830a38?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/a7biEuF1r3NB", badge: "BELEZA PRÁTICA" },
  { id: 12, name: "Fone de Ouvido Bluetooth P9 AIR", category: "Áudio", description: "Fone sem fio estilo over-ear com controles integrados para músicas e chamadas. As especificações são as anunciadas pelo fornecedor; confirme os recursos exatos da versão antes da compra.", details: ["Bluetooth sem fio; alcance anunciado de até 10 m (a descrição também menciona 15 m)", "Bateria informada: 400 mAh; reprodução anunciada de até 10 horas", "Tempo de carregamento informado: cerca de 2 horas", "Alto-falantes de 40 mm; sensibilidade informada: 105 ± 3 dB", "Microfone integrado e suporte a cartão TF anunciados", "Carregamento USB; cabo USB incluído", "Cancelamento de ruído ativo não confirmado — confira com o vendedor"], image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85", paymentUrl: "https://pay.kaiross.com.br/oJUbV5vtwS13", badge: "ÁUDIO SEM FIO" },
];

const categories = ["Todos", ...Array.from(new Set(products.map((product) => product.category)))];

function Index() {
  const [category, setCategory] = useState("Todos");
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<number[]>([]);
  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    (product.name + " " + product.description + " " + product.category).toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR"))
  ), [category, search]);

  const toggle = (list: number[], id: number) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  return (
    <div id="inicio" className="min-h-screen bg-surface text-foreground">
      <header className="sticky top-0 z-30 bg-brand text-brand-foreground shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#inicio" className="flex shrink-0 items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-citron text-brand"><ShoppingBag size={20} /></span>
            <span className="hidden font-display leading-none sm:block"><span className="block text-xl font-extrabold tracking-tight">saliions</span><span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.22em] text-citron">promo</span></span>
          </a>
          <label className="flex flex-1 items-center rounded-full bg-background text-foreground shadow-lg shadow-black/10">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos, marcas e muito mais..." className="min-w-0 flex-1 bg-transparent px-5 py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
            <span className="m-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground"><Search size={16} /></span>
          </label>
          <div className="hidden items-center gap-1.5 text-sm font-semibold md:flex"><Heart size={18} className="text-citron" /> {favorites.length}</div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 pb-3 text-sm">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap rounded-full px-3.5 py-1.5 transition ${category === item ? "bg-citron font-bold text-brand" : "bg-white/10 hover:bg-white/20"}`}>{item}</button>)}
        </nav>
      </header>

      <main>
        <section className="bg-gradient-to-b from-citron/25 to-surface">
          <div className="mx-auto max-w-6xl px-4 pt-6">
            <div className="relative overflow-hidden rounded-3xl bg-brand text-brand-foreground">
              <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80" alt="Ofertas Saliions Promo" className="absolute inset-0 h-full w-full object-cover opacity-20" />
              <div className="relative px-6 py-10 sm:px-12 sm:py-14">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-citron px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-brand"><BadgePercent size={14} /> Ofertas do dia</span>
                <h1 className="mt-4 max-w-xl font-display text-3xl font-extrabold leading-[1.05] sm:text-5xl">Boas escolhas, preços melhores</h1>
                <p className="mt-3 max-w-md text-sm text-brand-foreground/80 sm:text-base">Achadinhos para casa, beleza, pets, tecnologia e muito mais.</p>
                <a href="#produtos" className="mt-6 inline-flex items-center gap-2 rounded-full bg-citron px-6 py-3 text-sm font-bold text-brand transition hover:brightness-95">Ver ofertas <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-6xl px-4 pt-6">
          <div className="grid gap-3 sm:grid-cols-3">
            {[[Truck, "Envio a consultar", "Consulte as condições do vendedor"], [ShieldCheck, "Compra segura", "Confira os detalhes de cada produto"], [Check, "Compra direta", "Pagamento na página do vendedor"]].map(([Icon, t, d]) => { const I = Icon as typeof Truck; return (
              <div key={t as string} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4"><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"><I size={22} /></span><span><strong className="block text-sm">{t as string}</strong><span className="text-xs text-muted-foreground">{d as string}</span></span></div>
            ); })}
          </div>
        </section>

        <section id="produtos" className="mx-auto max-w-6xl px-4 py-8">
          <div className="flex items-end justify-between gap-3 border-b border-border pb-3"><h2 className="font-display text-2xl font-extrabold tracking-tight">Ofertas para você</h2><span className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{visibleProducts.length} produtos</span></div>
          {visibleProducts.length ? <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{visibleProducts.map((product) => (
            <article key={product.id} className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-xl">
              <div className="relative bg-secondary p-3">
                <img src={product.image} alt={product.name + " — imagem ilustrativa"} loading="lazy" className="aspect-[4/3] w-full rounded-xl object-cover" />
                <span className="absolute left-5 top-5 rounded-full bg-citron px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-brand">{product.badge}</span>
                <button onClick={() => setFavorites((c) => toggle(c, product.id))} className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full bg-background text-primary shadow transition hover:scale-105" aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{product.category}</span>
                <h3 className="mt-1.5 font-display text-base font-bold leading-snug">{product.name}</h3>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-success"><Truck size={14} /> Envio a consultar</span>
                <button onClick={() => setExpanded((c) => toggle(c, product.id))} className="mt-2 w-fit text-xs font-semibold text-primary hover:underline">{expanded.includes(product.id) ? "Ocultar detalhes" : "Ver detalhes"}</button>
                {expanded.includes(product.id) && <div className="mt-2 rounded-xl bg-secondary/70 p-3 text-xs text-muted-foreground"><p>{product.description}</p><ul className="mt-2 list-disc space-y-1 pl-4">{product.details.map((d) => <li key={d}>{d}</li>)}</ul></div>}
                <div className="mt-auto pt-5">{product.paymentUrl ? <a href={product.paymentUrl} target="_blank" rel="noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90">Comprar agora <ArrowRight size={15} /></a> : <button disabled className="w-full rounded-full bg-secondary px-4 py-3 text-sm text-muted-foreground">Em breve</button>}</div>
              </div>
            </article>
          ))}</div> : <div className="mt-5 rounded-3xl border border-border bg-card px-6 py-16 text-center shadow-sm"><Search size={28} className="mx-auto text-muted-foreground" /><h3 className="mt-3 font-display text-lg font-bold">Nenhum produto encontrado</h3><button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-3 text-sm font-semibold text-primary hover:underline">Limpar filtros</button></div>}
          <p className="mt-6 text-xs text-muted-foreground">Imagens ilustrativas. Especificações podem variar conforme a versão do produto. Pagamento realizado em página externa do vendedor.</p>
        </section>
      </main>

      <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:justify-between"><span>© {new Date().getFullYear()} Saliions Promo. Todos os direitos reservados.</span><a href="#inicio" className="text-link hover:underline">Voltar ao topo ↑</a></div></footer>
    </div>
  );
}
