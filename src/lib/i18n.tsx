import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Lang = "en" | "lv";

const STORAGE_KEY = "linenriga-lang";

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Navigation
    "nav.home": "Home",
    "nav.story": "Our Story",
    "nav.collection": "Collection",
    "nav.journal": "Journal",
    "nav.visit": "Visit",

    // Hero
    "hero.tagline": "Since generations · Riga, Latvia",
    "hero.title": "Handwoven stories<br />from the Baltic.",
    "hero.description":
      "A small family-run boutique in the heart of Riga's Old Town, offering pure Latvian linen, hand-knit wool, amber and the quiet beauty of traditional craft.",
    "hero.ctaExplore": "Explore the Collection",
    "hero.ctaFind": "Find the Store",

    // Story
    "story.label": "Our Story",
    "story.title": "A small shop on Mazā Pils, where every thread has a place to belong.",
    "story.p1":
      "Tucked into one of Riga's oldest cobblestone lanes, our store has welcomed travelers from all over the world for years. We curate Latvian linen woven in nearby workshops, wool knitted by hand in the countryside, and souvenirs chosen one piece at a time.",
    "story.p2": "Nothing mass-produced. Nothing without a story.",
    "story.rating": "Google Reviews",
    "story.review": "Great service, awesome souvenirs and low prices.",

    // Collection
    "collection.label": "The Collection",
    "collection.title": "Quiet craft, made to be carried home.",
    "collection.intro":
      "A small selection of what you'll find in store. Stock changes with the seasons and what our makers send us.",
    "collection.linen.title": "Pure Latvian Linen",
    "collection.linen.desc":
      "Tablecloths, kitchen towels, scarves and apparel — woven from flax grown in the Baltic countryside.",
    "collection.linen.tag": "Linen",
    "collection.mittens.title": "Hand-knit Wool Mittens",
    "collection.mittens.desc":
      "Traditional folk patterns, each pair knitted by hand. Warm enough for a Latvian winter.",
    "collection.mittens.tag": "Wool",
    "collection.hats.title": "Folk Pattern Hats",
    "collection.hats.desc":
      "Recommended by visitors — wonderful colors and designs, crafted to be kept for years.",
    "collection.hats.tag": "Knitwear",
    "collection.amber": "Amber Jewelry",
    "collection.amber.desc": "Polished Baltic amber, set in silver.",
    "collection.wood": "Wooden Crafts",
    "collection.wood.desc": "Carved spoons, bowls, ornaments.",
    "collection.tea": "Herbal Teas & Honey",
    "collection.tea.desc": "Forest gathered, small batch.",
    "collection.ceramic": "Folk Ceramics",
    "collection.ceramic.desc": "Hand-thrown, signed by the potter.",

    // Reviews
    "reviews.label": "5.0 on Google",
    "reviews.title": "Loved by visitors from across the world.",
    "reviews.mark":
      "The store sells a variety of knitted hats. The colors and designs are wonderful. I recommend visiting the gift store! I would love to return.",
    "reviews.michael":
      "Found all of the linen things I wanted in Latvia at a decent price. They have anything from ties to tablecloths — beautifully made.",
    "reviews.igor": "Great service, awesome souvenirs and low prices. A must-visit when you're in Riga.",
    "reviews.google": "Google Review",

    // Visit
    "visit.label": "Visit Us",
    "visit.title": "In the oldest corner of Riga.",
    "visit.description":
      "Step inside, take your time, and let one of our pieces find you. We're happy to wrap anything as a gift.",
    "visit.directions": "Get Directions",
    "visit.address": "Address",
    "visit.street": "Mazā Pils iela 4",
    "visit.city": "Centra rajons, Rīga, LV-1050",
    "visit.hours": "Hours",
    "visit.open": "Tue – Sun · 11:00 — 18:00",
    "visit.closed": "Closed Mondays",
    "visit.phone": "Phone",

    // Footer
    "footer.brand": "Linen & Souvenirs · Riga",
    "footer.copy": "© {year} · Mazā Pils iela 4, Rīga",

    // Blog
    "blog.label": "Journal",
    "blog.title": "Stories from the shop.",
    "blog.loading": "Loading posts…",
    "blog.empty": "No posts yet. Check back soon.",
    "blog.readMore": "Read more →",
    "blog.error": "Couldn't load posts",
    "blog.home": "Home",
    "blog.allPosts": "All posts",
    "blog.postLoading": "Loading…",
    "blog.postError": "Couldn't load post",
    "blog.notFound": "Post not found.",

    // Admin
    "admin.dashboard": "WordPress.com Dashboard",
    "admin.newPost": "New post",
    "admin.allPosts": "All posts",
    "admin.editPost": "Edit post",
    "admin.newPostTitle": "New post",
    "admin.titlePlaceholder": "Post title",
    "admin.contentPlaceholder": "Write your post… HTML is supported.",
    "admin.publish": "Publish",
    "admin.draft": "Draft",
    "admin.saving": "Saving…",
    "admin.update": "Update",
    "admin.publishBtn": "Publish",
    "admin.cancel": "Cancel",
    "admin.deleteConfirm": "Delete this post?",
    "admin.edit": "Edit",
    "admin.delete": "Delete",
    "admin.loadError": "Couldn't load posts",
    "admin.untitled": "(untitled)",

    // 404 / Error
    "error.notFound": "Page not found",
    "error.notFoundDesc": "The page you're looking for doesn't exist or has been moved.",
    "error.goHome": "Go home",
    "error.title": "This page didn't load",
    "error.desc": "Something went wrong on our end. You can try refreshing or head back home.",
    "error.retry": "Try again",
  },
  lv: {
    // Navigation
    "nav.home": "Sākums",
    "nav.story": "Mūsu stāsts",
    "nav.collection": "Kolekcija",
    "nav.journal": "Žurnāls",
    "nav.visit": "Apmeklējiet mūs",

    // Hero
    "hero.tagline": "Jau no paaudzēm · Rīga, Latvija",
    "hero.title": "Austi stāsti<br />no Baltijas.",
    "hero.description":
      "Mazs ģimenes veikals Rīgas vecpilsētes sirdī, kurā atrodams tīrs latviešu lins, rokām adīta vilna, dzintars un klusa tradicionālās amatniecības skaistuma valdzinājums.",
    "hero.ctaExplore": "Iepazīstiet kolekciju",
    "hero.ctaFind": "Atrodiet veikalu",

    // Story
    "story.label": "Mūsu stāsts",
    "story.title": "Mazs veikals Mazajā Pils ielā, kur katram pavedienam ir sava vieta.",
    "story.p1":
      "Iekļuvis vienā no Rīgas senākajām bruģētajām ieliņām, mūsu veikals jau gadiem uzņem ceļotājus no visas pasaules. Mēs piedāvājam latviešu linu, kas austs tuvējās darbnīcās, rokām adītu vilnu no laukiem un suvenīrus, kas atlasīti pa vienam.",
    "story.p2": "Nekas nav ražots masveidā. Nekas nav bez stāsta.",
    "story.rating": "Google atsauksmes",
    "story.review": "Lieliskais serviss, lieliski suvenīri un zemas cenas.",

    // Collection
    "collection.label": "Kolekcija",
    "collection.title": "Klusa meistarība, ko nest mājās.",
    "collection.intro":
      "Neliela izlase no tā, ko atradīsiet veikalā. Sortiments mainās atkarībā no sezonas un tā, ko mums atsūtījuši meistari.",
    "collection.linen.title": "Tīrs latviešu lins",
    "collection.linen.desc":
      "Galdauti, virtuves dvieļi, šalles un apģērbs — austa no liniem, kas audzēti Baltijas laukos.",
    "collection.linen.tag": "Lins",
    "collection.mittens.title": "Rokām adīti vilnas cimdi",
    "collection.mittens.desc":
      "Tradicionāli tautisku rakstu cimdi, katrs pāris adīts ar roku. Silti pat Latvijas ziemai.",
    "collection.mittens.tag": "Vilna",
    "collection.hats.title": "Tautisku rakstu cepures",
    "collection.hats.desc":
      "Apmeklētāju ieteiktas — brīnišķīgas krāsas un raksti, adītas, lai kalpotu gadiem.",
    "collection.hats.tag": "Adījumi",
    "collection.amber": "Dzintara rotas",
    "collection.amber.desc": "Nogludināts Baltijas dzintars, ietvarots sudrabā.",
    "collection.wood": "Koka izstrādājumi",
    "collection.wood.desc": "Izgriezti karotes, bļodas, rotājumi.",
    "collection.tea": "Augu tējas un medus",
    "collection.tea.desc": "Savuākti mežā, mazās partijās.",
    "collection.ceramic": "Tautiskā keramika",
    "collection.ceramic.desc": "Rokām veidota, apakšā meistara paraksts.",

    // Reviews
    "reviews.label": "5.0 Google",
    "reviews.title": "Iemīļots apmeklētāju no visas pasaules.",
    "reviews.mark":
      "Veikalā ir plaša adītu cepuru izvēle. Krāsas un raksti ir brīnišķīgi. Iesaku apmeklēt dāvanu veikalu! Labprāt atgriezīšos.",
    "reviews.michael":
      "Atradu visu lina lietu, ko vēlējos Latvijā, par saprātīgu cenu. Viņiem ir viss — no kaklasaitēm līdz galdautiem — skaisti izgatavots.",
    "reviews.igor": "Lieliskais serviss, lieliski suvenīri un zemas cenas. Obligāti jāapmeklē, ja esi Rīgā.",
    "reviews.google": "Google atsauksme",

    // Visit
    "visit.label": "Apmeklējiet mūs",
    "visit.title": "Senākajā Rīgas stūrī.",
    "visit.description":
      "Ienāciet, nesteidzieties un ļaujiet kādam no mūsu darbiem atrast jūs. Labprāt ietinam jebko dāvanā.",
    "visit.directions": "Kā nokļūt",
    "visit.address": "Adrese",
    "visit.street": "Mazā Pils iela 4",
    "visit.city": "Centra rajons, Rīga, LV-1050",
    "visit.hours": "Darba laiks",
    "visit.open": "Otr. – Sv. · 11:00 — 18:00",
    "visit.closed": "Pirmdienās slēgts",
    "visit.phone": "Tālrunis",

    // Footer
    "footer.brand": "Lins un suvenīri · Rīga",
    "footer.copy": "© {year} · Mazā Pils iela 4, Rīga",

    // Blog
    "blog.label": "Žurnāls",
    "blog.title": "Stāsti no veikala.",
    "blog.loading": "Ielādē rakstus…",
    "blog.empty": "Vēl nav rakstu. Pārbaudiet vēlāk.",
    "blog.readMore": "Lasīt vairāk →",
    "blog.error": "Neizdevās ielādēt rakstus",
    "blog.home": "Sākums",
    "blog.allPosts": "Visi raksti",
    "blog.postLoading": "Ielādē…",
    "blog.postError": "Neizdevās ielādēt rakstu",
    "blog.notFound": "Raksts nav atrasts.",

    // Admin
    "admin.dashboard": "WordPress.com vadības panelis",
    "admin.newPost": "Jauns raksts",
    "admin.allPosts": "Visi raksti",
    "admin.editPost": "Rediģēt rakstu",
    "admin.newPostTitle": "Jauns raksts",
    "admin.titlePlaceholder": "Raksta virsraksts",
    "admin.contentPlaceholder": "Rakstiet savu rakstu… HTML ir atbalstīts.",
    "admin.publish": "Publicēt",
    "admin.draft": "Melnraksts",
    "admin.saving": "Saglabā…",
    "admin.update": "Atjaunināt",
    "admin.publishBtn": "Publicēt",
    "admin.cancel": "Atcelt",
    "admin.deleteConfirm": "Dzēst šo rakstu?",
    "admin.edit": "Rediģēt",
    "admin.delete": "Dzēst",
    "admin.loadError": "Neizdevās ielādēt rakstus",
    "admin.untitled": "(bez virsraksta)",

    // 404 / Error
    "error.notFound": "Lapa nav atrasta",
    "error.notFoundDesc": "Meklētā lapa neeksistē vai ir pārvietota.",
    "error.goHome": "Uz sākumu",
    "error.title": "Šī lapa neielādējās",
    "error.desc": "Kaut kas nogāja greizi no mūsu puses. Mēģiniet atsvaidzināt vai atgriezieties sākumlapā.",
    "error.retry": "Mēģināt vēlreiz",
  },
};

const I18nContext = createContext<{
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
} | null>(null);

function getByKey(obj: Record<string, string>, key: string) {
  return obj[key] ?? key;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    if (typeof window === "undefined") return "en";
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang;
    return saved === "lv" ? "lv" : "en";
  });

  const setLang = (next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const t = (key: string) => getByKey(translations[lang], key);

  return <I18nContext.Provider value={{ lang, setLang, t }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function useT() {
  return useI18n().t;
}
