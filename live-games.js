// Loads games from Supabase. If it fails, the site falls back to assets/js/apps-data.js.
window.fetchLiveGames = async () => {
  const SB = 'https://bvbokidxzluotarwmpki.supabase.co', KEY = 'sb_publishable_HRdccnw9NacJC6TltMxpCg_rR3-y1Wx';
  const C = 'mg_games3', now = Date.now();
  try { const c = JSON.parse(localStorage.getItem(C) || 'null'); if (c && now - c.t < 12e4) return c.d; } catch (e) {}
  const ctl = new AbortController(), timer = setTimeout(() => ctl.abort(), 3500);
  try {
    const r = await fetch(`${SB}/rest/v1/games?select=*&order=sort_order.asc`, { headers: { apikey: KEY }, signal: ctl.signal });
    if (!r.ok) return null;
    const d = (await r.json()).map(g => ({
      id: g.id, name: g.name, developer: g.developer, category: g.category, isMod: g.is_mod, isModMenu: g.is_mod_menu,
      image: g.image, rating: g.rating, downloads: g.downloads, locker_url: g.locker_url, isFeatured: g.is_featured,
      order: g.sort_order, version: g.version, size: g.size, badge: g.badge, bgImage: g.bg_image, isTrending: g.is_trending, duration: g.duration, afterInstall: g.after_install, iosUrl: g.ios_url, description: g.description, screenshots: g.screenshots
    }));
    try { localStorage.setItem(C, JSON.stringify({ t: now, d })); } catch (e) {}
    return d;
  } catch (e) { return null; } finally { clearTimeout(timer); }
};
