import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import heroLinen from "@/assets/hero-linen.jpg";
import mittens from "@/assets/mittens.jpg";
import linenStack from "@/assets/linen-stack.jpg";
import hat from "@/assets/hat.jpg";
import riga from "@/assets/riga.jpg";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Linen & Souvenirs — Handcrafted Latvian Treasures in Riga" },
      { name: "description", content: "Authentic Latvian linen, hand-knit wool mittens & hats, amber and traditional souvenirs in the heart of Riga's Old Town." },
      { property: "og:title", content: "Linen & Souvenirs — Riga Old Town" },
      { property: "og:description", content: "Authentic Latvian linen and handcrafted souvenirs at Mazā Pils iela 4, Riga." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav t={t} />
      <Hero t={t} />
      <Story t={t} />
      <Collection t={t} />
      <Reviews t={t} />
      <Visit t={t} />
      <Footer t={t} />
    </div>
  );
}


function Nav({ t }: { t: (key: string) => string }) {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-wide text-primary-foreground drop-shadow">
          Linen <span className="opacity-60">&</span> Souvenirs
        </a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-primary-foreground/90">
          <a href="#story" className="hover:text-primary-foreground transition">{t("nav.story")}</a>
          <a href="#collection" className="hover:text-primary-foreground transition">{t("nav.collection")}</a>
          <a href="/blog" className="hover:text-primary-foreground transition">{t("nav.journal")}</a>
          <a href="#visit" className="hover:text-primary-foreground transition">{t("nav.visit")}</a>
        </nav>
        <div className="flex items-center gap-4">
          <LanguageSwitcher className="text-primary-foreground" />
          <a
            href="tel:+37126554999"
            className="hidden md:inline-flex items-center gap-2 text-sm text-primary-foreground border border-primary-foreground/40 rounded-full px-4 py-2 hover:bg-primary-foreground/10 transition"
          >
            +371 26 554 999
          </a>
        </div>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section className="relative min-h-[100vh] flex items-end overflow-hidden">
      <img
        src={heroLinen}
        alt="Handwoven Latvian linen"
        width={1600}
        height={1100}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/40 via-primary/10 to-primary/70" />
      <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-40 w-full">
        <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-xs mb-6">
          Since generations · Riga, Latvia
        </p>
        <h1 className="font-serif text-primary-foreground text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-4xl">
          Handwoven stories<br />from the Baltic.
        </h1>
        <p className="mt-8 max-w-xl text-primary-foreground/90 text-lg leading-relaxed">
          A small family-run boutique in the heart of Riga's Old Town, offering
          pure Latvian linen, hand-knit wool, amber and the quiet beauty of traditional craft.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#collection"
            className="bg-accent text-accent-foreground px-7 py-4 text-sm tracking-wide uppercase hover:bg-accent/90 transition"
          >
            Explore the Collection
          </a>
          <a
            href="#visit"
            className="border border-primary-foreground/50 text-primary-foreground px-7 py-4 text-sm tracking-wide uppercase hover:bg-primary-foreground/10 transition"
          >
            Find the Store
          </a>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="story" className="py-28 md:py-40 bg-background">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Our Story</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight text-primary mb-8">
            A small shop on Mazā Pils, where every thread has a place to belong.
          </h2>
          <p className="text-muted-foreground leading-relaxed text-lg mb-6">
            Tucked into one of Riga's oldest cobblestone lanes, our store has welcomed
            travelers from all over the world for years. We curate Latvian linen woven
            in nearby workshops, wool knitted by hand in the countryside, and souvenirs
            chosen one piece at a time.
          </p>
          <p className="text-muted-foreground leading-relaxed text-lg">
            Nothing mass-produced. Nothing without a story.
          </p>
        </div>
        <div className="relative">
          <img
            src={riga}
            alt="Cobblestone street in Riga Old Town"
            width={1400}
            height={900}
            loading="lazy"
            className="w-full h-[520px] object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="absolute -bottom-8 -left-8 bg-card border border-border p-8 max-w-xs hidden md:block">
            <p className="font-serif text-primary text-3xl">5.0</p>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-1">
              Google Reviews
            </p>
            <p className="text-sm text-muted-foreground mt-3">
              "Great service, awesome souvenirs and low prices."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Collection() {
  const items = [
    {
      title: "Pure Latvian Linen",
      desc: "Tablecloths, kitchen towels, scarves and apparel — woven from flax grown in the Baltic countryside.",
      img: linenStack,
      tag: "Linen",
    },
    {
      title: "Hand-knit Wool Mittens",
      desc: "Traditional folk patterns, each pair knitted by hand. Warm enough for a Latvian winter.",
      img: mittens,
      tag: "Wool",
    },
    {
      title: "Folk Pattern Hats",
      desc: "Recommended by visitors — wonderful colors and designs, crafted to be kept for years.",
      img: hat,
      tag: "Knitwear",
    },
  ];
  return (
    <section id="collection" className="py-28 md:py-40 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div className="max-w-2xl">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">The Collection</p>
            <h2 className="font-serif text-4xl md:text-5xl text-primary leading-tight">
              Quiet craft, made to be carried home.
            </h2>
          </div>
          <p className="text-muted-foreground max-w-sm">
            A small selection of what you'll find in store. Stock changes with the seasons
            and what our makers send us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {items.map((it) => (
            <article key={it.title} className="group">
              <div className="overflow-hidden bg-muted">
                <img
                  src={it.img}
                  alt={it.title}
                  width={900}
                  height={1100}
                  loading="lazy"
                  className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-6">
                <p className="text-xs uppercase tracking-widest text-accent mb-2">{it.tag}</p>
                <h3 className="font-serif text-2xl text-primary mb-2">{it.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 grid md:grid-cols-4 gap-8 border-t border-border pt-12">
          {[
            ["Amber Jewelry", "Polished Baltic amber, set in silver."],
            ["Wooden Crafts", "Carved spoons, bowls, ornaments."],
            ["Herbal Teas & Honey", "Forest gathered, small batch."],
            ["Folk Ceramics", "Hand-thrown, signed by the potter."],
          ].map(([t, d]) => (
            <div key={t}>
              <h4 className="font-serif text-xl text-primary mb-2">{t}</h4>
              <p className="text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = [
    {
      name: "Mark P",
      when: "Google Review",
      text: "The store sells a variety of knitted hats. The colors and designs are wonderful. I recommend visiting the gift store! I would love to return.",
    },
    {
      name: "Michael Woodall",
      when: "Google Review",
      text: "Found all of the linen things I wanted in Latvia at a decent price. They have anything from ties to tablecloths — beautifully made.",
    },
    {
      name: "Igor Kowalski",
      when: "Google Review",
      text: "Great service, awesome souvenirs and low prices. A must-visit when you're in Riga.",
    },
  ];
  return (
    <section id="reviews" className="py-28 md:py-40 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">5.0 on Google</p>
          <h2 className="font-serif text-4xl md:text-5xl text-primary max-w-2xl mx-auto leading-tight">
            Loved by visitors from across the world.
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r) => (
            <figure key={r.name} className="bg-card border border-border p-10">
              <div className="text-accent text-lg tracking-widest mb-6">★★★★★</div>
              <blockquote className="font-serif text-xl text-primary leading-relaxed mb-8">
                "{r.text}"
              </blockquote>
              <figcaption className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{r.name}</span> · {r.when}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="py-28 md:py-40 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16">
        <div>
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-6">Visit Us</p>
          <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">
            In the oldest corner of Riga.
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed text-lg mb-10 max-w-md">
            Step inside, take your time, and let one of our pieces find you.
            We're happy to wrap anything as a gift.
          </p>
          <a
            href="https://www.google.com/maps/search/?api=1&query=Linen+and+Souvenirs+Maz%C4%81+Pils+iela+4+Riga"
            target="_blank"
            rel="noreferrer"
            className="inline-flex bg-accent text-accent-foreground px-7 py-4 text-sm uppercase tracking-wide hover:bg-accent/90 transition"
          >
            Get Directions
          </a>
        </div>
        <dl className="space-y-8 text-primary-foreground/90">
          <div className="border-t border-primary-foreground/20 pt-6">
            <dt className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-2">Address</dt>
            <dd className="font-serif text-2xl">Mazā Pils iela 4</dd>
            <dd>Centra rajons, Rīga, LV-1050</dd>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6">
            <dt className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-2">Hours</dt>
            <dd>Tue – Sun · 11:00 — 18:00</dd>
            <dd className="text-primary-foreground/60 text-sm mt-1">Closed Mondays</dd>
          </div>
          <div className="border-t border-primary-foreground/20 pt-6">
            <dt className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60 mb-2">Phone</dt>
            <dd>
              <a href="tel:+37126554999" className="font-serif text-2xl hover:text-accent transition">
                +371 26 554 999
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground/70 border-t border-primary-foreground/10">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-wrap items-center justify-between gap-4 text-sm">
        <p className="font-serif text-primary-foreground">Linen & Souvenirs · Riga</p>
        <p>© {new Date().getFullYear()} · Mazā Pils iela 4, Rīga</p>
      </div>
    </footer>
  );
}
