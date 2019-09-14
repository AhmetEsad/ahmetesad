# ahmetesad

0.0.2 Güncellemesi:
- Baştan yazılıyor.
- Electron yerine konsol kullanılıyor (teşekkürler inquirer modülü)
- Yazdır komutu eklendi, kullanım: beyaz/kırmızı/sarı/yeşil/mavi renk ile konsola "selam" yazdır
- ARTIK BAŞKA SATIRLAR KULLANILABİLİYOR! Evet yanlış duymadınız.
- Artık tek tırnak (\') veya şu adını bilmediğim şey (\`) kullanılamıyor. " kullanmanız gerekiyor (Aynı kodu ' ve \` için kopyalayamayacak kadar üşengecim).
- Kaydet komutu eklendi, kullanım: isim = "Ahmet" (isim, JSON dosyasında Ahmet olarak kaydedilir)
- Sil komutu eklendi, kullanım: isim objesini sil (isim, JSON dosyasından kaldırılır)
- Bekle komutu eklendi, kullanım: 1000 ms bekle (kendisinden sonra gelen komutu gerçekleştirmeden önce 1000ms / 1 saniye bekler)
- Yeniden adlandır komutu eklendi, kullanım: ilkİsim, yeniİsim (yeniden adlandırır)
- Sor komutu eklendi, kullanım: "Adınız nedir?" diye sor (konsola soru gelir ve JSON'a 'cevap' olarak kaydedilir. Yeniden adlandırmayı unutmayın!)
- BİTTİ Mİ? ELBETTE HAYIR! Artık TAMAMEN OTOMATİK güncelleniyor! (Kısacası kodu düzenledikten sonra yedeğini alın çünkü üzerine yazılabilir)

0.0.3 Güncellemesi İçin Planlar:
- Skript içerisinden skript çalıştırma.

0.0.2 Sürümündeki Bilinen Hatalar:
- Sor komutunda cevap için yeterli süre vermiyor - direk geçiyor. Bekleme komutu da işe yaramıyor. Sor komutlarını şimdilik son satırlara yazın.

Dosya Örnek Kullanımı:
* mavi renk ile konsola "selam" yazdır
 & sarı renk ile konsola "nasılsın?" yazdır
 & yeşil renk ile konsola "iyiyim" yazdır

Skript Örnek Kullanımı:
* mavi renk ile konsola "selam" yazdır & sarı renk ile konsola "nasılsın?" yazdır & yeşil renk ile konsola "iyiyim" yazdır

Nasıl Çalıştırılır?
- node dil.js
veya
- npm run başlat
