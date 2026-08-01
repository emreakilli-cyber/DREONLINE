# -*- coding: utf-8 -*-
"""Katalogdaki tüm FT kitaplarını yeniden üretip powerup.json'a yazar."""
import json,re,sys
sys.path.insert(0,'/home/claude/dnt')
import ft_ekle, ft_katalog

h=open('/home/claude/dnt/sablon_v23.html',encoding='utf-8').read()
T=json.loads(re.search(r'const KONU_DAG=(\{.*?\});\n',h,re.S).group(1))
KSL=[x.strip().strip("'") for x in
     re.search(r'const KS_KONU=\[(.*?)\];',h,re.S).group(1).replace('\n','').split(',') if x.strip()]

P=json.load(open('/home/claude/dnt/powerup.json'))
P=[u for u in P if u.get('kitap') not in ft_katalog.KATALOG]

# ⚠ PROGRAMDA OLAN BÖLÜMLER HAVUZA GİRMEZ · çift sayım olurdu.
#   FT Biyokimya'nın beş bölümü zaten görev olarak programda; sayfa
#   aralığı örtüşen havuz kaydı eklenmiyor. Kitap sekmesinde bölüm
#   yine görünüyor — program görevi olarak (bkz. §221).
GJ=json.loads(re.search(r'const GOREVLER=(\[[\s\S]*?\]);\n',
    open('/home/claude/dnt/app_gorev.json',encoding='utf-8').read()
    if False else '[]').group(1)) if False else None
GOR=json.load(open('/home/claude/dnt/app_gorev.json'))
if isinstance(GOR,dict): GOR=GOR.get('gorevler') or GOR.get('G') or []
def prog_sf(kitap):
    a=[]
    for g in GOR:
        src=str(g.get('src') or '')
        nm=re.sub(r'\s*sf\s.*$','',src).strip()
        if nm!=kitap: continue
        # ⚠ Bir görev BİRDEN ÇOK aralık taşıyabiliyor:
        #   "Anatomi Fast Track sf 49–55 + 90–119 + 126–127"
        #   Tek eşleşme aranınca yalnız ilki görülüyor, kalan bölümler
        #   programda olmasına rağmen havuza da giriyordu.
        for m in re.finditer(r'(\d+)\s*[–-]\s*(\d+)',src):
            a.append((int(m.group(1)),int(m.group(2))))
    return a
ozet=[]
for kitap,C in ft_katalog.KATALOG.items():
    KD=dict(T[C['kd']])
    if C.get('ks_haric'): KD={k:v for k,v in KD.items() if k not in KSL}
    for c in C.get('cikar',[]): KD.pop(c,None)
    hedef=C.get('hedef') or sum(KD.values())
    K,tsf=ft_ekle.uret(kitap,C['grup'],C['brans'],C['bolum'],KD,hedef)
    pf=prog_sf(kitap)
    if pf:
        onc=len(K)
        # ⚠ Program aralıkları bitiş sayfasını bir sonrakinin başlangıcı
        #   yapıyor (17–25, 25–43). Salt kesişim testi bu SINIR
        #   temasını örtüşme sayıp bölümü yanlışlıkla eliyordu
        #   (Kardiyovasküler, Otakoidler, İmmün Modülatör). Anlamlı
        #   örtüşme: kesişim ≥ bölümün yarısı.
        def ort(x):
            for a,b in pf:
                k=min(x['sf'][1],b)-max(x['sf'][0],a)+1
                if k>0 and k>=(x['sf'][1]-x['sf'][0]+1)*0.5: return True
            return False
        K=[x for x in K if not ort(x)]
        if onc!=len(K): print('  %s · %d bölüm programda, havuzdan çıkarıldı'%(kitap,onc-len(K)))
    for x in K:
        o=(C.get('ozel') or {}).get(x['konu'])
        if o:
            if 'soru_sabit' in o: x['soru']=o['soru_sabit']
            if 'soru_kd' in o: x['soru']=round(T[o['soru_kd'][0]].get(o['soru_kd'][1],0),2)
            if 'grup' in o: x['grup']=o['grup']
            if 'brans' in o: x['brans']=o['brans']
        x.pop('esles',None)
    P.extend(K)
    ozet.append((kitap,len(K),tsf,sum(x['saat'] for x in K),sum(x['soru'] for x in K)))

json.dump(P,open('/home/claude/dnt/powerup.json','w'),ensure_ascii=False,indent=1)
print('%-22s %3s %5s %7s %8s'%('KİTAP','BÖL','SAYFA','SAAT','SORU'))
for k,n,sf,sa,so in ozet: print('%-22s %3d %5d %7.1f %8.2f'%(k,n,sf,sa,so))
print()
bozuk=[u for u in P if not isinstance(u.get('grup'),str) or not u.get('brans') or not (u.get('saat',0)>0)]
print('powerup.json: %d konu · bozuk kayıt: %d'%(len(P),len(bozuk)))
