/* ============================================================
   Mother's Day Graphics – Product Data
   Each object: t=title, i=image, a=affiliate link, c=category,
   f=formats[], dl=downloads(social proof), price=display price
   ============================================================ */

const PRODUCTS = [
  // ── FLORAL ──────────────────────────────────────────────
  { t:"Watercolor Rose Bouquet",          i:"https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+floral&type=Graphics",         c:"floral",   f:["PNG","SVG","EPS"],      dl:1842, price:"$3.99" },
  { t:"Peony Garden Frame",               i:"https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+peony&type=Graphics",         c:"floral",   f:["PNG","SVG"],            dl:2105, price:"$4.49" },
  { t:"Daisy Chain Border Set",           i:"https://images.unsplash.com/photo-1606041008023-472dfb5e530f?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+daisy&type=Graphics",         c:"floral",   f:["PNG","SVG","DXF"],      dl:1356, price:"$2.99" },
  { t:"Cherry Blossom Wreath",            i:"https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+cherry+blossom&type=Graphics",c:"floral",   f:["PNG","SVG","EPS"],      dl:1987, price:"$3.49" },
  { t:"Tulip Arrangement Clipart",        i:"https://images.unsplash.com/photo-1518701005037-d53b1f67bb1c?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+tulip&type=Graphics",         c:"floral",   f:["PNG","SVG"],            dl:1124, price:"$2.49" },
  { t:"Lavender Bouquet PNG",             i:"https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+lavender&type=Graphics",      c:"floral",   f:["PNG","EPS"],            dl:2340, price:"$3.99" },
  { t:"Sunflower Frame Design",           i:"https://images.unsplash.com/photo-1551731409-43eb3e517a1a?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+sunflower&type=Graphics",     c:"floral",   f:["PNG","SVG","DXF"],      dl:1563, price:"$4.99" },

  // ── QUOTES ──────────────────────────────────────────────
  { t:"Best Mom Ever Typography",         i:"https://images.unsplash.com/photo-1596463989466-3a10a06b2e07?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=best+mom+ever&type=Graphics",        c:"quotes",   f:["PNG","SVG"],            dl:3210, price:"$1.99" },
  { t:"Love You Mom Script",             i:"https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=love+you+mom&type=Graphics",         c:"quotes",   f:["PNG","SVG","EPS"],      dl:2876, price:"$2.49" },
  { t:"Mom Heart Lettering",             i:"https://images.unsplash.com/photo-1557862921-37829c790f19?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mom+heart&type=Graphics",            c:"quotes",   f:["PNG","SVG"],            dl:1945, price:"$1.99" },
  { t:"#1 Mom Badge Design",             i:"https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=number+one+mom&type=Graphics",       c:"quotes",   f:["PNG","SVG","DXF"],      dl:2430, price:"$2.99" },
  { t:"Mama Bear Calligraphy",           i:"https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mama+bear&type=Graphics",            c:"quotes",   f:["PNG","SVG"],            dl:1678, price:"$2.49" },
  { t:"Super Mom Comic Style",           i:"https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=super+mom&type=Graphics",            c:"quotes",   f:["PNG","SVG","EPS"],      dl:2015, price:"$3.49" },

  // ── GRANDMAS ────────────────────────────────────────────
  { t:"World's Best Grandma",            i:"https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=best+grandma&type=Graphics",         c:"grandmas", f:["PNG","SVG"],            dl:1245, price:"$2.99" },
  { t:"Nana's Love Floral",             i:"https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=nana+love&type=Graphics",            c:"grandmas", f:["PNG","SVG","EPS"],      dl:987,  price:"$3.49" },
  { t:"Grandma Heart Wreath",           i:"https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=grandma+heart&type=Graphics",        c:"grandmas", f:["PNG","SVG"],            dl:1102, price:"$2.49" },
  { t:"Grammy's Kitchen Art",            i:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=grandma+kitchen&type=Graphics",      c:"grandmas", f:["PNG","SVG","DXF"],      dl:856,  price:"$3.99" },

  // ── KIDS ────────────────────────────────────────────────
  { t:"Mom & Baby Elephant",             i:"https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mom+baby+elephant&type=Graphics",    c:"kids",     f:["PNG","SVG"],            dl:3450, price:"$2.99" },
  { t:"I Love Mommy Handprint",          i:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=i+love+mommy&type=Graphics",         c:"kids",     f:["PNG","SVG","EPS"],      dl:2890, price:"$1.99" },
  { t:"Cute Mama Bird & Chicks",         i:"https://images.unsplash.com/photo-1535083783855-76ae62b2914e?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mama+bird&type=Graphics",            c:"kids",     f:["PNG","SVG"],            dl:1876, price:"$2.49" },
  { t:"Rainbow for Mom",                i:"https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=rainbow+mom&type=Graphics",          c:"kids",     f:["PNG","SVG","DXF"],      dl:2134, price:"$2.99" },
  { t:"Butterfly Kisses Card",          i:"https://images.unsplash.com/photo-1526547541286-73a7aaa08f2a?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=butterfly+mom&type=Graphics",        c:"kids",     f:["PNG","SVG"],            dl:1567, price:"$2.49" },

  // ── MODERN ──────────────────────────────────────────────
  { t:"Geometric Mom Portrait",          i:"https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=geometric+mom&type=Graphics",        c:"modern",   f:["PNG","SVG","EPS"],      dl:1456, price:"$4.99" },
  { t:"Minimalist Line Art Mom",         i:"https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=line+art+mom&type=Graphics",         c:"modern",   f:["PNG","SVG"],            dl:2678, price:"$3.99" },
  { t:"Abstract Floral Poster",         i:"https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=abstract+floral+mom&type=Graphics",  c:"modern",   f:["PNG","SVG","EPS","DXF"],dl:1890, price:"$5.49" },
  { t:"Boho Mom Elements Pack",          i:"https://images.unsplash.com/photo-1490750967868-88aa4f44baee?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=boho+mom&type=Graphics",             c:"modern",   f:["PNG","SVG"],            dl:2345, price:"$4.49" },
  { t:"Retro 70s Mom Design",           i:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=retro+mom&type=Graphics",            c:"modern",   f:["PNG","SVG","EPS"],      dl:1234, price:"$3.49" },

  // ── BUNDLES ─────────────────────────────────────────────
  { t:"Ultimate Mom Bundle (50+)",       i:"https://images.unsplash.com/photo-1556103255-4443dbf8ea38?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mother+bundle&type=Graphics",        c:"bundles",  f:["PNG","SVG","EPS","DXF"],dl:4560, price:"$12.99" },
  { t:"Floral Mom Mega Pack",           i:"https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=floral+mom+pack&type=Graphics",      c:"bundles",  f:["PNG","SVG","EPS"],      dl:3210, price:"$9.99" },
  { t:"Quotes Collection Bundle",       i:"https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=mom+quotes+bundle&type=Graphics",    c:"bundles",  f:["PNG","SVG"],            dl:2780, price:"$7.99" },
  { t:"Kids Love Mom Clipart Set",      i:"https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&h=600&fit=crop", a:"https://www.creativefabrica.com/search/ref/20531415/?query=kids+mom+clipart&type=Graphics",     c:"bundles",  f:["PNG","SVG","EPS","DXF"],dl:1950, price:"$8.49" },
];

/* Category metadata */
const CATEGORIES = [
  { id:"floral",   label:"Floral",   icon:"🌸" },
  { id:"quotes",   label:"Quotes",   icon:"✍️" },
  { id:"grandmas", label:"Grandmas", icon:"💜" },
  { id:"kids",     label:"Kids",     icon:"🧸" },
  { id:"modern",   label:"Modern",   icon:"✨" },
  { id:"bundles",  label:"Bundles",  icon:"📦" },
];

/* General affiliate link */
const AFFILIATE_LINK = "https://www.creativefabrica.com/search/ref/20531415/?query=mother&type=Graphics";
