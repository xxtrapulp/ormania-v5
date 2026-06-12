# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sections.spec.ts >> fr — section visibility >> scroll-reveal elements animate in
- Location: e2e/sections.spec.ts:54:9

# Error details

```
Error: expect(received).toBeLessThanOrEqual(expected)

Expected: <= 2
Received:    23
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Aller au contenu" [ref=e2]:
    - /url: "#main"
  - banner [ref=e4]:
    - generic [ref=e5]:
      - link "Ormania home" [ref=e6]:
        - /url: /fr/
        - img "Ormania" [ref=e7]
      - navigation "Main" [ref=e8]:
        - link "Accueil" [ref=e10]:
          - /url: /fr/
          - text: Accueil
        - link "Collections" [ref=e13]:
          - /url: /fr/collections/
        - link "Instagram" [ref=e15]:
          - /url: /fr/instagram/
        - link "Sur mesure" [ref=e17]:
          - /url: /fr/custom/
        - link "Réparations" [ref=e19]:
          - /url: /fr/repairs/
        - link "Fiançailles" [ref=e21]:
          - /url: /fr/engagement/
        - link "Visite" [ref=e23]:
          - /url: /fr/visit/
      - generic [ref=e24]:
        - link "Switch to English" [ref=e25]:
          - /url: /en/
          - generic [ref=e26]: EN
          - generic [ref=e27]: /
          - generic [ref=e28]: FR
        - button "Pièces sauvegardées" [ref=e29]:
          - img [ref=e30]
        - button "Comparer" [ref=e32]:
          - img [ref=e33]
        - link "Prendre rendez-vous" [ref=e37]:
          - /url: /fr/engagement/#book
  - main [ref=e39]:
    - region "Hero" [ref=e43]:
      - generic: ORMANIA
      - generic [ref=e45]:
        - img "Bijouterie Ormania" [ref=e48]
        - generic [ref=e50]:
          - generic [ref=e51]: Bijouterie Ormania — Laval
          - heading "D e s b i j o u x f a i t s p o u r ê t r e m é m o r a b l e s ." [level=1] [ref=e53]:
            - generic [ref=e54]:
              - generic [ref=e55]:
                - generic [ref=e56]: D
                - generic [ref=e57]: e
                - generic [ref=e58]: s
              - generic [ref=e61]:
                - generic [ref=e62]: b
                - generic [ref=e63]: i
                - generic [ref=e64]: j
                - generic [ref=e65]: o
                - generic [ref=e66]: u
                - generic [ref=e67]: x
              - generic [ref=e70]:
                - generic [ref=e71]: f
                - generic [ref=e72]: a
                - generic [ref=e73]: i
                - generic [ref=e74]: t
                - generic [ref=e75]: s
              - generic [ref=e78]:
                - generic [ref=e79]: p
                - generic [ref=e80]: o
                - generic [ref=e81]: u
                - generic [ref=e82]: r
              - generic [ref=e85]:
                - generic [ref=e86]: ê
                - generic [ref=e87]: t
                - generic [ref=e88]: r
                - generic [ref=e89]: e
              - generic [ref=e92]:
                - generic [ref=e93]: m
                - generic [ref=e94]: é
                - generic [ref=e95]: m
                - generic [ref=e96]: o
                - generic [ref=e97]: r
                - generic [ref=e98]: a
                - generic [ref=e99]: b
                - generic [ref=e100]: l
                - generic [ref=e101]: e
                - generic [ref=e102]: s
                - generic [ref=e103]: .
          - paragraph [ref=e105]: Bijouterie fine, pièces sur mesure, réparations, montres et cadeaux intemporels — au cœur de Laval.
          - generic [ref=e106]:
            - link "Voir les collections" [ref=e107]:
              - /url: /fr/collections/
              - generic [ref=e108]: Voir les collections
              - generic [ref=e109]: →
            - link "Prendre rendez-vous" [ref=e110]:
              - /url: /fr/engagement/#book
              - generic [ref=e111]: Prendre rendez-vous
          - link "Vu quelque chose sur Instagram ?" [ref=e113]:
            - /url: /fr/instagram/
            - img [ref=e114]
            - text: Vu quelque chose sur Instagram ?
            - generic [ref=e117]: →
      - link "Défiler" [ref=e121]:
        - /url: "#featured"
        - text: Défiler
        - img [ref=e122]
    - generic [ref=e123]:
      - generic [ref=e125]:
        - generic [ref=e126]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e127]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e128]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e129]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e130]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e131]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
      - generic [ref=e133]:
        - generic [ref=e134]:
          - text: Bijouterie Ormania — Laval
          - heading "Ormania transforme les moments de la vie en pièces que vous gardez près de vous." [level=2] [ref=e135]:
            - generic [ref=e136]:
              - generic [ref=e138]: Ormania
              - generic [ref=e140]: transforme
              - generic [ref=e142]: les
              - generic [ref=e144]: moments
              - generic [ref=e146]: de
              - generic [ref=e148]: la
              - generic [ref=e150]: vie
              - generic [ref=e152]: en
              - generic [ref=e154]: pièces
              - generic [ref=e156]: que
              - generic [ref=e158]: vous
              - generic [ref=e160]: gardez
              - generic [ref=e162]: près
              - generic [ref=e164]: de
              - generic [ref=e166]: vous.
        - paragraph [ref=e169]: Une bijouterie à Laval pour les pièces fines, les cadeaux significatifs, le travail sur mesure, les réparations, les montres et les moments de fiançailles.
    - generic [ref=e171]:
      - text: Services phares
      - heading "Notre savoir-faire, à votre service." [level=2] [ref=e172]
      - generic [ref=e173]:
        - generic [ref=e175]:
          - img [ref=e177]
          - generic [ref=e180]:
            - heading "Design sur mesure" [level=3] [ref=e181]
            - paragraph [ref=e182]: De l'idée à la pièce finie.
            - paragraph [ref=e183]: Apportez-nous un croquis, une photo ou simplement une impression. Nous vous guidons à travers les matériaux, les pierres et le design jusqu'à ce que tout soit parfait.
        - generic [ref=e185]:
          - img [ref=e187]
          - generic [ref=e189]:
            - heading "Restauration de bijoux" [level=3] [ref=e190]
            - paragraph [ref=e191]: Réparations, mise à grandeur, polissage et travail de pierres.
            - paragraph [ref=e192]: Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval avec soin et précision.
        - generic [ref=e194]:
          - img [ref=e196]
          - generic [ref=e198]:
            - heading "Conseil pour fiançailles" [level=3] [ref=e199]
            - paragraph [ref=e200]: Aide personnalisée pour choisir ou créer la bague.
            - paragraph [ref=e201]: Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.
        - generic [ref=e203]:
          - img [ref=e205]
          - generic [ref=e209]:
            - heading "Curation de cadeaux" [level=3] [ref=e210]
            - paragraph [ref=e211]: Aide pour trouver quelque chose de significatif.
            - paragraph [ref=e212]: Vous ne savez pas quoi choisir ? Parlez-nous de la personne et de l'occasion. Nous vous suggérerons des pièces qui semblent personnelles et durables.
    - generic [ref=e214]:
      - generic [ref=e215]:
        - text: Shop par intention
        - heading "Comment pouvons-nous vous aider ?" [level=2] [ref=e216]
      - generic [ref=e217]:
        - generic [ref=e218] [cursor=pointer]:
          - generic [ref=e219]:
            - img [ref=e221]
            - generic [ref=e224]: Sur mesure
          - heading "Personnalisez" [level=3] [ref=e225]
          - paragraph [ref=e226]: Bijoux sur mesure, gravure, pièces significatives.
          - generic [ref=e227]:
            - generic [ref=e228]: Explorer
            - generic [ref=e229]: →
        - generic [ref=e230] [cursor=pointer]:
          - generic [ref=e231]:
            - img [ref=e233]
            - generic [ref=e235]: Fiançailles
          - heading "Marquez un jalon" [level=3] [ref=e236]
          - paragraph [ref=e237]: Fiançailles, anniversaire, remise de diplôme, moments spéciaux.
          - generic [ref=e238]:
            - generic [ref=e239]: Explorer
            - generic [ref=e240]: →
        - generic [ref=e241] [cursor=pointer]:
          - generic [ref=e242]:
            - img [ref=e244]
            - generic [ref=e250]: Explorer
          - heading "Or au quotidien" [level=3] [ref=e251]
          - paragraph [ref=e252]: Chaînes, bagues, bracelets et pièces du quotidien.
          - generic [ref=e253]:
            - generic [ref=e254]: Explorer
            - generic [ref=e255]: →
        - generic [ref=e256] [cursor=pointer]:
          - generic [ref=e257]:
            - img [ref=e259]
            - generic [ref=e263]: Homme
          - heading "Pour lui" [level=3] [ref=e264]
          - paragraph [ref=e265]: Bagues homme, chaînes, montres et cadeaux.
          - generic [ref=e266]:
            - generic [ref=e267]: Explorer
            - generic [ref=e268]: →
        - generic [ref=e269] [cursor=pointer]:
          - generic [ref=e270]:
            - img [ref=e272]
            - generic [ref=e274]: Réparer
          - heading "Réparez ce qui compte" [level=3] [ref=e275]
          - paragraph [ref=e276]: Agrandir, restaurer, polir et réparer les pièces que vous aimez.
          - generic [ref=e277]:
            - generic [ref=e278]: Explorer
            - generic [ref=e279]: →
        - generic [ref=e280] [cursor=pointer]:
          - generic [ref=e281]:
            - img [ref=e283]
            - generic [ref=e286]: Trouver
          - heading "Trouvez un cadeau" [level=3] [ref=e287]
          - paragraph [ref=e288]: Idées de cadeaux guidées par occasion, style et budget.
          - generic [ref=e289]:
            - generic [ref=e290]: Explorer
            - generic [ref=e291]: →
    - generic [ref=e292]:
      - generic [ref=e294]:
        - generic [ref=e295]:
          - generic [ref=e296]:
            - generic [ref=e297]: D
            - generic [ref=e298]: é
            - generic [ref=e299]: c
            - generic [ref=e300]: o
            - generic [ref=e301]: u
            - generic [ref=e302]: v
            - generic [ref=e303]: r
            - generic [ref=e304]: i
            - generic [ref=e305]: r
          - heading "Nos collections, prêtes en boutique." [level=2] [ref=e306]:
            - generic [ref=e308]: Nos
            - generic [ref=e310]: collections,
            - generic [ref=e312]: prêtes
            - generic [ref=e314]: en
            - generic [ref=e316]: boutique.
          - paragraph [ref=e318]: Des pièces de tous les jours aux commandes d'exception — découvrez Ormania cette saison.
        - generic [ref=e319]:
          - link "Chaînes et colliers Chaînes et colliers Chaînes cubaines, torsades et pièces diamantées — or massif, en boutique. Voir" [ref=e322]:
            - /url: /fr/collections/#chains
            - img "Chaînes et colliers" [ref=e323]
            - generic [ref=e325]:
              - heading "Chaînes et colliers" [level=3] [ref=e326]
              - paragraph: Chaînes cubaines, torsades et pièces diamantées — or massif, en boutique.
              - generic [ref=e327]:
                - text: Voir
                - generic [ref=e328]: →
          - link "Bagues Bagues Jonc superposables, or affirmé et diamants de tous les jours. Voir" [ref=e331]:
            - /url: /fr/collections/#rings
            - img "Bagues" [ref=e332]
            - generic [ref=e334]:
              - heading "Bagues" [level=3] [ref=e335]
              - paragraph: Jonc superposables, or affirmé et diamants de tous les jours.
              - generic [ref=e336]:
                - text: Voir
                - generic [ref=e337]: →
          - link "Bracelets Bracelets Bracelets tennis et joncs en or qu'on ne retire jamais. Voir" [ref=e340]:
            - /url: /fr/collections/#bracelets
            - img "Bracelets" [ref=e341]
            - generic [ref=e343]:
              - heading "Bracelets" [level=3] [ref=e344]
              - paragraph: Bracelets tennis et joncs en or qu'on ne retire jamais.
              - generic [ref=e345]:
                - text: Voir
                - generic [ref=e346]: →
          - link "Montres Montres Montres suisses sélectionnées, piles et entretien. Voir" [ref=e349]:
            - /url: /fr/collections/#watches
            - img "Montres" [ref=e350]
            - generic [ref=e352]:
              - heading "Montres" [level=3] [ref=e353]
              - paragraph: Montres suisses sélectionnées, piles et entretien.
              - generic [ref=e354]:
                - text: Voir
                - generic [ref=e355]: →
          - link "Fiançailles Fiançailles Diamants naturels et de laboratoire, sertis pour durer. Voir" [ref=e358]:
            - /url: /fr/collections/#engagement
            - img "Fiançailles" [ref=e359]
            - generic [ref=e361]:
              - heading "Fiançailles" [level=3] [ref=e362]
              - paragraph: Diamants naturels et de laboratoire, sertis pour durer.
              - generic [ref=e363]:
                - text: Voir
                - generic [ref=e364]: →
          - link "Sur mesure Sur mesure Pièces uniques, conçues avec vous à l'atelier. Voir" [ref=e367]:
            - /url: /fr/collections/#custom
            - img "Sur mesure" [ref=e368]
            - generic [ref=e370]:
              - heading "Sur mesure" [level=3] [ref=e371]
              - paragraph: Pièces uniques, conçues avec vous à l'atelier.
              - generic [ref=e372]:
                - text: Voir
                - generic [ref=e373]: →
      - generic [ref=e375]:
        - paragraph [ref=e376]: Vu sur Instagram
        - generic [ref=e377]:
          - generic [ref=e378]:
            - article [ref=e379]:
              - link "Lab-Grown Tennis Bracelet — Instagram" [ref=e380]:
                - /url: https://www.instagram.com/p/DSAifEiDouU/
                - generic [ref=e381]:
                  - img "Lab-Grown Tennis Bracelet" [ref=e382]
                  - generic [ref=e385]: In stock
                  - generic [ref=e386]: Publié récemment
                  - generic [ref=e387]:
                    - heading "Lab-Grown Tennis Bracelet" [level=3] [ref=e388]
                    - paragraph [ref=e389]: Your new never-taking-it-off bracelet — lab-grown tennis, made to shine all season long.
              - button "Demander" [ref=e391]
            - article [ref=e392]:
              - link "Halo Diamond Necklace — Instagram" [ref=e393]:
                - /url: https://www.instagram.com/reel/DSdMAuPETdF/
                - generic [ref=e394]:
                  - img "Halo Diamond Necklace" [ref=e395]
                  - generic [ref=e397]:
                    - generic [ref=e398]: In store
                    - generic [ref=e399]:
                      - img [ref=e400]
                      - text: Réel
                  - generic [ref=e402]: Publié récemment
                  - generic [ref=e403]:
                    - heading "Halo Diamond Necklace" [level=3] [ref=e404]
                    - paragraph [ref=e405]: Halo diamond necklace, available in store.
              - button "Demander" [ref=e407]
            - article [ref=e408]:
              - link "Stack Your Rings — Instagram" [ref=e409]:
                - /url: https://www.instagram.com/reel/DSaTiT1jgKb/
                - generic [ref=e410]:
                  - img "Stack Your Rings" [ref=e411]
                  - generic [ref=e413]:
                    - generic [ref=e414]: In store
                    - generic [ref=e415]:
                      - img [ref=e416]
                      - text: Réel
                  - generic [ref=e418]: Publié récemment
                  - generic [ref=e419]:
                    - heading "Stack Your Rings" [level=3] [ref=e420]
                    - paragraph [ref=e421]: This is your sign to stack — custom jewelry, Laval.
              - button "Demander" [ref=e423]
            - article [ref=e424]:
              - link "Sterling Silver & Moissanite — Instagram" [ref=e425]:
                - /url: https://www.instagram.com/reel/DSVUrrLDrSl/
                - generic [ref=e426]:
                  - img "Sterling Silver & Moissanite" [ref=e427]
                  - generic [ref=e429]:
                    - generic [ref=e430]: In store
                    - generic [ref=e431]:
                      - img [ref=e432]
                      - text: Réel
                  - generic [ref=e434]: Publié récemment
                  - generic [ref=e435]:
                    - heading "Sterling Silver & Moissanite" [level=3] [ref=e436]
                    - paragraph [ref=e437]: Silver at its all-time high — S925 sterling silver moissanite pieces in store.
              - button "Demander" [ref=e439]
            - article [ref=e440]:
              - link "A Gift She'll Wear Every Day — Instagram" [ref=e441]:
                - /url: https://www.instagram.com/reel/DRzvxN2kWfn/
                - generic [ref=e442]:
                  - img "A Gift She'll Wear Every Day" [ref=e443]
                  - generic [ref=e445]:
                    - generic [ref=e446]: In store
                    - generic [ref=e447]:
                      - img [ref=e448]
                      - text: Réel
                  - generic [ref=e450]:
                    - heading "A Gift She'll Wear Every Day" [level=3] [ref=e451]
                    - paragraph [ref=e452]: Not sure what to get her? Start with something she'll wear every day.
              - button "Demander" [ref=e454]
            - article [ref=e455]:
              - link "Custom Pearl Earrings — Instagram" [ref=e456]:
                - /url: https://www.instagram.com/reel/DRP2awpjmhB/
                - generic [ref=e457]:
                  - img "Custom Pearl Earrings" [ref=e458]
                  - generic [ref=e460]:
                    - generic [ref=e461]: Commission
                    - generic [ref=e462]:
                      - img [ref=e463]
                      - text: Réel
                  - generic [ref=e465]:
                    - heading "Custom Pearl Earrings" [level=3] [ref=e466]
                    - paragraph [ref=e467]: A custom pair of earrings designed to match her pearls — a 65th birthday gift.
              - button "Demander" [ref=e469]
            - article [ref=e470]:
              - link "Baume & Mercier M0A10619 — Instagram" [ref=e471]:
                - /url: https://www.instagram.com/p/DHuHBHMuREj/
                - generic [ref=e472]:
                  - img "Baume & Mercier M0A10619" [ref=e473]
                  - generic [ref=e476]: In stock
                  - generic [ref=e477]:
                    - heading "Baume & Mercier M0A10619" [level=3] [ref=e478]
                    - paragraph [ref=e479]: New arrival — Baume & Mercier M0A10619, in stock and ready.
              - button "Demander" [ref=e481]
            - article [ref=e482]:
              - link "Men's Solitaire Diamond Ring — Instagram" [ref=e483]:
                - /url: https://www.instagram.com/reel/DCu5JdFO5TV/
                - generic [ref=e484]:
                  - img "Men's Solitaire Diamond Ring" [ref=e485]
                  - generic [ref=e487]:
                    - generic [ref=e488]: In store
                    - generic [ref=e489]:
                      - img [ref=e490]
                      - text: Réel
                  - generic [ref=e492]:
                    - heading "Men's Solitaire Diamond Ring" [level=3] [ref=e493]
                    - paragraph [ref=e494]: Our men's ring collection — crafted to bring elegance to every occasion.
              - button "Demander" [ref=e496]
          - generic [ref=e497]:
            - button "Téléverser une capture" [ref=e498]:
              - img [ref=e499]
              - text: Téléverser une capture
            - button "Coller un lien Instagram" [ref=e502]:
              - img [ref=e503]
              - text: Coller un lien Instagram
        - link "Voir tout le showroom" [ref=e507]:
          - /url: /fr/instagram/
          - text: Voir tout le showroom
          - generic [ref=e508]: →
      - generic [ref=e510]:
        - generic [ref=e521]: L'Artisanat
        - generic [ref=e522]:
          - generic [ref=e523]:
            - generic [ref=e524]: 01 / 04
            - heading "Conception" [level=2] [ref=e525]
            - paragraph [ref=e526]: Chaque pièce commence par une conversation. Nous esquissons, modélisons et peaufinons jusqu'à ce que cela vous ressemble.
          - generic [ref=e528]:
            - generic [ref=e529]: 02 / 04
            - heading "Sélection" [level=2] [ref=e530]
            - paragraph [ref=e531]: Diamants naturels et de laboratoire, d'origine éthique et sélectionnés à la main pour leur éclat.
          - generic [ref=e533]:
            - generic [ref=e534]: 03 / 04
            - heading "Fabrication" [level=2] [ref=e535]
            - paragraph [ref=e536]: Notre atelier de Laval donne vie à vos projets — fonte, sertissage, polissage, tout est fait sur place.
          - generic [ref=e538]:
            - generic [ref=e539]: 04 / 04
            - heading "Restauration" [level=2] [ref=e540]
            - paragraph [ref=e541]: Réparations, restaurations et entretien de montres — la confiance de générations.
      - generic [ref=e544]:
        - generic [ref=e545]:
          - img "Boucles d'oreilles sur mesure en perles" [ref=e546]
          - generic [ref=e548]: « Des boucles d'oreilles assorties à ses perles — un cadeau de 65e anniversaire. »
        - generic [ref=e549]:
          - generic [ref=e550]:
            - generic [ref=e551]:
              - generic [ref=e552]: B
              - generic [ref=e553]: i
              - generic [ref=e554]: j
              - generic [ref=e555]: o
              - generic [ref=e556]: u
              - generic [ref=e557]: x
              - generic [ref=e559]: s
              - generic [ref=e560]: u
              - generic [ref=e561]: r
              - generic [ref=e563]: m
              - generic [ref=e564]: e
              - generic [ref=e565]: s
              - generic [ref=e566]: u
              - generic [ref=e567]: r
              - generic [ref=e568]: e
            - heading "Si vous pouvez l'imaginer, nous pouvons le créer." [level=2] [ref=e569]:
              - generic [ref=e571]: Si
              - generic [ref=e573]: vous
              - generic [ref=e575]: pouvez
              - generic [ref=e577]: l'imaginer,
              - generic [ref=e579]: nous
              - generic [ref=e581]: pouvons
              - generic [ref=e583]: le
              - generic [ref=e585]: créer.
            - paragraph [ref=e587]: D'un croquis sur une serviette à une capture d'écran Instagram — notre atelier donne vie à des pièces uniques.
          - generic [ref=e588]:
            - generic [ref=e589]:
              - generic [ref=e590]: "1"
              - generic [ref=e591]:
                - heading "Partagez votre idée" [level=3] [ref=e592]
                - paragraph [ref=e593]: Photos, croquis, une histoire — tout ce qui vous inspire.
            - generic [ref=e594]:
              - generic [ref=e595]: "2"
              - generic [ref=e596]:
                - heading "Concevons ensemble" [level=3] [ref=e597]
                - paragraph [ref=e598]: Nous peaufinons le design, le métal et les pierres avec vous.
            - generic [ref=e599]:
              - generic [ref=e600]: "3"
              - generic [ref=e601]:
                - heading "Façonné à l'atelier" [level=3] [ref=e602]
                - paragraph [ref=e603]: Votre pièce est réalisée avec soin, avec des nouvelles en cours de route.
            - generic [ref=e604]:
              - generic [ref=e605]: "4"
              - generic [ref=e606]:
                - heading "Fait pour être mémorable" [level=3] [ref=e607]
                - paragraph [ref=e608]: Ramassez-la en boutique — une pièce unique au monde.
          - generic [ref=e609]:
            - button "Démarrer une demande" [ref=e610]:
              - generic [ref=e611]: Démarrer une demande
              - generic [ref=e612]: →
            - link "En savoir plus" [ref=e613]:
              - /url: /fr/custom/
              - img [ref=e614]
              - text: En savoir plus
      - generic [ref=e618]:
        - generic [ref=e619]:
          - generic [ref=e620]:
            - generic [ref=e621]: R
            - generic [ref=e622]: é
            - generic [ref=e623]: p
            - generic [ref=e624]: a
            - generic [ref=e625]: r
            - generic [ref=e626]: a
            - generic [ref=e627]: t
            - generic [ref=e628]: i
            - generic [ref=e629]: o
            - generic [ref=e630]: "n"
            - generic [ref=e631]: s
            - generic [ref=e633]: e
            - generic [ref=e634]: t
            - generic [ref=e636]: e
            - generic [ref=e637]: "n"
            - generic [ref=e638]: t
            - generic [ref=e639]: r
            - generic [ref=e640]: e
            - generic [ref=e641]: t
            - generic [ref=e642]: i
            - generic [ref=e643]: e
            - generic [ref=e644]: "n"
          - heading "Redonnez-lui vie." [level=2] [ref=e645]:
            - generic [ref=e647]: Redonnez-lui
            - generic [ref=e649]: vie.
          - paragraph [ref=e651]: Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval.
        - generic [ref=e652]:
          - button "Mise à grandeur de bague Agrandir ou réduire, fait sur place." [ref=e654]:
            - img [ref=e655]
            - heading "Mise à grandeur de bague" [level=3] [ref=e657]
            - paragraph [ref=e658]: Agrandir ou réduire, fait sur place.
          - button "Réparation de chaîne et fermoir Maillons brisés, fermoirs et soudure." [ref=e660]:
            - img [ref=e661]
            - heading "Réparation de chaîne et fermoir" [level=3] [ref=e663]
            - paragraph [ref=e664]: Maillons brisés, fermoirs et soudure.
          - button "Sertissage et remplacement de pierres Resserrer, ressertir ou remplacer." [ref=e666]:
            - img [ref=e667]
            - heading "Sertissage et remplacement de pierres" [level=3] [ref=e669]
            - paragraph [ref=e670]: Resserrer, ressertir ou remplacer.
          - button "Polissage et rhodium Retrouvez l'éclat d'origine." [ref=e672]:
            - img [ref=e673]
            - heading "Polissage et rhodium" [level=3] [ref=e675]
            - paragraph [ref=e676]: Retrouvez l'éclat d'origine.
          - button "Piles et entretien de montres Piles pendant que vous attendez." [ref=e678]:
            - img [ref=e679]
            - heading "Piles et entretien de montres" [level=3] [ref=e681]
            - paragraph [ref=e682]: Piles pendant que vous attendez.
          - button "Nettoyage et inspection Vérification gratuite de vos bijoux." [ref=e684]:
            - img [ref=e685]
            - heading "Nettoyage et inspection" [level=3] [ref=e687]
            - paragraph [ref=e688]: Vérification gratuite de vos bijoux.
        - generic [ref=e689]:
          - button "Demander une estimation" [ref=e690]:
            - generic [ref=e691]: Demander une estimation
            - generic [ref=e692]: →
          - link "Voir les réparations" [ref=e693]:
            - /url: /fr/repairs/
            - img [ref=e694]
            - text: Voir les réparations
      - generic [ref=e699]:
        - generic [ref=e700]:
          - generic [ref=e701]:
            - generic [ref=e702]:
              - generic [ref=e703]: F
              - generic [ref=e704]: i
              - generic [ref=e705]: a
              - generic [ref=e706]: "n"
              - generic [ref=e707]: ç
              - generic [ref=e708]: a
              - generic [ref=e709]: i
              - generic [ref=e710]: l
              - generic [ref=e711]: l
              - generic [ref=e712]: e
              - generic [ref=e713]: s
            - heading "Le oui mérite Ormania." [level=2] [ref=e714]:
              - generic [ref=e716]: Le
              - generic [ref=e718]: oui
              - generic [ref=e720]: mérite
              - generic [ref=e722]: Ormania.
            - paragraph [ref=e724]: Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.
          - generic [ref=e725]:
            - button "Consultation fiançailles" [ref=e726]:
              - generic [ref=e727]: Consultation fiançailles
              - generic [ref=e728]: →
            - link "Guide fiançailles" [ref=e729]:
              - /url: /fr/engagement/
              - img [ref=e730]
              - text: Guide fiançailles
        - img "Bagues de fiançailles en diamant" [ref=e733]
      - generic [ref=e736]:
        - generic [ref=e737]:
          - generic [ref=e738]:
            - generic [ref=e739]: P
            - generic [ref=e740]: o
            - generic [ref=e741]: u
            - generic [ref=e742]: r
            - generic [ref=e743]: q
            - generic [ref=e744]: u
            - generic [ref=e745]: o
            - generic [ref=e746]: i
            - generic [ref=e748]: O
            - generic [ref=e749]: r
            - generic [ref=e750]: m
            - generic [ref=e751]: a
            - generic [ref=e752]: "n"
            - generic [ref=e753]: i
            - generic [ref=e754]: a
          - heading "Une boutique, pas un comptoir." [level=2] [ref=e755]:
            - generic [ref=e757]: Une
            - generic [ref=e759]: boutique,
            - generic [ref=e761]: pas
            - generic [ref=e763]: un
            - generic [ref=e765]: comptoir.
        - generic [ref=e766]:
          - generic [ref=e768]:
            - generic [ref=e769]: "01"
            - img [ref=e770]
            - heading "Des pièces réelles, en boutique" [level=3] [ref=e773]
            - paragraph [ref=e774]: Tout ce qui est sur notre Instagram existe — venez le voir en personne.
          - generic [ref=e776]:
            - generic [ref=e777]: "02"
            - img [ref=e778]
            - heading "Travail fait sur place" [level=3] [ref=e782]
            - paragraph [ref=e783]: Réparations et créations à notre propre atelier, jamais expédiées.
          - generic [ref=e785]:
            - generic [ref=e786]: "03"
            - img [ref=e787]
            - heading "Service familial" [level=3] [ref=e789]
            - paragraph [ref=e790]: Une boutique où vous êtes un nom, pas un numéro.
          - generic [ref=e792]:
            - generic [ref=e793]: "04"
            - img [ref=e794]
            - heading "Au cœur de Laval" [level=3] [ref=e797]
            - paragraph [ref=e798]: Boulevard des Laurentides — stationnement et visite faciles.
      - generic [ref=e800]:
        - generic [ref=e801]:
          - generic [ref=e802]:
            - generic [ref=e803]: O
            - generic [ref=e804]: u
            - generic [ref=e805]: t
            - generic [ref=e806]: i
            - generic [ref=e807]: l
            - generic [ref=e808]: s
          - heading "Petits outils, grandes décisions." [level=2] [ref=e809]:
            - generic [ref=e811]: Petits
            - generic [ref=e813]: outils,
            - generic [ref=e815]: grandes
            - generic [ref=e817]: décisions.
        - generic [ref=e818]:
          - link "Aperçu Quiz cadeau 3 questions, une sélection personnalisée." [ref=e820]:
            - /url: /fr/explore/#gift
            - generic [ref=e822]:
              - img [ref=e823]
              - generic [ref=e827]: Aperçu
            - heading "Quiz cadeau" [level=3] [ref=e828]
            - paragraph [ref=e829]: 3 questions, une sélection personnalisée.
            - generic [ref=e830]: →
          - link "Aperçu Guide des tailles de bague Trouvez la taille sans demander." [ref=e832]:
            - /url: /fr/explore/#size
            - generic [ref=e834]:
              - img [ref=e835]
              - generic [ref=e837]: Aperçu
            - heading "Guide des tailles de bague" [level=3] [ref=e838]
            - paragraph [ref=e839]: Trouvez la taille sans demander.
            - generic [ref=e840]: →
          - link "Aperçu Visualiseur de longueur de chaîne Visualisez chaque longueur." [ref=e842]:
            - /url: /fr/explore/#chain
            - generic [ref=e844]:
              - img [ref=e845]
              - generic [ref=e848]: Aperçu
            - heading "Visualiseur de longueur de chaîne" [level=3] [ref=e849]
            - paragraph [ref=e850]: Visualisez chaque longueur.
            - generic [ref=e851]: →
          - link "En ligne Suivi de réparation Vérifiez votre réparation par numéro de référence." [ref=e853]:
            - /url: /fr/explore/#status
            - generic [ref=e855]:
              - img [ref=e856]
              - generic [ref=e859]: En ligne
            - heading "Suivi de réparation" [level=3] [ref=e860]
            - paragraph [ref=e861]: Vérifiez votre réparation par numéro de référence.
            - generic [ref=e862]: →
          - link "Aperçu Guide d'entretien Gardez l'or et les pierres comme neufs." [ref=e864]:
            - /url: /fr/explore/#care
            - generic [ref=e866]:
              - img [ref=e867]
              - generic [ref=e870]: Aperçu
            - heading "Guide d'entretien" [level=3] [ref=e871]
            - paragraph [ref=e872]: Gardez l'or et les pierres comme neufs.
            - generic [ref=e873]: →
      - generic [ref=e875]:
        - generic [ref=e876]:
          - generic [ref=e877]:
            - generic [ref=e878]: V
            - generic [ref=e879]: i
            - generic [ref=e880]: s
            - generic [ref=e881]: i
            - generic [ref=e882]: t
            - generic [ref=e883]: e
            - generic [ref=e884]: z
            - generic [ref=e885]: "-"
            - generic [ref=e886]: "n"
            - generic [ref=e887]: o
            - generic [ref=e888]: u
            - generic [ref=e889]: s
          - heading "Au cœur de Laval." [level=2] [ref=e890]:
            - generic [ref=e892]: Au
            - generic [ref=e894]: cœur
            - generic [ref=e896]: de
            - generic [ref=e898]: Laval.
          - paragraph [ref=e900]: 3000 Boulevard des Laurentides, Laval, QC H7K 3G5
        - generic [ref=e901]:
          - link "(450) 629-2959" [ref=e902]:
            - /url: tel:+14506292959
            - img [ref=e903]
            - generic [ref=e905]: (450) 629-2959
          - link "Itinéraire" [ref=e906]:
            - /url: https://www.google.com/maps/dir/?api=1&destination=3000+Boulevard+des+Laurentides+Laval+QC+H7K+3G5
            - img [ref=e907]
            - text: Itinéraire
          - link "Instagram" [ref=e910]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e911]
            - text: Instagram
    - generic [ref=e917]:
      - generic [ref=e918]:
        - text: Besoin d'aide ?
        - heading "Laissez Ormania vous guider." [level=2] [ref=e919]
        - paragraph [ref=e920]: Dites-nous ce que vous recherchez et la boutique pourra vous orienter vers les bonnes pièces.
        - button "Demander à Ormania" [ref=e921]:
          - img [ref=e922]
          - text: Demander à Ormania
          - img [ref=e924]
      - generic [ref=e926]:
        - heading "Demande rapide" [level=3] [ref=e927]
        - generic [ref=e928]:
          - textbox "Nom" [ref=e929]
          - textbox "Téléphone" [ref=e930]
          - textbox "Message" [ref=e931]
          - button "Envoyer" [ref=e932]
    - generic [ref=e934]:
      - generic [ref=e935]:
        - generic [ref=e936]:
          - text: Récemment
          - heading "Récemment à Ormania" [level=2] [ref=e937]
        - paragraph [ref=e938]: Ce qui se passe en boutique en ce moment.
      - generic [ref=e939]:
        - generic [ref=e941] [cursor=pointer]:
          - generic [ref=e942]:
            - generic [ref=e943]: Nouveau cette semaine
            - button [ref=e944]:
              - img [ref=e945]
          - generic [ref=e948]: Image placeholder
          - heading "Bracelet tennis de lab" [level=3] [ref=e949]
          - button "Demander" [ref=e950]:
            - generic [ref=e951]: Demander
            - img [ref=e952]
        - generic [ref=e955] [cursor=pointer]:
          - generic [ref=e956]:
            - generic [ref=e957]: Populaire en boutique
            - button [ref=e958]:
              - img [ref=e959]
          - generic [ref=e962]: Image placeholder
          - heading "Collier diamant halo" [level=3] [ref=e963]
          - button "Demander" [ref=e964]:
            - generic [ref=e965]: Demander
            - img [ref=e966]
        - generic [ref=e969] [cursor=pointer]:
          - generic [ref=e970]:
            - generic [ref=e971]: Pièce sur mesure
            - button [ref=e972]:
              - img [ref=e973]
          - generic [ref=e976]: Image placeholder
          - heading "Empilez vos bagues" [level=3] [ref=e977]
          - button "Demander" [ref=e978]:
            - generic [ref=e979]: Demander
            - img [ref=e980]
        - generic [ref=e983] [cursor=pointer]:
          - generic [ref=e984]:
            - generic [ref=e985]: Idée cadeau
            - button [ref=e986]:
              - img [ref=e987]
          - generic [ref=e990]: Image placeholder
          - heading "Boucles d'oreilles perle" [level=3] [ref=e991]
          - button "Demander" [ref=e992]:
            - generic [ref=e993]: Demander
            - img [ref=e994]
        - generic [ref=e997] [cursor=pointer]:
          - generic [ref=e998]:
            - generic [ref=e999]: Récemment en vedette
            - button [ref=e1000]:
              - img [ref=e1001]
          - generic [ref=e1004]: Image placeholder
          - heading "Chaîne en or 18\"" [level=3] [ref=e1005]
          - button "Demander" [ref=e1006]:
            - generic [ref=e1007]: Demander
            - img [ref=e1008]
        - generic [ref=e1011] [cursor=pointer]:
          - generic [ref=e1012]:
            - generic [ref=e1013]: Demander la disponibilité
            - button [ref=e1014]:
              - img [ref=e1015]
          - generic [ref=e1018]: Image placeholder
          - heading "Bague de fiançailles" [level=3] [ref=e1019]
          - button "Demander" [ref=e1020]:
            - generic [ref=e1021]: Demander
            - img [ref=e1022]
    - generic [ref=e1025]:
      - generic [ref=e1026]:
        - text: Avant / Après
        - heading "Restauré, redimensionné, réparé, mémorisé." [level=2] [ref=e1027]
      - generic [ref=e1028]:
        - generic [ref=e1031]:
          - generic [ref=e1033]: Après
          - generic [ref=e1035]: Avant
          - generic [ref=e1037]: ↔
          - generic [ref=e1038]: Chaîne cassée → réparée
        - generic [ref=e1041]:
          - generic [ref=e1043]: Après
          - generic [ref=e1045]: Avant
          - generic [ref=e1047]: ↔
          - generic [ref=e1048]: Bague redimensionnée → prête à porter
        - generic [ref=e1051]:
          - generic [ref=e1053]: Après
          - generic [ref=e1055]: Avant
          - generic [ref=e1057]: ↔
          - generic [ref=e1058]: Pierre desserrée → fixée
        - generic [ref=e1061]:
          - generic [ref=e1063]: Après
          - generic [ref=e1065]: Avant
          - generic [ref=e1067]: ↔
          - generic [ref=e1068]: Pile de montre → remplacée
        - generic [ref=e1071]:
          - generic [ref=e1073]: Après
          - generic [ref=e1075]: Avant
          - generic [ref=e1077]: ↔
          - generic [ref=e1078]: Pièce ternie → polie
        - generic [ref=e1081]:
          - generic [ref=e1083]: Après
          - generic [ref=e1085]: Avant
          - generic [ref=e1087]: ↔
          - generic [ref=e1088]: Fermoir remplacé → à nouveau portable
      - button "Envoyez-nous des photos de votre réparation" [ref=e1090]:
        - img [ref=e1091]
        - text: Envoyez-nous des photos de votre réparation
    - generic [ref=e1095]:
      - generic [ref=e1096]:
        - text: Outils et guides
        - heading "Petits outils, grandes décisions." [level=2] [ref=e1097]
      - generic [ref=e1098]:
        - generic [ref=e1100] [cursor=pointer]:
          - img [ref=e1102]
          - heading "Trouver un cadeau" [level=3] [ref=e1106]
          - generic [ref=e1107]: En ligne
        - generic [ref=e1109] [cursor=pointer]:
          - img [ref=e1111]
          - heading "Guide des tailles" [level=3] [ref=e1117]
          - generic [ref=e1118]: En ligne
        - generic [ref=e1120] [cursor=pointer]:
          - img [ref=e1122]
          - heading "Longueur de chaîne" [level=3] [ref=e1125]
          - generic [ref=e1126]: En ligne
        - generic [ref=e1128] [cursor=pointer]:
          - img [ref=e1130]
          - heading "Statut de réparation" [level=3] [ref=e1133]
          - generic [ref=e1134]: Aperçu
        - generic [ref=e1136] [cursor=pointer]:
          - img [ref=e1138]
          - heading "Guide d'entretien" [level=3] [ref=e1140]
          - generic [ref=e1141]: En ligne
        - generic [ref=e1143]:
          - img [ref=e1145]
          - heading "Trouver l'occasion" [level=3] [ref=e1147]
          - generic [ref=e1148]: Bientôt
        - generic [ref=e1150]:
          - img [ref=e1152]
          - heading "Trouver le style" [level=3] [ref=e1155]
          - generic [ref=e1156]: Bientôt
        - generic [ref=e1158]:
          - img [ref=e1160]
          - heading "Rappel d'entretien" [level=3] [ref=e1163]
          - generic [ref=e1164]: Bientôt
        - generic [ref=e1166]:
          - img [ref=e1168]
          - heading "Rappel de pile" [level=3] [ref=e1173]
          - generic [ref=e1174]: Bientôt
        - generic [ref=e1176]:
          - img [ref=e1178]
          - heading "Rappel de nettoyage" [level=3] [ref=e1181]
          - generic [ref=e1182]: Bientôt
    - generic [ref=e1184]:
      - generic [ref=e1185]:
        - text: Confiance
        - heading "De confiance à Laval." [level=2] [ref=e1186]
      - generic [ref=e1187]:
        - generic [ref=e1188]:
          - img [ref=e1189]
          - generic [ref=e1192]: Boutique locale de Laval
        - generic [ref=e1193]:
          - img [ref=e1194]
          - generic [ref=e1196]: Service personnalisé
        - generic [ref=e1197]:
          - img [ref=e1198]
          - generic [ref=e1200]: Réparations et travail sur mesure
        - generic [ref=e1201]:
          - img [ref=e1202]
          - generic [ref=e1204]: Demandes Instagram bienvenues
      - generic [ref=e1205]:
        - generic [ref=e1207]:
          - generic [ref=e1208]:
            - img [ref=e1209]
            - img [ref=e1211]
            - img [ref=e1213]
            - img [ref=e1215]
            - img [ref=e1217]
          - paragraph [ref=e1219]: "\"Ormania a redimensionné la bague de ma grand-mère et elle fits parfaitement. Le soin apporté était incroyable.\""
          - text: Sarah M.
        - generic [ref=e1221]:
          - generic [ref=e1222]:
            - img [ref=e1223]
            - img [ref=e1225]
            - img [ref=e1227]
            - img [ref=e1229]
            - img [ref=e1231]
          - paragraph [ref=e1233]: "\"J'ai trouvé ma bague de fiançailles ici après des mois de recherche. L'équipe a rendu le moment spécial.\""
          - text: Alex T.
      - generic [ref=e1234]:
        - paragraph [ref=e1235]: Bijouterie Ormania est une boutique familiale au cœur de Laval. Depuis des années, nous aidons nos clients à marquer les moments importants de leur vie avec des bijoux qui racontent une histoire.
        - button "Contactez-nous" [ref=e1236]:
          - text: Contactez-nous
          - img [ref=e1237]
  - contentinfo [ref=e1239]:
    - generic [ref=e1240]:
      - navigation "Footer navigation" [ref=e1241]:
        - link "Collections" [ref=e1243]:
          - /url: /fr/collections/
        - link "Instagram" [ref=e1246]:
          - /url: /fr/instagram/
        - link "Fiançailles" [ref=e1249]:
          - /url: /fr/engagement/
        - link "Outils" [ref=e1252]:
          - /url: /fr/explore/
        - link "Sur mesure" [ref=e1255]:
          - /url: /fr/custom/
        - link "Réparations" [ref=e1258]:
          - /url: /fr/repairs/
        - link "Visite" [ref=e1261]:
          - /url: /fr/visit/
        - link "Présentation" [ref=e1264]:
          - /url: /fr/pitch/
      - generic [ref=e1265]:
        - generic:
          - img
        - img "Ormania" [ref=e1266]
        - paragraph [ref=e1267]: Des bijoux faits pour être mémorables.
        - generic [ref=e1268]:
          - link "Instagram" [ref=e1269]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e1270]
          - link "Phone" [ref=e1273]:
            - /url: tel:+14506292959
            - text: (450) 629-2959
      - generic [ref=e1274]:
        - generic [ref=e1275]: © 2026 Bijouterie Ormania. Tous droits réservés.
        - generic [ref=e1276]:
          - link "Confidentialité" [ref=e1277]:
            - /url: /fr/privacy/
          - link "Conditions" [ref=e1278]:
            - /url: /fr/terms/
          - link "Personnel" [ref=e1279]:
            - /url: /fr/admin/
  - button "Open Next.js Dev Tools" [ref=e1285] [cursor=pointer]:
    - img [ref=e1286]
  - alert [ref=e1289]
  - button "Back to top" [ref=e1290]:
    - img [ref=e1291]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | const locales = ["en", "fr"] as const;
  4  | 
  5  | for (const lang of locales) {
  6  |   test.describe(`${lang} — section visibility`, () => {
  7  |     test("home page sections are visible after scroll", async ({ page }) => {
  8  |       await page.goto(`/${lang}/`);
  9  |       await page.waitForLoadState("networkidle");
  10 | 
  11 |       // Check hero content is visible
  12 |       await expect(page.locator("h1").first()).toBeVisible();
  13 | 
  14 |       // Scroll through the page and verify key sections appear
  15 |       const viewportHeight = await page.evaluate(() => window.innerHeight);
  16 |       const documentHeight = await page.evaluate(() => document.body.scrollHeight);
  17 | 
  18 |       let scrollY = 0;
  19 |       while (scrollY < documentHeight - viewportHeight) {
  20 |         scrollY += viewportHeight * 0.8;
  21 |         await page.evaluate((y) => window.scrollTo(0, y), scrollY);
  22 |         await page.waitForTimeout(300);
  23 | 
  24 |         // Assert no section has stuck opacity: 0 on key text elements
  25 |         const hiddenElements = await page.evaluate(() => {
  26 |           const selectors = [
  27 |             ".font-serif",
  28 |             ".text-ivory",
  29 |             "[class*='text-gold']",
  30 |             "[class*='bg-gold']",
  31 |           ];
  32 |           const all = selectors.flatMap((s) =>
  33 |             Array.from(document.querySelectorAll(s))
  34 |           );
  35 |           const inViewport = all.filter((el) => {
  36 |             const rect = el.getBoundingClientRect();
  37 |             return rect.top < window.innerHeight && rect.bottom > 0;
  38 |           });
  39 |           const stuckHidden = inViewport.filter((el) => {
  40 |             const style = window.getComputedStyle(el);
  41 |             return style.opacity === "0" && !el.closest("[role='dialog']");
  42 |           });
  43 |           return stuckHidden.map((el) => ({
  44 |             tag: el.tagName,
  45 |             text: (el.textContent || "").slice(0, 50),
  46 |             class: el.className.slice(0, 80),
  47 |           }));
  48 |         });
  49 | 
  50 |         expect(hiddenElements).toHaveLength(0);
  51 |       }
  52 |     });
  53 | 
  54 |     test("scroll-reveal elements animate in", async ({ page }) => {
  55 |       await page.goto(`/${lang}/`);
  56 |       await page.waitForLoadState("networkidle");
  57 | 
  58 |       // Scroll to mid-page and check that animated elements have opacity > 0
  59 |       await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  60 |       await page.waitForTimeout(500);
  61 | 
  62 |       const stuck = await page.evaluate(() => {
  63 |         const els = document.querySelectorAll("[style*='opacity: 0']");
  64 |         const visible = Array.from(els).filter((el) => {
  65 |           const rect = el.getBoundingClientRect();
  66 |           return rect.top < window.innerHeight && rect.bottom > 0;
  67 |         });
  68 |         return visible.map((el) => el.tagName);
  69 |       });
  70 | 
> 71 |       expect(stuck.length).toBeLessThanOrEqual(2); // allow a couple of intentionally hidden elements
     |                            ^ Error: expect(received).toBeLessThanOrEqual(expected)
  72 |     });
  73 | 
  74 |     test("pitch page sections render", async ({ page }) => {
  75 |       await page.goto(`/${lang}/pitch`);
  76 |       await page.waitForLoadState("networkidle");
  77 | 
  78 |       await expect(page.locator("h1")).toBeVisible();
  79 |       await expect(page.locator("text=15+").first()).toBeVisible();
  80 |       await expect(page.locator("text=Custom Jewelry")).toBeVisible();
  81 |     });
  82 |   });
  83 | }
  84 | 
```