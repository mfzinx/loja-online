import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgePercent, Check, Heart, Search, ShieldCheck, ShoppingBag, Truck } from "lucide-react";

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
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const visibleProducts = useMemo(() => products.filter((product) =>
    (category === "Todos" || product.category === category) &&
    (product.name + " " + product.description + " " + product.category).toLocaleLowerCase("pt-BR").includes(search.toLocaleLowerCase("pt-BR"))
  ), [category, search]);

  const toggle = (list: number[], id: number) => list.includes(id) ? list.filter((x) => x !== id) : [...list, id];

  return (
    <div id="inicio" className="min-h-screen bg-surface text-foreground">
      <header className="sticky top-0 z-30 bg-brand shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <a href="#inicio" className="flex shrink-0 items-center gap-2 text-brand-foreground">
            <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-foreground/80 bg-background"><ShoppingBag size={20} className="text-link" /></span>
            <span className="hidden leading-tight sm:block"><span className="block text-lg font-extrabold">saliions</span><span className="block text-xs font-semibold">promo</span></span>
          </a>
          <label className="flex flex-1 items-center rounded-sm bg-background shadow">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar produtos, marcas e muito mais..." className="min-w-0 flex-1 bg-transparent px-4 py-2.5 text-sm outline-none placeholder:text-muted-foreground" />
            <span className="border-l border-border px-3 text-muted-foreground"><Search size={18} /></span>
          </label>
          <div className="hidden items-center gap-1 text-sm text-brand-foreground md:flex"><Heart size={18} /> {favorites.length}</div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-5 overflow-x-auto px-4 pb-2 text-sm text-brand-foreground/80">
          {categories.map((item) => <button key={item} onClick={() => setCategory(item)} className={`whitespace-nowrap hover:text-brand-foreground ${category === item ? "font-bold text-brand-foreground" : ""}`}>{item}</button>)}
        </nav>
      </header>

      <main>
        <section className="bg-gradient-to-b from-brand/40 to-surface">
          <div className="mx-auto max-w-6xl px-4 pt-6">
            <div className="relative overflow-hidden rounded-md bg-link text-primary-foreground">
              <img src="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=1600&q=80" alt="Ofertas Saliions Promo" className="absolute inset-0 h-full w-full object-cover opacity-30" />
              <div className="relative px-6 py-10 sm:px-12 sm:py-14">
                <span className="inline-flex items-center gap-1 rounded-sm bg-brand px-2 py-1 text-xs font-bold text-brand-foreground"><BadgePercent size={14} /> OFERTAS DO DIA</span>
                <h1 className="mt-3 max-w-xl text-3xl font-bold sm:text-5xl">Boas escolhas, preços melhores</h1>
                <p className="mt-2 max-w-md text-sm sm:text-base">Achadinhos para casa, beleza, pets, tecnologia e muito mais.</p>
                <a href="#produtos" className="mt-5 inline-flex items-center gap-2 rounded-md bg-background px-5 py-2.5 text-sm font-semibold text-link hover:bg-secondary">Ver ofertas <ArrowRight size={16} /></a>
              </div>
            </div>
          </div>
        </section>

        <section id="beneficios" className="mx-auto max-w-6xl px-4 pt-6">
          <div className="grid gap-px overflow-hidden rounded-md bg-border shadow-sm sm:grid-cols-3">
            {[[Truck, "Envio a consultar", "Consulte as condições do vendedor"], [ShieldCheck, "Compra segura", "Confira os detalhes de cada produto"], [Check, "Compra direta", "Pagamento na página do vendedor"]].map(([Icon, t, d]) => { const I = Icon as typeof Truck; return (
              <div key={t as string} className="flex items-center gap-3 bg-card p-4"><I size={28} className="text-link" /><span><strong className="block text-sm">{t as string}</strong><span className="text-xs text-muted-foreground">{d as string}</span></span></div>
            ); })}
          </div>
        </section>

        <section id="produtos" className="mx-auto max-w-6xl px-4 py-8">
          {selectedProduct ? (
            <div className="rounded-lg bg-card p-4 shadow-sm sm:p-6">
              <button onClick={() => { setSelectedProduct(null); setSelectedImage(""); }} className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-link hover:underline"><ArrowLeft size={18} /> Voltar para os produtos</button>
              <div className="grid gap-7 md:grid-cols-2">
                <div>
                  <div className="overflow-hidden rounded-lg border border-border bg-background">
                    <img src={selectedImage || selectedProduct.image} alt={selectedProduct.name + " — foto ilustrativa"} className="aspect-square w-full object-contain sm:max-h-[520px]" />
                  </div>
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {[selectedProduct.image,
                      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=500&q=80",
                      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
                      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=500&q=80"
                    ].map((photo, index) => <button key={photo + index} onClick={() => setSelectedImage(photo)} className={`overflow-hidden rounded-md border-2 ${(selectedImage || selectedProduct.image) === photo ? "border-link" : "border-border"}`} aria-label={`Ver foto ilustrativa ${index + 1}`}><img src={photo} alt="" className="aspect-square w-full object-cover" /></button>)}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">Fotos ilustrativas para visualização. Confirme as imagens reais do modelo com o vendedor.</p>
                </div>
                <div>
                  <span className="inline-block rounded-sm bg-link px-2 py-1 text-xs font-bold text-primary-foreground">{selectedProduct.badge}</span>
                  <p className="mt-3 text-sm text-muted-foreground">{selectedProduct.category}</p>
                  <h2 className="mt-1 text-2xl font-bold leading-tight sm:text-3xl">{selectedProduct.name}</h2>
                  <p className="mt-4 leading-relaxed text-foreground/80">{selectedProduct.description}</p>
                  <h3 className="mt-6 text-lg font-semibold">Informações completas</h3>
                  <ul className="mt-3 space-y-3">{selectedProduct.details.map((detail) => <li key={detail} className="flex gap-2 text-sm text-foreground/80"><Check size={17} className="mt-0.5 shrink-0 text-link" /><span>{detail}</span></li>)}</ul>
                  <div className="mt-7 rounded-md bg-surface p-4"><p className="text-sm font-semibold">Compra e entrega</p><p className="mt-1 text-sm text-muted-foreground">Preço, pagamento, disponibilidade e condições de entrega são apresentados pelo vendedor na página de compra.</p>
                    {selectedProduct.paymentUrl ? <a href={selectedProduct.paymentUrl} target="_blank" rel="noreferrer" className="mt-4 block w-full rounded-md bg-primary px-4 py-3 text-center font-semibold text-primary-foreground hover:opacity-90">Comprar agora <ArrowRight className="ml-1 inline" size={17} /></a> : <button disabled className="mt-4 w-full rounded-md bg-secondary px-4 py-3 text-muted-foreground">Em breve</button>}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-baseline gap-3"><h2 className="text-2xl font-normal text-foreground/80">Ofertas para você</h2><span className="text-sm text-link">{visibleProducts.length} produtos</span></div>
              {visibleProducts.length ? <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">{visibleProducts.map((product) => (
                <article key={product.id} className="group flex cursor-pointer flex-col overflow-hidden rounded-md bg-card shadow-sm transition hover:shadow-lg">
                  <div className="relative border-b border-border bg-card p-3">
                    <button onClick={() => { setSelectedProduct(product); setSelectedImage(product.image); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="block w-full" aria-label={"Ver informações de " + product.name}><img src={product.image} alt={product.name + " — imagem ilustrativa"} loading="lazy" className="aspect-square w-full rounded object-cover transition group-hover:scale-[1.02]" /></button>
                    <button onClick={() => setFavorites((c) => toggle(c, product.id))} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-link opacity-90 shadow" aria-label={favorites.includes(product.id) ? "Remover dos favoritos" : "Adicionar aos favoritos"}><Heart size={16} fill={favorites.includes(product.id) ? "currentColor" : "none"} /></button>
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <span className="w-fit rounded-sm bg-link px-1.5 py-0.5 text-[10px] font-bold text-primary-foreground">{product.badge}</span>
                    <button onClick={() => { setSelectedProduct(product); setSelectedImage(product.image); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mt-2 text-left text-sm font-normal leading-snug text-foreground/90 hover:text-link">{product.name}</button>
                    <span className="mt-1 text-xs text-muted-foreground">{product.category}</span>
                    <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-success"><Truck size={14} /> Envio a consultar</span>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">{product.description}</p>
                    <div className="mt-auto pt-4"><button onClick={() => { setSelectedProduct(product); setSelectedImage(product.image); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="mb-2 w-full rounded-md border border-link px-3 py-2 text-sm font-semibold text-link hover:bg-link/10">Ver detalhes completos</button>{product.paymentUrl ? <a href={product.paymentUrl} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} className="block w-full rounded-md bg-primary px-3 py-2.5 text-center text-sm font-semibold text-primary-foreground hover:opacity-90">Comprar agora</a> : <button disabled className="w-full rounded-md bg-secondary px-3 py-2.5 text-sm text-muted-foreground">Em breve</button>}</div>
                  </div>
                </article>
              ))}</div> : <div className="mt-4 rounded-md bg-card px-6 py-16 text-center shadow-sm"><Search size={28} className="mx-auto text-muted-foreground" /><h3 className="mt-3 text-lg font-semibold">Nenhum produto encontrado</h3><button onClick={() => { setSearch(""); setCategory("Todos"); }} className="mt-3 text-sm text-link hover:underline">Limpar filtros</button></div>}
              <p className="mt-6 text-xs text-muted-foreground">Imagens ilustrativas. Especificações podem variar conforme a versão do produto. Pagamento realizado em página externa do vendedor.</p>
            </>
          )}
        </section>
      </main>

      <footer className="border-t border-border bg-card"><div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-muted-foreground md:flex-row md:justify-between"><span>© {new Date().getFullYear()} Saliions Promo. Todos os direitos reservados.</span><a href="#inicio" className="text-link hover:underline">Voltar ao topo ↑</a></div></footer>
    </div>
  );
}
