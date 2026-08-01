# -*- coding: utf-8 -*-
import subprocess,sys
r=subprocess.run([sys.executable,'kural_test.py'],capture_output=True,text=True)
print(r.stdout)
if r.returncode: print('ÜRETİM DURDURULDU — kural testi başarısız'); sys.exit(1)
import json
G=json.load(open('app_gorev.json')); DEN=json.load(open('denemeler.json'))
KOM=json.load(open('kombo.json'))
ISARET=json.load(open('isaret.json'))
KH=json.load(open('kaynak_harita.json'))
PU=json.load(open('powerup.json'))
SORU=json.load(open('soru_tablo.json'))
TOHUM=json.load(open('tohum.json'))
h=open('sablon_v23.html').read()
J=lambda o:json.dumps(o,ensure_ascii=False)
for pat,val in [('/*__G__*/[]',J(G)),('/*__D__*/[]',J(TOHUM)),('/*__S__*/{}',J(SORU)),
                ('/*__K__*/[]',J(KOM)),('/*__I__*/[]',J(ISARET)),
                ('/*__P__*/[]',J(PU)),('/*__H__*/{}',J(KH))]:
    assert pat in h, 'yer tutucu yok: '+pat
    h=h.replace(pat,val,1)
assert '__G__' not in h and '__H__' not in h, 'yer tutucu kaldı'
# DÜZELTME: eski sürüm dizesi şablonda yoktu, sessiz boş işlemdi. Artık gerçek sürümü arıyoruz.
ESKI="const SURUM='2027-02-08a'"; YENI="const SURUM='2027-02-07a'"
assert ESKI in h, 'sürüm dizesi bulunamadı: '+ESKI
h=h.replace(ESKI,YENI)
assert YENI in h
open('/mnt/user-data/outputs/index.html','w').write(h)
print("kombo %d · işaret %d · %d bayt · sürüm 2026-07-28a"%(len(KOM),len(ISARET),len(h)))
