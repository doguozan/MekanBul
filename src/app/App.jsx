import { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Plus,
  Check,
  X,
  Star,
  Filter,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Send,
  Minimize2,
  Phone,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  LogOut,
  Shield,
  Smartphone,
  ArrowRight
} from "lucide-react";
const VENUES = [
  { id: 1, name: "Kristal Salon", type: "D\xFC\u011F\xFCn & Balo", capacity: 300, price: 15e3, rating: 4.9, color: "#8B6914", tags: ["D\xFC\u011F\xFCn", "Gala"], image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&h=400&fit=crop" },
  { id: 2, name: "Panorama Konferans", type: "\u0130\u015F & Toplant\u0131", capacity: 80, price: 4500, rating: 4.7, color: "#2C3E2D", tags: ["Toplant\u0131", "Seminer"], image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop" },
  { id: 3, name: "Bah\xE7e Teras\u0131", type: "A\xE7\u0131k Hava", capacity: 150, price: 8e3, rating: 4.8, color: "#5A7A3A", tags: ["Kokteyl", "Davet"], image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop" },
  { id: 4, name: "Zeytindal\u0131 Restoran", type: "Yemek & Ziyafet", capacity: 60, price: 3200, rating: 4.6, color: "#8B4513", tags: ["Yemek", "\xD6zel Ak\u015Fam"], image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&h=400&fit=crop" },
  { id: 5, name: "Lounge Caf\xE9", type: "K\xFC\xE7\xFCk Toplant\u0131", capacity: 25, price: 1200, rating: 4.5, color: "#6B4226", tags: ["Kahve", "Workshop"], image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&h=400&fit=crop" },
  { id: 6, name: "Bo\u011Faz Manzara", type: "VIP & \xD6zel", capacity: 40, price: 12e3, rating: 5, color: "#1A3A5C", tags: ["VIP", "Manzara"], image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop" },
  { id: 7, name: "End\xFCstriyel At\xF6lye", type: "Yarat\u0131c\u0131 Etkinlik", capacity: 100, price: 5500, rating: 4.6, color: "#4A4A4A", tags: ["Lansman", "Sergi"], image: "https://images.unsplash.com/photo-1572025442646-866d16c84a54?w=600&h=400&fit=crop" },
  { id: 8, name: "\xC7at\u0131 Kat\u0131 Teras", type: "Kokteyl & Gece", capacity: 80, price: 9e3, rating: 4.8, color: "#7A3B5A", tags: ["Gece", "Kutlama"], image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=600&h=400&fit=crop" },
  { id: 9, name: "Osmanl\u0131 K\xF6\u015Fk\xFC", type: "K\xFClt\xFCrel & Tarihi", capacity: 60, price: 18e3, rating: 4.9, color: "#8B2500", tags: ["Tarihi", "K\xFClt\xFCr"], image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop" },
  { id: 10, name: "Spor & Gala Salonu", type: "Spor & \xD6d\xFCl T\xF6reni", capacity: 500, price: 22e3, rating: 4.7, color: "#2C3E2D", tags: ["Spor", "Gala"], image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop" },
  { id: 11, name: "K\u0131\u015F Bah\xE7esi", type: "Romantik & D\xFC\u011F\xFCn", capacity: 70, price: 11e3, rating: 4.8, color: "#5A7A3A", tags: ["D\xFC\u011F\xFCn", "Ni\u015Fan"], image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=400&fit=crop" },
  { id: 12, name: "Deniz Kenar\u0131 Pavilyon", type: "A\xE7\u0131k Hava & Plaj", capacity: 200, price: 13500, rating: 4.9, color: "#006994", tags: ["Plaj", "Yaz"], image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop" }
];
const BOOKINGS = [
  { id: 1, venue: "Kristal Salon", date: "12 Temmuz", time: "18:00", guests: 250, status: "onayl\u0131", client: "Ay\u015Fe & Mert D\xFC\u011F\xFCn\xFC" },
  { id: 2, venue: "Panorama Konferans", date: "14 Temmuz", time: "09:00", guests: 60, status: "beklemede", client: "TechSummit 2026" },
  { id: 3, venue: "Bah\xE7e Teras\u0131", date: "15 Temmuz", time: "19:30", guests: 120, status: "onayl\u0131", client: "Ar\xE7elik Lansman Gecesi" },
  { id: 4, venue: "Zeytindal\u0131 Restoran", date: "16 Temmuz", time: "20:00", guests: 45, status: "iptal", client: "Y\u0131ld\u0131z Ailesi \u0130ftar" },
  { id: 5, venue: "Lounge Caf\xE9", date: "17 Temmuz", time: "10:00", guests: 20, status: "onayl\u0131", client: "UX Workshop" }
];
const OCCUPANCY = [75, 88, 62, 91, 70, 85, 78, 66, 95, 73, 80, 69];
const CAL_DAYS = ["Pzt", "Sal", "\xC7ar", "Per", "Cum", "Cmt", "Paz"];
const BUSY_DAYS = [3, 7, 12, 15, 17, 22, 25, 28];
const PARTIAL_DAYS = [5, 10, 14, 20, 27];
const MONTH_DAYS = [
  { day: 30, prev: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
  { day: 1, next: true },
  { day: 2, next: true },
  { day: 3, next: true }
];
const NAV_ITEMS = [
  { id: "dashboard", label: "Genel Bak\u0131\u015F", icon: LayoutDashboard },
  { id: "venues", label: "Mekanlar", icon: MapPin },
  { id: "bookings", label: "Rezervasyonlar", icon: Calendar },
  { id: "calendar", label: "Takvim", icon: Clock }
];
const VENUE_REVIEWS = [
  { id: 1, venue: "Kristal Salon", author: "Selin Arslan", role: "Gelin", date: "Haziran 2026", rating: 5, avatar: "SA", color: "#8B6914", text: "D\xFC\u011F\xFCn gecemiz i\xE7in hayallerimizin \xF6tesinde bir deneyim. Salon \u0131\u015F\u0131kland\u0131rmas\u0131 ve personelin ilgisi bizi \xE7ok etkiledi." },
  { id: 2, venue: "Panorama Konferans", author: "Murat Demir", role: "\u0130K Direkt\xF6r\xFC, Ar\xE7elik", date: "May\u0131s 2026", rating: 5, avatar: "MD", color: "#2C3E2D", text: "200 ki\u015Filik y\u0131ll\u0131k strateji zirvemizi burada d\xFCzenledik. Teknik altyap\u0131 m\xFCkemmeldi, ekip son derece profesyoneldi." },
  { id: 3, venue: "Bah\xE7e Teras\u0131", author: "Dila Y\u0131ld\u0131z", role: "Etkinlik Planlay\u0131c\u0131s\u0131", date: "Nisan 2026", rating: 4, avatar: "DY", color: "#5A7A3A", text: "M\xFC\u015Fterimizin ni\u015Fan partisi i\xE7in tercih ettik. Ak\u015Fam \u0131\u015F\u0131kland\u0131rmas\u0131 ve ye\u015Fillikler inan\u0131lmazd\u0131." },
  { id: 4, venue: "Osmanl\u0131 K\xF6\u015Fk\xFC", author: "Tar\u0131k \xD6z", role: "Genel M\xFCd\xFCr, Luxury Events", date: "Mart 2026", rating: 5, avatar: "T\xD6", color: "#8B2500", text: "Tarihi dokusu ve modern hizmet anlay\u0131\u015F\u0131 birle\u015Fince e\u015Fsiz bir atmosfer olu\u015Fuyor." },
  { id: 5, venue: "\xC7at\u0131 Kat\u0131 Teras", author: "P\u0131nar Kaya", role: "Marka M\xFCd\xFCr\xFC", date: "\u015Eubat 2026", rating: 4, avatar: "PK", color: "#7A3B5A", text: "Lansman gecemiz i\xE7in m\xFCkemmel arka plan. \u015Eehir manzaras\u0131 foto\u011Fraf i\xE7in inan\u0131lmazd\u0131." },
  { id: 6, venue: "Deniz Kenar\u0131 Pavilyon", author: "Can Erdo\u011Fan", role: "D\xFC\u011F\xFCn Organizat\xF6r\xFC", date: "Ocak 2026", rating: 5, avatar: "CE", color: "#006994", text: "Yaz d\xFC\u011F\xFCnleri i\xE7in \u0130stanbul'un en iyi a\xE7\u0131k hava mekan\u0131. Romantizmi kendili\u011Finden yarat\u0131yor." }
];
const APP_REVIEWS = [
  { id: 1, author: "Zeynep Korkmaz", role: "Ba\u011F\u0131ms\u0131z Etkinlik Planlay\u0131c\u0131s\u0131", date: "Temmuz 2026", rating: 5, avatar: "ZK", text: "MekanBul'u kullanmadan \xF6nce her \u015Feyi Excel'de takip ediyordum. Ayl\u0131k i\u015F hacmim %40 artt\u0131." },
  { id: 2, author: "Ahmet \u015Eahin", role: "Operasyon M\xFCd\xFCr\xFC, Grand Events", date: "Haziran 2026", rating: 5, avatar: "A\u015E", text: "5 farkl\u0131 mekan\u0131 y\xF6netiyoruz. \xC7ift rezervasyon sorunlar\u0131 art\u0131k tarihe kar\u0131\u015Ft\u0131." },
  { id: 3, author: "Elif Tun\xE7", role: "Butik D\xFC\u011F\xFCn Planlay\u0131c\u0131s\u0131", date: "May\u0131s 2026", rating: 4, avatar: "ET", text: "Aray\xFCz \xE7ok sezgisel ve h\u0131zl\u0131. Mobil kullan\u0131m\u0131 \xF6zellikle sahada \xE7al\u0131\u015F\u0131rken hayat kurtar\u0131yor." },
  { id: 4, author: "Okan Y\u0131lmaz", role: "CEO, Prestige Venues", date: "Nisan 2026", rating: 5, avatar: "OY", text: "Rakip \xFCr\xFCnleri de denedik. MekanBul'un T\xFCrk\xE7e deste\u011Fi ve yerli \xF6deme entegrasyonu bizi kazand\u0131." }
];
const QUICK_Q = [
  "Rezervasyon nas\u0131l iptal edilir?",
  "\xD6deme y\xF6ntemleri nelerdir?",
  "Mekan kapasitesini nas\u0131l de\u011Fi\u015Ftirebilirim?",
  "Fatura talep etmek istiyorum"
];
const BOT_RESP = {
  "Rezervasyon nas\u0131l iptal edilir?": "Rezervasyonlar sayfas\u0131na gidip ilgili rezervasyonun '\u0130ptal Et' se\xE7ene\u011Fini se\xE7in. \u0130ade 3-5 i\u015F g\xFCn\xFC i\xE7inde ger\xE7ekle\u015Fir.",
  "\xD6deme y\xF6ntemleri nelerdir?": "Kredi kart\u0131, banka transferi ve kurumsal fatura se\xE7eneklerimiz mevcuttur. T\xFCm \xF6demeler 256-bit SSL ile g\xFCvencededir.",
  "Mekan kapasitesini nas\u0131l de\u011Fi\u015Ftirebilirim?": "Mekanlar sayfas\u0131ndan 'D\xFCzenle' butonuyla kapasite bilgisini g\xFCncelleyebilirsiniz.",
  "Fatura talep etmek istiyorum": "Fatura taleplerini destek@mekanbul.com.tr adresine iletebilirsiniz. 24 saat i\xE7inde iletilir."
};
function GoogleIcon() {
  return <svg width="17" height="17" viewBox="0 0 18 18" fill="none">
      <path d="M17.64 9.2c0-.638-.057-1.252-.163-1.84H9v3.48h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908C16.658 14.253 17.64 11.945 17.64 9.2z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A9 9 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>;
}
function Dots() {
  return <span className="flex gap-1 items-center">
      {[0, 150, 300].map((d) => <span key={d} className="size-1.5 rounded-full bg-current animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
    </span>;
}
function Badge({ status }) {
  const map = { onayl\u0131: { label: "Onayl\u0131", bg: "#DDEEDD", text: "#2C5F2E" }, beklemede: { label: "Beklemede", bg: "#FFF4D6", text: "#8B6914" }, iptal: { label: "\u0130ptal", bg: "#FDECEA", text: "#C0392B" } };
  const s = map[status] || map.beklemede;
  return <span className="text-xs font-medium px-2.5 py-1 rounded-full shrink-0" style={{ backgroundColor: s.bg, color: s.text }}>{s.label}</span>;
}
function AuthDrawer({ mode, onClose, onLogin }) {
  const [screen, setScreen] = useState(mode);
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(0);
  const otpRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [regForm, setRegForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);
  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown((c) => c - 1), 1e3);
    return () => clearTimeout(t);
  }, [countdown]);
  const close = () => {
    setVisible(false);
    setTimeout(onClose, 280);
  };
  const doLogin = (u) => {
    setVisible(false);
    setTimeout(() => onLogin(u), 280);
  };
  const submitLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doLogin({ name: "Do\u011Fu Ozan", email, avatar: "DO" });
    }, 1100);
  };
  const googleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doLogin({ name: "Do\u011Fu Ozan", email: "doguo@gmail.com", avatar: "DO", google: true });
    }, 1200);
  };
  const submitRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doLogin({ name: regForm.name, email: regForm.email, avatar: regForm.name.slice(0, 2).toUpperCase() });
    }, 1200);
  };
  const sendCode = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      setCountdown(60);
    }, 1e3);
  };
  const changeOtp = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };
  const keyOtp = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) otpRefs.current[i - 1]?.focus();
  };
  const pasteOtp = (e) => {
    const p = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (p.length === 6) {
      setOtp(p.split(""));
      otpRefs.current[5]?.focus();
    }
  };
  const verifyOtp = () => {
    if (otp.join("").length < 6) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      doLogin({ name: "Do\u011Fu Ozan", phone, avatar: "DO" });
    }, 1e3);
  };
  const setReg = (k) => (e) => setRegForm({ ...regForm, [k]: e.target.value });
  const inp = "w-full px-3.5 py-2.5 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/55";
  const slideClass = visible ? "translate-y-0 sm:translate-x-0" : "translate-y-full sm:translate-y-0 sm:translate-x-full";
  return <div className="fixed inset-0 z-50 flex items-end sm:items-stretch sm:justify-end">
      {
    /* Backdrop */
  }
      <div
    className={`absolute inset-0 bg-black/55 backdrop-blur-sm transition-opacity duration-280 ${visible ? "opacity-100" : "opacity-0"}`}
    onClick={close}
  />

      {
    /* Panel */
  }
      <div className={`relative z-10 bg-card flex flex-col shadow-2xl border-t sm:border-t-0 sm:border-l border-border
        w-full max-h-[90dvh] sm:max-h-none sm:h-full sm:w-[390px]
        rounded-t-2xl sm:rounded-none
        transition-transform duration-280 ease-out ${slideClass}`}>

        {
    /* Mobil tutma çubuğu */
  }
        <div className="sm:hidden flex justify-center pt-3 pb-1 shrink-0">
          <div className="w-9 h-1 rounded-full bg-muted" />
        </div>

        {
    /* Başlık */
  }
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-border shrink-0">
          <div className="flex items-center gap-2">
            <div className="size-6 rounded-lg bg-primary flex items-center justify-center text-primary-foreground text-xs font-bold">M</div>
            <span className="font-semibold text-sm text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>MekanBul</span>
          </div>
          <button onClick={close} className="p-1.5 rounded-lg hover:bg-secondary transition-colors">
            <X size={15} className="text-muted-foreground" />
          </button>
        </div>

        {
    /* Sekme seçici */
  }
        {screen !== "phone" && <div className="flex px-5 pt-4 gap-1 shrink-0">
            {[["login", "Giri\u015F Yap"], ["register", "\xDCye Ol"]].map(([s, l]) => <button
    key={s}
    onClick={() => setScreen(s)}
    className={`flex-1 py-2 text-sm rounded-xl font-medium transition-all ${screen === s ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
  >
                {l}
              </button>)}
          </div>}

        {
    /* İçerik */
  }
        <div className="flex-1 overflow-y-auto px-5 py-5">

          {
    /* ── GİRİŞ ── */
  }
          {screen === "login" && <div className="space-y-4">
              <div className="space-y-2">
                <button
    onClick={googleLogin}
    disabled={loading}
    className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl bg-background hover:bg-secondary transition-colors text-sm font-medium text-foreground disabled:opacity-60 active:scale-[.98]"
  >
                  <GoogleIcon /> Google ile Giriş Yap
                </button>
                <button
    onClick={() => setScreen("phone")}
    disabled={loading}
    className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl bg-background hover:bg-secondary transition-colors text-sm font-medium text-foreground disabled:opacity-60 active:scale-[.98]"
  >
                  <Smartphone size={15} className="text-muted-foreground" /> Telefon ile Giriş Yap
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">veya e-posta ile</span><div className="flex-1 h-px bg-border" />
              </div>

              <form onSubmit={submitLogin} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">E-posta</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required placeholder="ornek@sirket.com" className={`${inp} pl-9`} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1.5">
                    <label className="text-xs font-medium text-muted-foreground">Şifre</label>
                    <button type="button" className="text-xs text-accent hover:underline">Unuttum</button>
                  </div>
                  <div className="relative">
                    <Shield size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required placeholder="••••••••" className={`${inp} pl-9 pr-9`} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                </div>
                <button
    type="submit"
    disabled={loading}
    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-60 flex items-center justify-center gap-2 active:scale-[.98]"
  >
                  {loading ? <Dots /> : "Giri\u015F Yap"}
                </button>
              </form>
            </div>}

          {
    /* ── KAYIT ── */
  }
          {screen === "register" && <div className="space-y-4">
              <button
    onClick={googleLogin}
    disabled={loading}
    className="w-full flex items-center justify-center gap-2.5 px-4 py-2.5 border border-border rounded-xl bg-background hover:bg-secondary transition-colors text-sm font-medium text-foreground disabled:opacity-60 active:scale-[.98]"
  >
                <GoogleIcon /> Google ile Kayıt Ol
              </button>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">veya form ile</span><div className="flex-1 h-px bg-border" />
              </div>
              <form onSubmit={submitRegister} className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Ad Soyad</label>
                  <input value={regForm.name} onChange={setReg("name")} required placeholder="Ad Soyad" className={inp} />
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">E-posta</label>
                  <div className="relative">
                    <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input type="email" value={regForm.email} onChange={setReg("email")} required placeholder="ornek@sirket.com" className={`${inp} pl-9`} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Telefon</label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-secondary border border-r-0 border-border rounded-l-xl text-xs text-muted-foreground shrink-0">+90</span>
                    <input
    type="tel"
    value={regForm.phone}
    onChange={setReg("phone")}
    placeholder="5XX XXX XX XX"
    className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-r-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/55"
  />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-muted-foreground mb-1.5">Şifre</label>
                  <div className="relative">
                    <Shield size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                    <input type={showPass ? "text" : "password"} value={regForm.password} onChange={setReg("password")} required placeholder="En az 8 karakter" className={`${inp} pl-9 pr-9`} />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                      {showPass ? <EyeOff size={13} /> : <Eye size={13} />}
                    </button>
                  </div>
                  {regForm.password && <div className="flex gap-1 mt-1.5">
                      {[1, 2, 3, 4].map((i) => <div
    key={i}
    className="flex-1 h-1 rounded-full transition-colors"
    style={{ backgroundColor: regForm.password.length >= i * 3 ? i < 3 ? "#8B6914" : "#5A7A3A" : "#E8E2D9" }}
  />)}
                    </div>}
                </div>
                <label className="flex items-start gap-2 cursor-pointer">
                  <div
    onClick={() => setAgreed(!agreed)}
    className={`mt-0.5 size-4 rounded border flex items-center justify-center shrink-0 transition-colors ${agreed ? "bg-primary border-primary" : "border-border bg-background"}`}
  >
                    {agreed && <Check size={9} className="text-primary-foreground" />}
                  </div>
                  <span className="text-xs text-muted-foreground leading-relaxed">
                    <button type="button" className="text-accent hover:underline">Kullanım Koşulları</button> ve{" "}
                    <button type="button" className="text-accent hover:underline">Gizlilik Politikası</button>'nı kabul ediyorum
                  </span>
                </label>
                <button
    type="submit"
    disabled={loading || !agreed}
    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[.98]"
  >
                  {loading ? <Dots /> : "Hesap Olu\u015Ftur"}
                </button>
              </form>
            </div>}

          {
    /* ── TELEFON / OTP ── */
  }
          {screen === "phone" && <div className="space-y-4">
              <div className="flex items-center gap-2 mb-1">
                <button
    onClick={() => {
      if (step === "otp") setStep("phone");
      else setScreen("login");
    }}
    className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
  >
                  <ArrowLeft size={14} className="text-muted-foreground" />
                </button>
                <div>
                  <h3 className="text-base font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>
                    {step === "phone" ? "Telefon ile Giri\u015F" : "Do\u011Frulama Kodu"}
                  </h3>
                  <p className="text-xs text-muted-foreground">{step === "phone" ? "SMS kodu g\xF6nderilecek" : `+90 ${phone} numaras\u0131na g\xF6nderildi`}</p>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  {step === "phone" ? <Phone size={24} className="text-primary" /> : <Smartphone size={24} className="text-primary" />}
                </div>
              </div>

              {step === "phone" && <form onSubmit={sendCode} className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">Telefon Numarası</label>
                    <div className="flex">
                      <span className="flex items-center px-3 bg-secondary border border-r-0 border-border rounded-l-xl text-sm text-muted-foreground shrink-0">🇹🇷 +90</span>
                      <input
    type="tel"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
    required
    placeholder="5XX XXX XX XX"
    className="flex-1 px-3.5 py-2.5 bg-background border border-border rounded-r-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground/55"
  />
                    </div>
                  </div>
                  <button
    type="submit"
    disabled={loading || phone.length < 10}
    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[.98]"
  >
                    {loading ? <Dots /> : "Kod G\xF6nder"}
                  </button>
                </form>}

              {step === "otp" && <div className="space-y-4">
                  <div className="flex gap-1.5 justify-center" onPaste={pasteOtp}>
                    {otp.map((d, i) => <input
    key={i}
    ref={(el) => otpRefs.current[i] = el}
    type="text"
    inputMode="numeric"
    maxLength={1}
    value={d}
    onChange={(e) => changeOtp(i, e.target.value)}
    onKeyDown={(e) => keyOtp(i, e)}
    className={`w-11 h-12 text-center text-base font-semibold bg-background border rounded-xl text-foreground focus:outline-none transition-all
                          ${d ? "border-primary ring-2 ring-primary/20" : "border-border focus:border-primary focus:ring-2 focus:ring-primary/20"}`}
    style={{ fontFamily: "'DM Mono',monospace" }}
  />)}
                  </div>
                  <button
    onClick={verifyOtp}
    disabled={loading || otp.join("").length < 6}
    className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 active:scale-[.98]"
  >
                    {loading ? <Dots /> : <><Check size={13} /> Doğrula &amp; Giriş Yap</>}
                  </button>
                  <p className="text-center text-xs text-muted-foreground">
                    {countdown > 0 ? <>Tekrar gönder <span className="font-medium text-foreground" style={{ fontFamily: "'DM Mono',monospace" }}>0:{String(countdown).padStart(2, "0")}</span></> : <button onClick={() => setCountdown(60)} className="text-accent font-medium hover:underline">Kodu Tekrar Gönder</button>}
                  </p>
                  <div className="p-3 rounded-xl bg-secondary/60 border border-border flex items-start gap-2">
                    <Shield size={12} className="text-muted-foreground mt-0.5 shrink-0" />
                    <p className="text-xs text-muted-foreground">Demo: herhangi 6 rakam (ör. <span className="font-medium text-foreground" style={{ fontFamily: "'DM Mono',monospace" }}>123456</span>) ile giriş yapın.</p>
                  </div>
                </div>}
            </div>}
        </div>
      </div>
    </div>;
}
function LandingPage({ onOpenDrawer }) {
  return <div className="min-h-screen relative overflow-hidden" style={{ fontFamily: "'Inter',sans-serif" }}>

      {
    /* Arka plan */
  }
      <img
    src="https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?w=1600&h=900&fit=crop&auto=format"
    alt="Şık balo salonu"
    className="absolute inset-0 w-full h-full object-cover"
  />
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/80" />

      {
    /* Nav */
  }
      <nav className="relative z-10 flex items-center justify-between px-5 sm:px-10 py-5">
        <div>
          <h1 className="text-white text-xl font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>MekanBul</h1>
          <p className="text-white/40 text-xs tracking-widest uppercase">Rezervasyon Sistemi</p>
        </div>
        <div className="flex items-center gap-2">
          <button
    onClick={() => onOpenDrawer("login")}
    className="px-4 py-2 border border-white/25 text-white text-sm rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm active:scale-[.98]"
  >
            Giriş Yap
          </button>
          <button
    onClick={() => onOpenDrawer("register")}
    className="px-4 py-2 bg-white text-foreground text-sm font-medium rounded-xl hover:bg-white/90 transition-colors active:scale-[.98]"
  >
            Üye Ol
          </button>
        </div>
      </nav>

      {
    /* Hero */
  }
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[72vh] px-5 text-center">
        <span className="inline-block mb-5 px-3.5 py-1 border border-white/20 rounded-full text-white/55 text-xs tracking-widest uppercase backdrop-blur-sm bg-white/5">
          Türkiye'nin #1 Mekan Yönetim Platformu
        </span>
        <h2 className="text-white text-4xl sm:text-5xl font-semibold leading-tight max-w-xl mb-5" style={{ fontFamily: "'Playfair Display',serif" }}>
          Etkinliğinize mükemmel mekanı bulun
        </h2>
        <p className="text-white/55 text-sm sm:text-base max-w-md leading-relaxed mb-8">
          500'den fazla özel mekan, kusursuz rezervasyon yönetimi. Düğününüzden kurumsal etkinliğinize kadar her organizasyon için.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
    onClick={() => onOpenDrawer("register")}
    className="flex items-center gap-2 px-7 py-3 bg-white text-foreground font-medium rounded-xl hover:bg-white/90 transition-all hover:scale-105 active:scale-[.98] text-sm shadow-lg"
  >
            Ücretsiz Üye Ol <ArrowRight size={14} />
          </button>
          <button
    onClick={() => onOpenDrawer("login")}
    className="flex items-center gap-2 px-7 py-3 border border-white/30 text-white rounded-xl hover:bg-white/10 transition-colors backdrop-blur-sm text-sm active:scale-[.98]"
  >
            Giriş Yap
          </button>
        </div>
      </div>

      {
    /* İstatistik bar */
  }
      <div className="relative z-10 px-5 sm:px-10 pb-10">
        <div className="max-w-lg mx-auto grid grid-cols-3 gap-3">
          {[["500+", "Mekan"], ["12K+", "Rezervasyon"], ["4.8\u2605", "Puan"]].map(([v, l]) => <div key={l} className="text-center py-3 px-2 bg-white/8 backdrop-blur-sm rounded-xl border border-white/10">
              <p className="text-white text-lg font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>{v}</p>
              <p className="text-white/40 text-xs mt-0.5">{l}</p>
            </div>)}
        </div>
      </div>
    </div>;
}
function LiveChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Merhaba! Ben MekanBul destek asistan\u0131y\u0131m. Nas\u0131l yard\u0131mc\u0131 olabilirim?", time: "\u015Eimdi" }
  ]);
  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);
  const now = () => (/* @__PURE__ */ new Date()).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" });
  const send = (text) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { from: "user", text, time: now() }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: BOT_RESP[text] || "Sorunuzu ald\u0131m. Destek ekibimiz en k\u0131sa s\xFCrede ileti\u015Fime ge\xE7ecek.", time: now() }]);
      setTyping(false);
    }, 1200);
  };
  return <>
      {!open && <button
    onClick={() => setOpen(true)}
    className="fixed bottom-20 lg:bottom-6 right-4 z-40 flex items-center gap-2.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-full shadow-xl hover:opacity-90 transition-all hover:scale-105 active:scale-95"
  >
          <MessageCircle size={16} />
          <span className="text-sm font-medium hidden sm:inline">Canlı Destek</span>
          <span className="size-2 rounded-full bg-green-400 animate-pulse" />
        </button>}
      {open && <div className={`fixed z-50 bg-card rounded-2xl shadow-2xl border border-border flex flex-col
          bottom-0 left-0 right-0 rounded-b-none sm:bottom-20 sm:right-4 sm:left-auto sm:rounded-2xl sm:w-88
          ${minimized ? "h-14" : "h-[58dvh] sm:h-[430px]"}`}>
          <div className="flex items-center justify-between px-4 py-3 bg-primary rounded-t-2xl shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="size-7 rounded-full bg-white/20 flex items-center justify-center"><MessageCircle size={13} className="text-white" /></div>
              <div>
                <p className="text-white text-sm font-medium leading-none">MekanBul Destek</p>
                <div className="flex items-center gap-1 mt-0.5"><span className="size-1.5 rounded-full bg-green-400" /><span className="text-white/55 text-xs">Çevrimiçi</span></div>
              </div>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setMinimized(!minimized)} className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"><Minimize2 size={13} /></button>
              <button onClick={() => {
    setOpen(false);
    setMinimized(false);
  }} className="p-1.5 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-colors"><X size={13} /></button>
            </div>
          </div>
          {!minimized && <>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((msg, i) => <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[82%] flex flex-col gap-1 ${msg.from === "user" ? "items-end" : "items-start"}`}>
                      <div className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${msg.from === "user" ? "bg-primary text-primary-foreground rounded-br-sm" : "bg-secondary text-foreground rounded-bl-sm"}`}>{msg.text}</div>
                      <span className="text-xs text-muted-foreground px-1">{msg.time}</span>
                    </div>
                  </div>)}
                {typing && <div className="flex justify-start">
                    <div className="bg-secondary px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                      {[0, 150, 300].map((d) => <span key={d} className="size-1.5 rounded-full bg-muted-foreground/60 animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
                    </div>
                  </div>}
                <div ref={bottomRef} />
              </div>
              {messages.length <= 2 && <div className="px-4 pb-2 flex flex-wrap gap-1.5 shrink-0">
                  {QUICK_Q.map((q) => <button key={q} onClick={() => send(q)} className="text-xs px-2.5 py-1.5 bg-secondary hover:bg-muted border border-border rounded-full text-foreground transition-colors">{q}</button>)}
                </div>}
              <div className="p-3 border-t border-border shrink-0">
                <div className="flex gap-2">
                  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && send(input)}
    placeholder="Mesajınızı yazın..."
    className="flex-1 px-3 py-2 bg-secondary border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground"
  />
                  <button onClick={() => send(input)} className="p-2.5 bg-primary text-primary-foreground rounded-xl hover:opacity-90 shrink-0 active:scale-95"><Send size={13} /></button>
                </div>
              </div>
            </>}
        </div>}
    </>;
}
function Reviews() {
  const [tab, setTab] = useState("venues");
  const list = tab === "venues" ? VENUE_REVIEWS : APP_REVIEWS;
  return <div className="space-y-5 pt-2">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>Değerlendirmeler</h3>
          <p className="text-xs text-muted-foreground mt-0.5">Müşterilerimizden gerçek görüşler</p>
        </div>
        <div className="flex rounded-lg border border-border bg-secondary/50 p-0.5 self-start">
          {["venues", "app"].map((t) => <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 text-xs rounded-md font-medium transition-all ${tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`}>
              {t === "venues" ? "Mekanlar" : "Uygulama"}
            </button>)}
        </div>
      </div>
      <div className="bg-card rounded-xl border border-border p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="text-center sm:pr-6 sm:border-r sm:border-border w-full sm:w-auto">
          <div className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>{tab === "venues" ? "4.8" : "4.7"}</div>
          <div className="flex gap-0.5 justify-center mt-1">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={12} fill="#8B6914" stroke="none" />)}</div>
          <p className="text-xs text-muted-foreground mt-1">{tab === "venues" ? "6" : "4"} değerlendirme</p>
        </div>
        <div className="flex-1 space-y-1.5 w-full">
          {[5, 4, 3, 2, 1].map((star) => {
    const total = tab === "venues" ? 6 : 4, count = star === 5 ? tab === "venues" ? 4 : 3 : star === 4 ? tab === "venues" ? 2 : 1 : 0;
    return <div key={star} className="flex items-center gap-2 text-xs">
                <span className="text-muted-foreground w-3">{star}</span><Star size={9} fill="#8B6914" stroke="none" className="shrink-0" />
                <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full rounded-full bg-accent" style={{ width: `${Math.round(count / total * 100)}%` }} /></div>
                <span className="text-muted-foreground w-4 text-right" style={{ fontFamily: "'DM Mono',monospace" }}>{count}</span>
              </div>;
  })}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {list.map((r) => <div key={r.id} className="bg-card rounded-xl border border-border p-4 flex flex-col gap-3 hover:shadow-md transition-shadow">
            <div className="flex gap-0.5">{[1, 2, 3, 4, 5].map((s) => <Star key={s} size={11} fill={s <= r.rating ? "#8B6914" : "none"} stroke={s <= r.rating ? "none" : "#C5BDB2"} />)}</div>
            <p className="text-sm text-foreground leading-relaxed flex-1">"{r.text}"</p>
            {"venue" in r && <span className="text-xs px-2.5 py-0.5 rounded-full font-medium self-start" style={{ backgroundColor: r.color + "18", color: r.color }}>{r.venue}</span>}
            <div className="flex items-center gap-2.5 pt-2 border-t border-border">
              <div className="size-7 rounded-full flex items-center justify-center text-xs font-semibold text-white shrink-0" style={{ backgroundColor: "venue" in r ? r.color : "#2C3E2D" }}>{r.avatar}</div>
              <div className="min-w-0"><p className="text-xs font-medium text-foreground truncate">{r.author}</p><p className="text-xs text-muted-foreground truncate">{r.role} · {r.date}</p></div>
            </div>
          </div>)}
      </div>
    </div>;
}
function Footer() {
  const socials = [
    { label: "Instagram", href: "#", icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg> },
    { label: "Twitter / X", href: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg> },
    { label: "LinkedIn", href: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
      </svg> },
    { label: "YouTube", href: "#", icon: <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
      </svg> }
  ];
  return <footer className="bg-primary text-primary-foreground mt-auto">
      {
    /* Ana grid */
  }
      <div className="px-5 sm:px-8 lg:px-12 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

        {
    /* Marka */
  }
        <div className="sm:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold mb-1" style={{ fontFamily: "'Playfair Display',serif" }}>MekanBul</h2>
          <p className="text-white/40 text-xs tracking-widest uppercase mb-3">Rezervasyon Sistemi</p>
          <p className="text-white/50 text-sm leading-relaxed mb-5">
            500'den fazla mekana hizmet veren Türkiye'nin önde gelen rezervasyon platformu.
          </p>
          {
    /* Sosyal medya ikonları */
  }
          <div className="flex gap-2">
            {socials.map((s) => <a
    key={s.label}
    href={s.href}
    aria-label={s.label}
    className="size-9 rounded-xl border border-white/15 flex items-center justify-center text-white/45 hover:text-white hover:border-white/40 hover:bg-white/8 transition-all"
  >
                {s.icon}
              </a>)}
          </div>
        </div>

        {
    /* Mekanlar */
  }
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white">Mekanlar</h4>
          <ul className="space-y-2">
            {["D\xFC\u011F\xFCn Salonlar\u0131", "Konferans", "A\xE7\u0131k Hava", "Restoranlar", "VIP"].map((l) => <li key={l}><button className="text-sm text-white/45 hover:text-white transition-colors">{l}</button></li>)}
          </ul>
        </div>

        {
    /* Platform (kısaltılmış) */
  }
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white">Platform</h4>
          <ul className="space-y-2">
            {["Fiyatland\u0131rma", "Gizlilik", "KVKK"].map((l) => <li key={l}><button className="text-sm text-white/45 hover:text-white transition-colors">{l}</button></li>)}
          </ul>
        </div>

        {
    /* İletişim + Harita */
  }
        <div>
          <h4 className="text-sm font-semibold mb-3 text-white">İletişim</h4>
          <ul className="space-y-2.5 mb-4">
            <li className="flex items-start gap-2"><MapPin size={12} className="text-white/35 shrink-0 mt-0.5" /><span className="text-sm text-white/45">Büyükdere Cad. No:185 Levent, İstanbul</span></li>
            <li className="flex items-center gap-2"><Phone size={11} className="text-white/35 shrink-0" /><span className="text-sm text-white/45">+90 212 444 62 63</span></li>
            <li className="flex items-center gap-2"><Mail size={11} className="text-white/35 shrink-0" /><span className="text-sm text-white/45">destek@mekanbul.com.tr</span></li>
          </ul>

        </div>
      </div>

      {
    /* Alt bar */
  }
      <div className="border-t border-white/10 px-5 sm:px-8 lg:px-12 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-xs text-white/30" style={{ fontFamily: "'DM Mono',monospace" }}>© 2026 MekanBul Teknoloji A.Ş. — Tüm hakları saklıdır.</p>
        <div className="flex gap-4">
          {["Ko\u015Fullar", "Gizlilik", "KVKK"].map((l) => <button key={l} className="text-xs text-white/30 hover:text-white/55 transition-colors">{l}</button>)}
        </div>
      </div>
    </footer>;
}
function BookingModal({ onClose }) {
  return <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-card rounded-t-2xl sm:rounded-2xl border border-border w-full sm:max-w-lg shadow-2xl max-h-[92dvh] overflow-y-auto">
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-border sticky top-0 bg-card z-10">
          <h3 className="font-semibold text-foreground text-base" style={{ fontFamily: "'Playfair Display',serif" }}>Yeni Rezervasyon</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-secondary transition-colors"><X size={15} className="text-muted-foreground" /></button>
        </div>
        <div className="p-5 sm:p-6 space-y-4">
          <div><label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Müşteri Adı</label>
            <input type="text" placeholder="Ad Soyad veya Şirket" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Mekan</label>
              <select className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30">
                {VENUES.map((v) => <option key={v.id}>{v.name}</option>)}</select></div>
            <div><label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Misafir Sayısı</label>
              <input type="number" placeholder="0" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div><label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Tarih</label>
              <input type="date" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
            <div><label className="block text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Saat</label>
              <input type="time" className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring/30" /></div>
          </div>
        </div>
        <div className="px-5 sm:px-6 py-4 border-t border-border flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 text-sm text-muted-foreground border border-border rounded-xl hover:bg-secondary transition-colors">İptal</button>
          <button onClick={onClose} className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground text-sm rounded-xl hover:opacity-90">
            <Check size={13} /> Onayla
          </button>
        </div>
      </div>
    </div>;
}
function MainApp({ user, onLogout }) {
  const [view, setView] = useState("dashboard");
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const venues = VENUES.filter(
    (v) => v.name.toLowerCase().includes(search.toLowerCase()) || v.type.toLowerCase().includes(search.toLowerCase())
  );
  const pageTitle = { dashboard: "Genel Bak\u0131\u015F", venues: "Mekanlar", bookings: "Rezervasyonlar", calendar: "Takvim" }[view];
  return <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "'Inter',sans-serif" }}>

      {
    /* Nav Çekmeçesi */
  }
      {drawerOpen && <div className="fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerOpen(false)} />
          <aside className="relative z-10 w-72 sm:w-80 bg-primary flex flex-col h-full shadow-2xl">
            <div className="px-6 py-6 border-b border-white/10 flex items-center justify-between">
              <div>
                <h1 className="text-primary-foreground text-xl font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>MekanBul</h1>
                <p className="text-white/35 text-xs mt-0.5 tracking-widest uppercase">Rezervasyon Sistemi</p>
              </div>
              <button onClick={() => setDrawerOpen(false)} className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"><X size={16} /></button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map(({ id, label, icon: Icon }) => <button
    key={id}
    onClick={() => {
      setView(id);
      setDrawerOpen(false);
    }}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${view === id ? "bg-white/15 text-white font-medium" : "text-white/50 hover:text-white hover:bg-white/8"}`}
  >
                  <Icon size={15} />{label}
                </button>)}
            </nav>
            <div className="px-3 py-4 border-t border-white/10 space-y-1">
              <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-white/50 hover:text-red-300 hover:bg-white/8 transition-all"><LogOut size={14} />Çıkış Yap</button>
              <div className="px-4 pt-3 flex items-center gap-3">
                <div className="size-9 rounded-full bg-accent flex items-center justify-center text-accent-foreground text-xs font-semibold">{user.avatar}</div>
                <div><p className="text-white text-sm font-medium">{user.name}</p><p className="text-white/35 text-xs">{user.google ? "Google" : "\xDCye"}</p></div>
              </div>
            </div>
          </aside>
        </div>}

      {
    /* Top Bar */
  }
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => setDrawerOpen((o) => !o)} className="p-2 rounded-xl hover:bg-secondary transition-colors active:scale-95">
            <Menu size={18} className="text-muted-foreground" />
          </button>
          <div>
            <h2 className="text-base font-semibold text-foreground leading-none" style={{ fontFamily: "'Playfair Display',serif" }}>{pageTitle}</h2>
            <p className="text-muted-foreground text-xs mt-0.5 hidden sm:block">10 Temmuz 2026, Cuma</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
    type="text"
    placeholder="Ara..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="pl-8 pr-3 py-2 bg-secondary text-foreground text-sm rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-ring/30 w-36"
  />
          </div>
          <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors">
            <Bell size={16} className="text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 size-1.5 bg-accent rounded-full" />
          </button>
          <button
    onClick={() => setShowModal(true)}
    className="flex items-center gap-1.5 px-3 py-2 bg-primary text-primary-foreground text-sm rounded-xl hover:opacity-90 transition-opacity active:scale-95"
  >
            <Plus size={13} /><span className="hidden sm:inline">Rezervasyon</span><span className="sm:hidden">Ekle</span>
          </button>
        </div>
      </header>

      {
    /* İçerik */
  }
      <main className="flex-1 overflow-auto pb-20 lg:pb-0">
        <div className="p-4 sm:p-6 lg:p-8">

          {
    /* GENEL BAKIŞ */
  }
          {view === "dashboard" && <div className="space-y-5 max-w-7xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden h-44 sm:h-52 bg-muted">
                <img src="https://images.unsplash.com/photo-1712314947761-a8d718bd8c32?w=1400&h=420&fit=crop&auto=format" alt="Balo salonu" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-10">
                  <p className="text-white/55 text-xs tracking-widest uppercase mb-1">Hoş Geldiniz</p>
                  <h2 className="text-white text-2xl sm:text-3xl font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>{user.name}</h2>
                  <p className="text-white/60 text-sm mt-1.5 hidden sm:block">Bugün 3 rezervasyon onay bekliyor.</p>
                  <button
    onClick={() => setShowModal(true)}
    className="mt-4 self-start flex items-center gap-1.5 px-4 py-2 bg-white text-foreground text-sm rounded-xl hover:bg-white/90 font-medium active:scale-95"
  >
                    <Plus size={12} />Rezervasyon Oluştur
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[{ label: "Bu Ay", value: "47", sub: "+12 \xF6nceki ay", color: "#2C3E2D" }, { label: "Doluluk", value: "%78", sub: "Ortalama", color: "#5A7A3A" }, { label: "Bekleyen", value: "5", sub: "Onay gerekiyor", color: "#8B4513" }].map((s) => <div key={s.label} className="bg-card rounded-xl border border-border p-3 sm:p-5">
                    <div className="text-xl sm:text-2xl font-semibold" style={{ fontFamily: "'Playfair Display',serif", color: s.color }}>{s.value}</div>
                    <div className="text-xs sm:text-sm font-medium text-foreground mt-0.5">{s.label}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 hidden sm:block">{s.sub}</div>
                  </div>)}
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4 sm:p-6">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>Yaklaşan Rezervasyonlar</h3>
                  <div className="space-y-2">
                    {BOOKINGS.map((b) => <div key={b.id} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/60 transition-colors">
                        <div className="text-center min-w-[40px]">
                          <p className="text-xs text-muted-foreground leading-none">{b.date.split(" ")[1]}</p>
                          <p className="text-lg font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>{b.date.split(" ")[0]}</p>
                        </div>
                        <div className="w-px h-8 bg-border shrink-0" />
                        <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground truncate">{b.client}</p><p className="text-xs text-muted-foreground truncate">{b.venue} · {b.time}</p></div>
                        <Badge status={b.status} />
                      </div>)}
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border p-4 sm:p-6">
                  <h3 className="font-semibold text-foreground mb-4" style={{ fontFamily: "'Playfair Display',serif" }}>Mekan Dolulukları</h3>
                  <div className="space-y-3">
                    {VENUES.slice(0, 6).map((v, i) => <div key={v.id}>
                        <div className="flex justify-between text-xs mb-1"><span className="text-foreground font-medium truncate pr-2">{v.name}</span><span className="text-muted-foreground shrink-0" style={{ fontFamily: "'DM Mono',monospace" }}>{OCCUPANCY[i]}%</span></div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${OCCUPANCY[i]}%`, backgroundColor: v.color }} /></div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}

          {
    /* MEKANLAR */
  }
          {view === "venues" && <div className="max-w-7xl mx-auto">
              <div className="sm:hidden mb-4">
                <div className="relative"><Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input type="text" placeholder="Mekan ara..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-3 bg-secondary text-foreground text-sm rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-ring/30" />
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-muted-foreground">{venues.length} mekan</p>
                <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm text-muted-foreground hover:bg-secondary transition-colors"><Filter size={12} />Filtrele</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {venues.map((venue) => <div
    key={venue.id}
    className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
    onClick={() => setSelectedVenue(selectedVenue === venue.id ? null : venue.id)}
  >
                    <div className="relative h-44 bg-muted overflow-hidden">
                      <img src={venue.image} alt={venue.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <div className="absolute bottom-3 left-3 flex gap-1">{venue.tags.slice(0, 2).map((t) => <span key={t} className="text-xs px-2 py-0.5 bg-white/20 backdrop-blur text-white rounded-full">{t}</span>)}</div>
                      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-0.5"><Star size={9} fill="#8B6914" stroke="none" /><span className="text-xs font-semibold text-foreground">{venue.rating}</span></div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>{venue.name}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">{venue.type}</p>
                      <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground"><Users size={11} /><span>Maks. {venue.capacity}</span></div>
                        <span className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display',serif", color: venue.color }}>₺{venue.price.toLocaleString("tr-TR")}</span>
                      </div>
                      {selectedVenue === venue.id && <button onClick={(e) => {
    e.stopPropagation();
    setShowModal(true);
  }} className="mt-3 w-full py-2.5 bg-primary text-primary-foreground text-sm rounded-xl hover:opacity-90 transition-opacity active:scale-95">Rezervasyon Yap</button>}
                    </div>
                  </div>)}
              </div>
            </div>}

          {
    /* REZERVASYONLAR */
  }
          {view === "bookings" && <div className="space-y-4 max-w-7xl mx-auto">
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
                {["T\xFCm\xFC", "Onayl\u0131", "Beklemede", "\u0130ptal"].map((f, i) => <button key={f} className={`shrink-0 px-4 py-1.5 text-xs rounded-full border transition-colors ${i === 0 ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-secondary"}`}>{f}</button>)}
              </div>
              <div className="lg:hidden space-y-3">
                {BOOKINGS.map((b) => <div key={b.id} className="bg-card rounded-xl border border-border p-4">
                    <div className="flex items-start justify-between gap-3 mb-3"><div><p className="text-sm font-semibold text-foreground">{b.client}</p><p className="text-xs text-muted-foreground mt-0.5">{b.venue}</p></div><Badge status={b.status} /></div>
                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar size={10} />{b.date}</span>
                      <span className="flex items-center gap-1"><Clock size={10} /><span style={{ fontFamily: "'DM Mono',monospace" }}>{b.time}</span></span>
                      <span className="flex items-center gap-1"><Users size={10} />{b.guests} kişi</span>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                      <span className="text-sm font-semibold" style={{ fontFamily: "'Playfair Display',serif" }}>₺{(b.guests * 120).toLocaleString("tr-TR")}</span>
                      <button className="text-xs text-accent hover:underline font-medium">Düzenle</button>
                    </div>
                  </div>)}
              </div>
              <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border"><h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>Tüm Rezervasyonlar</h3></div>
                <table className="w-full">
                  <thead><tr className="border-b border-border bg-secondary/40">{["M\xFC\u015Fteri", "Mekan", "Tarih & Saat", "Misafir", "Tutar", "Durum", ""].map((h) => <th key={h} className="text-left text-xs text-muted-foreground font-medium px-6 py-3">{h}</th>)}</tr></thead>
                  <tbody>
                    {BOOKINGS.map((b, i) => <tr key={b.id} className={`border-b border-border hover:bg-secondary/30 transition-colors ${i % 2 !== 0 ? "bg-secondary/10" : ""}`}>
                        <td className="px-6 py-4"><p className="text-sm font-medium text-foreground">{b.client}</p></td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{b.venue}</td>
                        <td className="px-6 py-4"><p className="text-sm text-foreground">{b.date}</p><p className="text-xs text-muted-foreground" style={{ fontFamily: "'DM Mono',monospace" }}>{b.time}</p></td>
                        <td className="px-6 py-4"><div className="flex items-center gap-1 text-sm text-muted-foreground"><Users size={11} />{b.guests}</div></td>
                        <td className="px-6 py-4"><span className="text-sm font-medium" style={{ fontFamily: "'Playfair Display',serif" }}>₺{(b.guests * 120).toLocaleString("tr-TR")}</span></td>
                        <td className="px-6 py-4"><Badge status={b.status} /></td>
                        <td className="px-6 py-4"><button className="text-xs text-accent hover:underline">Düzenle</button></td>
                      </tr>)}
                  </tbody>
                </table>
              </div>
              <Reviews />
            </div>}

          {
    /* TAKVİM */
  }
          {view === "calendar" && <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
              <div className="lg:col-span-2 bg-card rounded-xl border border-border p-4 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-semibold text-foreground" style={{ fontFamily: "'Playfair Display',serif" }}>Temmuz 2026</h3>
                  <div className="flex gap-1">
                    <button className="p-2 rounded-xl hover:bg-secondary transition-colors"><ChevronLeft size={15} className="text-muted-foreground" /></button>
                    <button className="p-2 rounded-xl hover:bg-secondary transition-colors"><ChevronRight size={15} className="text-muted-foreground" /></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 mb-1">{CAL_DAYS.map((d) => <div key={d} className="text-center text-xs font-medium text-muted-foreground py-2">{d}</div>)}</div>
                <div className="grid grid-cols-7 gap-0.5">
                  {MONTH_DAYS.map(({ day, prev, next }, idx) => {
    const isBusy = !prev && !next && BUSY_DAYS.includes(day);
    const isPartial = !prev && !next && PARTIAL_DAYS.includes(day);
    const isSel = selectedDay === day && !prev && !next;
    const isToday = day === 10 && !prev && !next;
    return <button
      key={idx}
      onClick={() => !prev && !next && setSelectedDay(day)}
      className={`aspect-square flex flex-col items-center justify-center rounded-xl text-xs sm:text-sm transition-all
                          ${prev || next ? "text-muted-foreground/30 cursor-default" : "hover:bg-secondary cursor-pointer"}
                          ${isSel ? "bg-primary text-primary-foreground hover:bg-primary" : ""}
                          ${isToday && !isSel ? "ring-2 ring-accent" : ""}`}
    >
                        <span className={`font-medium ${isToday && !isSel ? "text-accent" : ""}`}>{day}</span>
                        {(isBusy || isPartial) && !prev && !next && <div className="flex gap-0.5 mt-0.5">
                            {isBusy ? <><div className="size-1 rounded-full bg-accent" /><div className="size-1 rounded-full bg-accent" /><div className="size-1 rounded-full bg-accent" /></> : <div className="size-1 rounded-full bg-primary/40" />}
                          </div>}
                      </button>;
  })}
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-card rounded-xl border border-border p-4 sm:p-5">
                  <h4 className="font-semibold text-foreground mb-3" style={{ fontFamily: "'Playfair Display',serif" }}>{selectedDay ? `${selectedDay} Temmuz` : "Bug\xFCn \u2014 10 Temmuz"}</h4>
                  <div className="space-y-2">
                    {BOOKINGS.slice(0, 3).map((b) => <div key={b.id} className="flex gap-3 p-3 bg-secondary/50 rounded-xl">
                        <div className="text-xs font-medium mt-0.5 shrink-0" style={{ fontFamily: "'DM Mono',monospace", color: "#8B6914" }}>{b.time}</div>
                        <div className="min-w-0"><p className="text-xs font-medium text-foreground truncate">{b.client}</p><p className="text-xs text-muted-foreground truncate">{b.venue}</p></div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>}
        </div>
        <Footer />
      </main>

      {
    /* Alt navigasyon — mobil */
  }
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-card border-t border-border z-40 flex">
        {NAV_ITEMS.map(({ id, label, icon: Icon }) => <button
    key={id}
    onClick={() => setView(id)}
    className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-colors ${view === id ? "text-primary" : "text-muted-foreground"}`}
  >
            <Icon size={19} strokeWidth={view === id ? 2.2 : 1.6} />
            <span className="text-[10px] font-medium leading-none">{label.split(" ")[0]}</span>
          </button>)}
      </nav>

      {showModal && <BookingModal onClose={() => setShowModal(false)} />}
      <LiveChat />
    </div>;
}
function App() {
  const [user, setUser] = useState(null);
  const [drawerMode, setDrawerMode] = useState(null);
  const handleLogin = (u) => {
    setUser(u);
    setDrawerMode(null);
  };
  const handleLogout = () => setUser(null);
  if (user) return <MainApp user={user} onLogout={handleLogout} />;
  return <>
      <LandingPage onOpenDrawer={setDrawerMode} />
      {drawerMode && <AuthDrawer mode={drawerMode} onClose={() => setDrawerMode(null)} onLogin={handleLogin} />}
    </>;
}
export {
  App as default
};
