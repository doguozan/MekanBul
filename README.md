MekanBul

Mekan/işletme rezervasyon sistemi için geliştirilen bir demo uygulama. Düğün salonu, konferans salonu, teras, restoran gibi etkinlik mekanlarının keşfedilip rezerve edilebildiği bir müşteri arayüzü ile mekan sahiplerinin rezervasyonlarını, doluluk takvimini ve performansını takip edebildiği bir yönetim paneli içerir.

Bu proje production'a alınmamıştır; amacı bir ürün fikrini uçtan uca (UI/UX tasarımından çalışan bir arayüze) taşıma sürecini göstermektir.

Öne Çıkan Özellikler

Müşteri Tarafı


Kategori ve kapasiteye göre filtrelenebilir mekan listesi
Mekan detay, fiyat ve müsaitlik bilgisi
Telefon (OTP) ve Google ile giriş akışı
Canlı destek chatbotu (sık sorulan sorular)
Mekan yorumları ve değerlendirme sistemi


Yönetim Paneli


Genel bakış (doluluk oranı, aylık istatistikler)
Rezervasyon listesi ve durum takibi (onaylı / beklemede / iptal)
Aylık doluluk takvimi
Mekan bazlı performans ve müşteri geri bildirimleri


Teknoloji


React (JavaScript)
Vite — build/dev sunucusu
Tailwind CSS — stil sistemi
shadcn/ui & Radix UI — erişilebilir UI bileşenleri
Recharts — istatistik grafikleri
Lucide React — ikon seti
React Hook Form — form yönetimi


Geliştirme Süreci

Proje, bir fullstack developer bakış açısıyla uçtan uca planlanarak hayata geçirildi:


Tasarım & Bileşen Mimarisi: Kullanıcı akışları Figma üzerinde kurgulandı; bileşen hiyerarşisi (müşteri arayüzü / yönetim paneli ayrımı, tekrar kullanılabilir UI parçaları) baştan planlandı.
Geliştirme: Kod tabanı, Cursor üzerinden zaman zaman AI desteği alınarak yazıldı. Bileşen yapısı, state/veri akışı, stil sistemi ve etkileşim mantığı geliştirici tarafından tasarlandı ve yönlendirildi.
Kullanılan Diller ve Kütüphaneler: JavaScript (JSX), CSS, HTML, React


Notlar


Bu bir demo/portfolyo projesidir; gerçek bir backend veya veritabanı bağlantısı yoktur, veriler örnek (mock) verilerdir.
Görseller Unsplash üzerinden, lisansına uygun şekilde kullanılmıştır.
Mobil uyumlu tasarım Figma aşamasında oluşturulmuştur; ancak proje şu an yalnızca web olarak kodlanmıştır, ayrı bir mobil (iOS/Android) kod tabanı bulunmamaktadır.


npm install
npm run dev