# -*- coding: utf-8 -*-
"""
UNUTMA ve TEKRAR MODELİ — FSRS-4.5/5, parametreler kaynaktan doğrulandı (28 Tem).

    R(t,S) = (1 + FACTOR·t/S)^DECAY      FACTOR = 19/81 · DECAY = −0.5

Kaynak: open-spaced-repetition/awesome-fsrs wiki "The Algorithm".
  · FSRS v4    : DECAY = −1     · FACTOR = 1/9
  · FSRS-4.5/5 : DECAY = −0.5   · FACTOR = 19/81      ← kullanılan
  · FSRS-6     : DECAY kullanıcıya göre öğrenilebilir (0.1–0.8)

TANIM · S (kararlılık) = hatırlamanın %90'a düştüğü GÜN sayısı.
        Yarılanma ömrü DEĞİL. R(S,S) = 0.90 her zaman.

Neden güç yasası: farklı kararlılıktaki üstel eğrilerin toplamı bir güç
fonksiyonuyla daha iyi yaklaşılıyor (Expertium, FSRS teknik açıklaması).
Karışık zorluktaki materyalin ortalamasını temsil ediyor.

BAŞLANGIÇ KARARLILIĞI · FSRS-4.5 varsayılan ağırlıkları w[0..3] =
[0.4, 0.6, 2.4, 5.8] — sırasıyla Again/Hard/Good/Easy ilk kararlılığı (gün).
Bir konuyu dikkatle okumayı "Good" kabul ediyoruz: S₁ = 2.4 gün.

⚠ SINIR · FSRS kart (flashcard) için kalibre edilmiştir. Bir kitap bölümünü
okumak tek bir kart değildir; bu model KABA bir yaklaşımdır, kesin tahmin değil.
Yönü ve büyüklük mertebesi doğrudur, ondalıkları değil.
"""
FACTOR=19/81.0
DECAY=-0.5
S_ILK=2.4          # FSRS-4.5 w[2], "Good" ilk kararlılık (gün)
S_CARPAN=2.5       # her başarılı tekrarın kararlılığı yaklaşık kaç katına çıkardığı

def R(t,S):
    """t gün sonra hatırlama olasılığı."""
    if S<=0: return 0.0
    return (1.0+FACTOR*float(t)/S)**DECAY

def S_sonra(tekrar):
    """tekrar=0 → yalnız ilk okuma. tekrar=1 → bir tekrar yapılmış."""
    return S_ILK*(S_CARPAN**tekrar)

def aralik(S,hedef=0.9):
    """R'nin hedefe düştüğü gün — bir sonraki tekrarın optimum zamanı."""
    return S/FACTOR*(hedef**(1.0/DECAY)-1.0)

def kalan(gun_once, tekrar=0):
    """Sınavdan `gun_once` gün önce çalışılan konunun sınavda hatırlanma oranı."""
    return R(gun_once, S_sonra(tekrar))

if __name__=='__main__':
    print('FSRS-4.5 · FACTOR=%.6f · DECAY=%.1f · S_ilk=%.1f gün'%(FACTOR,DECAY,S_ILK))
    print('doğrulama: R(S,S) = %.4f  (0.9000 olmalı)'%R(S_ILK,S_ILK))
    print()
    print('%8s %s'%('S(gün)',' '.join('%7s'%('%dg'%d) for d in (1,3,7,14,21,25))))
    for n in range(4):
        S=S_sonra(n)
        print('%8.1f %s   %s'%(S,' '.join('%6.0f%%'%(100*R(d,S)) for d in (1,3,7,14,21,25)),
              'ilk okuma' if n==0 else '%d tekrar'%n))
    print()
    print('OPTİMUM TEKRAR ARALIĞI (R %90a düşünce)')
    for n in range(3):
        S=S_sonra(n); print('  %d tekrar sonrası S=%.1f → sonraki tekrar %.1f gün sonra'%(n,S,aralik(S)))
