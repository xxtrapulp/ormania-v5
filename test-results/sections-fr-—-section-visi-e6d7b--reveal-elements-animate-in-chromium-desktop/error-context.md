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
Received:    14
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Aller au contenu" [ref=e2]:
    - /url: "#main"
  - img "Ormania" [ref=e5]
  - banner [ref=e8]:
    - generic [ref=e9]:
      - link "Ormania home" [ref=e10]:
        - /url: /fr/
        - img "Ormania" [ref=e11]
      - navigation "Main" [ref=e12]:
        - link "Accueil" [ref=e14]:
          - /url: /fr/
          - text: Accueil
        - link "Collections" [ref=e17]:
          - /url: /fr/collections/
        - link "Instagram" [ref=e19]:
          - /url: /fr/instagram/
        - link "Sur mesure" [ref=e21]:
          - /url: /fr/custom/
        - link "Réparations" [ref=e23]:
          - /url: /fr/repairs/
        - link "Fiançailles" [ref=e25]:
          - /url: /fr/engagement/
        - link "Visite" [ref=e27]:
          - /url: /fr/visit/
      - generic [ref=e28]:
        - link "Switch to English" [ref=e29]:
          - /url: /en/
          - generic [ref=e30]: EN
          - generic [ref=e31]: /
          - generic [ref=e32]: FR
        - button "Pièces sauvegardées" [ref=e33]:
          - img [ref=e34]
        - button "Comparer" [ref=e36]:
          - img [ref=e37]
        - link "Prendre rendez-vous" [ref=e41]:
          - /url: /fr/engagement/#book
  - main [ref=e43]:
    - region "Hero" [ref=e47]:
      - generic: ORMANIA
      - generic [ref=e49]:
        - img "Bijouterie Ormania" [ref=e52]
        - generic [ref=e54]:
          - generic [ref=e55]: Bijouterie Ormania — Laval
          - heading "D e s b i j o u x f a i t s p o u r ê t r e m é m o r a b l e s ." [level=1] [ref=e57]:
            - generic [ref=e58]:
              - generic [ref=e59]:
                - generic [ref=e60]: D
                - generic [ref=e61]: e
                - generic [ref=e62]: s
              - generic [ref=e65]:
                - generic [ref=e66]: b
                - generic [ref=e67]: i
                - generic [ref=e68]: j
                - generic [ref=e69]: o
                - generic [ref=e70]: u
                - generic [ref=e71]: x
              - generic [ref=e74]:
                - generic [ref=e75]: f
                - generic [ref=e76]: a
                - generic [ref=e77]: i
                - generic [ref=e78]: t
                - generic [ref=e79]: s
              - generic [ref=e82]:
                - generic [ref=e83]: p
                - generic [ref=e84]: o
                - generic [ref=e85]: u
                - generic [ref=e86]: r
              - generic [ref=e89]:
                - generic [ref=e90]: ê
                - generic [ref=e91]: t
                - generic [ref=e92]: r
                - generic [ref=e93]: e
              - generic [ref=e96]:
                - generic [ref=e97]: m
                - generic [ref=e98]: é
                - generic [ref=e99]: m
                - generic [ref=e100]: o
                - generic [ref=e101]: r
                - generic [ref=e102]: a
                - generic [ref=e103]: b
                - generic [ref=e104]: l
                - generic [ref=e105]: e
                - generic [ref=e106]: s
                - generic [ref=e107]: .
          - paragraph [ref=e109]: Bijouterie fine, pièces sur mesure, réparations, montres et cadeaux intemporels — au cœur de Laval.
          - generic [ref=e110]:
            - link "Voir les collections" [ref=e111]:
              - /url: /fr/collections/
              - generic [ref=e112]: Voir les collections
              - generic [ref=e113]: →
            - link "Prendre rendez-vous" [ref=e114]:
              - /url: /fr/engagement/#book
              - generic [ref=e115]: Prendre rendez-vous
          - link "Vu quelque chose sur Instagram ?" [ref=e117]:
            - /url: /fr/instagram/
            - img [ref=e118]
            - text: Vu quelque chose sur Instagram ?
            - generic [ref=e121]: →
      - link "Défiler" [ref=e125]:
        - /url: "#featured"
        - text: Défiler
        - img [ref=e126]
    - generic [ref=e127]:
      - generic [ref=e129]:
        - generic [ref=e130]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e131]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e132]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e133]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e134]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e135]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
      - generic [ref=e137]:
        - generic [ref=e138]:
          - text: Bijouterie Ormania — Laval
          - heading "Ormania transforme les moments de la vie en pièces que vous gardez près de vous." [level=2] [ref=e139]:
            - generic [ref=e140]:
              - generic [ref=e142]: Ormania
              - generic [ref=e144]: transforme
              - generic [ref=e146]: les
              - generic [ref=e148]: moments
              - generic [ref=e150]: de
              - generic [ref=e152]: la
              - generic [ref=e154]: vie
              - generic [ref=e156]: en
              - generic [ref=e158]: pièces
              - generic [ref=e160]: que
              - generic [ref=e162]: vous
              - generic [ref=e164]: gardez
              - generic [ref=e166]: près
              - generic [ref=e168]: de
              - generic [ref=e170]: vous.
        - paragraph [ref=e173]: Une bijouterie à Laval pour les pièces fines, les cadeaux significatifs, le travail sur mesure, les réparations, les montres et les moments de fiançailles.
    - generic [ref=e175]:
      - text: Services phares
      - heading "Notre savoir-faire, à votre service." [level=2] [ref=e176]
      - generic [ref=e177]:
        - generic [ref=e179]:
          - img [ref=e181]
          - generic [ref=e184]:
            - heading "Design sur mesure" [level=3] [ref=e185]
            - paragraph [ref=e186]: De l'idée à la pièce finie.
            - paragraph [ref=e187]: Apportez-nous un croquis, une photo ou simplement une impression. Nous vous guidons à travers les matériaux, les pierres et le design jusqu'à ce que tout soit parfait.
        - generic [ref=e189]:
          - img [ref=e191]
          - generic [ref=e193]:
            - heading "Restauration de bijoux" [level=3] [ref=e194]
            - paragraph [ref=e195]: Réparations, mise à grandeur, polissage et travail de pierres.
            - paragraph [ref=e196]: Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval avec soin et précision.
        - generic [ref=e198]:
          - img [ref=e200]
          - generic [ref=e202]:
            - heading "Conseil pour fiançailles" [level=3] [ref=e203]
            - paragraph [ref=e204]: Aide personnalisée pour choisir ou créer la bague.
            - paragraph [ref=e205]: Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.
        - generic [ref=e207]:
          - img [ref=e209]
          - generic [ref=e213]:
            - heading "Curation de cadeaux" [level=3] [ref=e214]
            - paragraph [ref=e215]: Aide pour trouver quelque chose de significatif.
            - paragraph [ref=e216]: Vous ne savez pas quoi choisir ? Parlez-nous de la personne et de l'occasion. Nous vous suggérerons des pièces qui semblent personnelles et durables.
    - generic [ref=e218]:
      - generic [ref=e219]:
        - text: Shop par intention
        - heading "Comment pouvons-nous vous aider ?" [level=2] [ref=e220]
      - generic [ref=e221]:
        - generic [ref=e222] [cursor=pointer]:
          - generic [ref=e223]:
            - img [ref=e225]
            - generic [ref=e228]: Sur mesure
          - heading "Personnalisez" [level=3] [ref=e229]
          - paragraph [ref=e230]: Bijoux sur mesure, gravure, pièces significatives.
          - generic [ref=e231]:
            - generic [ref=e232]: Explorer
            - generic [ref=e233]: →
        - generic [ref=e234] [cursor=pointer]:
          - generic [ref=e235]:
            - img [ref=e237]
            - generic [ref=e239]: Fiançailles
          - heading "Marquez un jalon" [level=3] [ref=e240]
          - paragraph [ref=e241]: Fiançailles, anniversaire, remise de diplôme, moments spéciaux.
          - generic [ref=e242]:
            - generic [ref=e243]: Explorer
            - generic [ref=e244]: →
        - generic [ref=e245] [cursor=pointer]:
          - generic [ref=e246]:
            - img [ref=e248]
            - generic [ref=e254]: Explorer
          - heading "Or au quotidien" [level=3] [ref=e255]
          - paragraph [ref=e256]: Chaînes, bagues, bracelets et pièces du quotidien.
          - generic [ref=e257]:
            - generic [ref=e258]: Explorer
            - generic [ref=e259]: →
        - generic [ref=e260] [cursor=pointer]:
          - generic [ref=e261]:
            - img [ref=e263]
            - generic [ref=e267]: Homme
          - heading "Pour lui" [level=3] [ref=e268]
          - paragraph [ref=e269]: Bagues homme, chaînes, montres et cadeaux.
          - generic [ref=e270]:
            - generic [ref=e271]: Explorer
            - generic [ref=e272]: →
        - generic [ref=e273] [cursor=pointer]:
          - generic [ref=e274]:
            - img [ref=e276]
            - generic [ref=e278]: Réparer
          - heading "Réparez ce qui compte" [level=3] [ref=e279]
          - paragraph [ref=e280]: Agrandir, restaurer, polir et réparer les pièces que vous aimez.
          - generic [ref=e281]:
            - generic [ref=e282]: Explorer
            - generic [ref=e283]: →
        - generic [ref=e284] [cursor=pointer]:
          - generic [ref=e285]:
            - img [ref=e287]
            - generic [ref=e290]: Trouver
          - heading "Trouvez un cadeau" [level=3] [ref=e291]
          - paragraph [ref=e292]: Idées de cadeaux guidées par occasion, style et budget.
          - generic [ref=e293]:
            - generic [ref=e294]: Explorer
            - generic [ref=e295]: →
    - generic [ref=e296]:
      - generic [ref=e298]:
        - generic [ref=e299]:
          - generic [ref=e300]:
            - generic [ref=e301]: D
            - generic [ref=e302]: é
            - generic [ref=e303]: c
            - generic [ref=e304]: o
            - generic [ref=e305]: u
            - generic [ref=e306]: v
            - generic [ref=e307]: r
            - generic [ref=e308]: i
            - generic [ref=e309]: r
          - heading "Nos collections, prêtes en boutique." [level=2] [ref=e310]:
            - generic [ref=e312]: Nos
            - generic [ref=e314]: collections,
            - generic [ref=e316]: prêtes
            - generic [ref=e318]: en
            - generic [ref=e320]: boutique.
          - paragraph [ref=e322]: Des pièces de tous les jours aux commandes d'exception — découvrez Ormania cette saison.
        - generic [ref=e323]:
          - link "Chaînes et colliers Chaînes et colliers Chaînes cubaines, torsades et pièces diamantées — or massif, en boutique. Voir" [ref=e326]:
            - /url: /fr/collections/#chains
            - img "Chaînes et colliers" [ref=e327]
            - generic [ref=e329]:
              - heading "Chaînes et colliers" [level=3] [ref=e330]
              - paragraph: Chaînes cubaines, torsades et pièces diamantées — or massif, en boutique.
              - generic [ref=e331]:
                - text: Voir
                - generic [ref=e332]: →
          - link "Bagues Bagues Jonc superposables, or affirmé et diamants de tous les jours. Voir" [ref=e335]:
            - /url: /fr/collections/#rings
            - img "Bagues" [ref=e336]
            - generic [ref=e338]:
              - heading "Bagues" [level=3] [ref=e339]
              - paragraph: Jonc superposables, or affirmé et diamants de tous les jours.
              - generic [ref=e340]:
                - text: Voir
                - generic [ref=e341]: →
          - link "Bracelets Bracelets Bracelets tennis et joncs en or qu'on ne retire jamais. Voir" [ref=e344]:
            - /url: /fr/collections/#bracelets
            - img "Bracelets" [ref=e345]
            - generic [ref=e347]:
              - heading "Bracelets" [level=3] [ref=e348]
              - paragraph: Bracelets tennis et joncs en or qu'on ne retire jamais.
              - generic [ref=e349]:
                - text: Voir
                - generic [ref=e350]: →
          - link "Montres Montres Montres suisses sélectionnées, piles et entretien. Voir" [ref=e353]:
            - /url: /fr/collections/#watches
            - img "Montres" [ref=e354]
            - generic [ref=e356]:
              - heading "Montres" [level=3] [ref=e357]
              - paragraph: Montres suisses sélectionnées, piles et entretien.
              - generic [ref=e358]:
                - text: Voir
                - generic [ref=e359]: →
          - link "Fiançailles Fiançailles Diamants naturels et de laboratoire, sertis pour durer. Voir" [ref=e362]:
            - /url: /fr/collections/#engagement
            - img "Fiançailles" [ref=e363]
            - generic [ref=e365]:
              - heading "Fiançailles" [level=3] [ref=e366]
              - paragraph: Diamants naturels et de laboratoire, sertis pour durer.
              - generic [ref=e367]:
                - text: Voir
                - generic [ref=e368]: →
          - link "Sur mesure Sur mesure Pièces uniques, conçues avec vous à l'atelier. Voir" [ref=e371]:
            - /url: /fr/collections/#custom
            - img "Sur mesure" [ref=e372]
            - generic [ref=e374]:
              - heading "Sur mesure" [level=3] [ref=e375]
              - paragraph: Pièces uniques, conçues avec vous à l'atelier.
              - generic [ref=e376]:
                - text: Voir
                - generic [ref=e377]: →
      - generic [ref=e379]:
        - paragraph [ref=e380]: Vu sur Instagram
        - generic [ref=e381]:
          - generic [ref=e382]:
            - article [ref=e383]:
              - link "Lab-Grown Tennis Bracelet — Instagram" [ref=e384]:
                - /url: https://www.instagram.com/p/DSAifEiDouU/
                - generic [ref=e385]:
                  - img "Lab-Grown Tennis Bracelet" [ref=e386]
                  - generic [ref=e389]: In stock
                  - generic [ref=e390]: Publié récemment
                  - generic [ref=e391]:
                    - heading "Lab-Grown Tennis Bracelet" [level=3] [ref=e392]
                    - paragraph [ref=e393]: Your new never-taking-it-off bracelet — lab-grown tennis, made to shine all season long.
              - button "Demander" [ref=e395]
            - article [ref=e396]:
              - link "Halo Diamond Necklace — Instagram" [ref=e397]:
                - /url: https://www.instagram.com/reel/DSdMAuPETdF/
                - generic [ref=e398]:
                  - img "Halo Diamond Necklace" [ref=e399]
                  - generic [ref=e401]:
                    - generic [ref=e402]: In store
                    - generic [ref=e403]:
                      - img [ref=e404]
                      - text: Réel
                  - generic [ref=e406]: Publié récemment
                  - generic [ref=e407]:
                    - heading "Halo Diamond Necklace" [level=3] [ref=e408]
                    - paragraph [ref=e409]: Halo diamond necklace, available in store.
              - button "Demander" [ref=e411]
            - article [ref=e412]:
              - link "Stack Your Rings — Instagram" [ref=e413]:
                - /url: https://www.instagram.com/reel/DSaTiT1jgKb/
                - generic [ref=e414]:
                  - img "Stack Your Rings" [ref=e415]
                  - generic [ref=e417]:
                    - generic [ref=e418]: In store
                    - generic [ref=e419]:
                      - img [ref=e420]
                      - text: Réel
                  - generic [ref=e422]: Publié récemment
                  - generic [ref=e423]:
                    - heading "Stack Your Rings" [level=3] [ref=e424]
                    - paragraph [ref=e425]: This is your sign to stack — custom jewelry, Laval.
              - button "Demander" [ref=e427]
            - article [ref=e428]:
              - link "Sterling Silver & Moissanite — Instagram" [ref=e429]:
                - /url: https://www.instagram.com/reel/DSVUrrLDrSl/
                - generic [ref=e430]:
                  - img "Sterling Silver & Moissanite" [ref=e431]
                  - generic [ref=e433]:
                    - generic [ref=e434]: In store
                    - generic [ref=e435]:
                      - img [ref=e436]
                      - text: Réel
                  - generic [ref=e438]: Publié récemment
                  - generic [ref=e439]:
                    - heading "Sterling Silver & Moissanite" [level=3] [ref=e440]
                    - paragraph [ref=e441]: Silver at its all-time high — S925 sterling silver moissanite pieces in store.
              - button "Demander" [ref=e443]
            - article [ref=e444]:
              - link "A Gift She'll Wear Every Day — Instagram" [ref=e445]:
                - /url: https://www.instagram.com/reel/DRzvxN2kWfn/
                - generic [ref=e446]:
                  - img "A Gift She'll Wear Every Day" [ref=e447]
                  - generic [ref=e449]:
                    - generic [ref=e450]: In store
                    - generic [ref=e451]:
                      - img [ref=e452]
                      - text: Réel
                  - generic [ref=e454]:
                    - heading "A Gift She'll Wear Every Day" [level=3] [ref=e455]
                    - paragraph [ref=e456]: Not sure what to get her? Start with something she'll wear every day.
              - button "Demander" [ref=e458]
            - article [ref=e459]:
              - link "Custom Pearl Earrings — Instagram" [ref=e460]:
                - /url: https://www.instagram.com/reel/DRP2awpjmhB/
                - generic [ref=e461]:
                  - img "Custom Pearl Earrings" [ref=e462]
                  - generic [ref=e464]:
                    - generic [ref=e465]: Commission
                    - generic [ref=e466]:
                      - img [ref=e467]
                      - text: Réel
                  - generic [ref=e469]:
                    - heading "Custom Pearl Earrings" [level=3] [ref=e470]
                    - paragraph [ref=e471]: A custom pair of earrings designed to match her pearls — a 65th birthday gift.
              - button "Demander" [ref=e473]
            - article [ref=e474]:
              - link "Baume & Mercier M0A10619 — Instagram" [ref=e475]:
                - /url: https://www.instagram.com/p/DHuHBHMuREj/
                - generic [ref=e476]:
                  - img "Baume & Mercier M0A10619" [ref=e477]
                  - generic [ref=e480]: In stock
                  - generic [ref=e481]:
                    - heading "Baume & Mercier M0A10619" [level=3] [ref=e482]
                    - paragraph [ref=e483]: New arrival — Baume & Mercier M0A10619, in stock and ready.
              - button "Demander" [ref=e485]
            - article [ref=e486]:
              - link "Men's Solitaire Diamond Ring — Instagram" [ref=e487]:
                - /url: https://www.instagram.com/reel/DCu5JdFO5TV/
                - generic [ref=e488]:
                  - img "Men's Solitaire Diamond Ring" [ref=e489]
                  - generic [ref=e491]:
                    - generic [ref=e492]: In store
                    - generic [ref=e493]:
                      - img [ref=e494]
                      - text: Réel
                  - generic [ref=e496]:
                    - heading "Men's Solitaire Diamond Ring" [level=3] [ref=e497]
                    - paragraph [ref=e498]: Our men's ring collection — crafted to bring elegance to every occasion.
              - button "Demander" [ref=e500]
          - generic [ref=e501]:
            - button "Téléverser une capture" [ref=e502]:
              - img [ref=e503]
              - text: Téléverser une capture
            - button "Coller un lien Instagram" [ref=e506]:
              - img [ref=e507]
              - text: Coller un lien Instagram
        - link "Voir tout le showroom" [ref=e511]:
          - /url: /fr/instagram/
          - text: Voir tout le showroom
          - generic [ref=e512]: →
      - generic [ref=e514]:
        - generic [ref=e525]: L'Artisanat
        - generic [ref=e526]:
          - generic [ref=e527]:
            - generic [ref=e528]: 01 / 04
            - heading "Conception" [level=2] [ref=e529]
            - paragraph [ref=e530]: Chaque pièce commence par une conversation. Nous esquissons, modélisons et peaufinons jusqu'à ce que cela vous ressemble.
          - generic [ref=e532]:
            - generic [ref=e533]: 02 / 04
            - heading "Sélection" [level=2] [ref=e534]
            - paragraph [ref=e535]: Diamants naturels et de laboratoire, d'origine éthique et sélectionnés à la main pour leur éclat.
          - generic [ref=e537]:
            - generic [ref=e538]: 03 / 04
            - heading "Fabrication" [level=2] [ref=e539]
            - paragraph [ref=e540]: Notre atelier de Laval donne vie à vos projets — fonte, sertissage, polissage, tout est fait sur place.
          - generic [ref=e542]:
            - generic [ref=e543]: 04 / 04
            - heading "Restauration" [level=2] [ref=e544]
            - paragraph [ref=e545]: Réparations, restaurations et entretien de montres — la confiance de générations.
      - generic [ref=e549]:
        - generic [ref=e550]:
          - img "Boucles d'oreilles sur mesure en perles" [ref=e551]
          - generic [ref=e553]: « Des boucles d'oreilles assorties à ses perles — un cadeau de 65e anniversaire. »
        - generic [ref=e554]:
          - generic [ref=e555]:
            - generic [ref=e556]:
              - generic [ref=e557]: B
              - generic [ref=e558]: i
              - generic [ref=e559]: j
              - generic [ref=e560]: o
              - generic [ref=e561]: u
              - generic [ref=e562]: x
              - generic [ref=e564]: s
              - generic [ref=e565]: u
              - generic [ref=e566]: r
              - generic [ref=e568]: m
              - generic [ref=e569]: e
              - generic [ref=e570]: s
              - generic [ref=e571]: u
              - generic [ref=e572]: r
              - generic [ref=e573]: e
            - heading "Si vous pouvez l'imaginer, nous pouvons le créer." [level=2] [ref=e574]:
              - generic [ref=e576]: Si
              - generic [ref=e578]: vous
              - generic [ref=e580]: pouvez
              - generic [ref=e582]: l'imaginer,
              - generic [ref=e584]: nous
              - generic [ref=e586]: pouvons
              - generic [ref=e588]: le
              - generic [ref=e590]: créer.
            - paragraph [ref=e592]: D'un croquis sur une serviette à une capture d'écran Instagram — notre atelier donne vie à des pièces uniques.
          - generic [ref=e593]:
            - generic [ref=e594]:
              - generic [ref=e595]: "1"
              - generic [ref=e596]:
                - heading "Partagez votre idée" [level=3] [ref=e597]
                - paragraph [ref=e598]: Photos, croquis, une histoire — tout ce qui vous inspire.
            - generic [ref=e599]:
              - generic [ref=e600]: "2"
              - generic [ref=e601]:
                - heading "Concevons ensemble" [level=3] [ref=e602]
                - paragraph [ref=e603]: Nous peaufinons le design, le métal et les pierres avec vous.
            - generic [ref=e604]:
              - generic [ref=e605]: "3"
              - generic [ref=e606]:
                - heading "Façonné à l'atelier" [level=3] [ref=e607]
                - paragraph [ref=e608]: Votre pièce est réalisée avec soin, avec des nouvelles en cours de route.
            - generic [ref=e609]:
              - generic [ref=e610]: "4"
              - generic [ref=e611]:
                - heading "Fait pour être mémorable" [level=3] [ref=e612]
                - paragraph [ref=e613]: Ramassez-la en boutique — une pièce unique au monde.
          - generic [ref=e614]:
            - button "Démarrer une demande" [ref=e615]:
              - generic [ref=e616]: Démarrer une demande
              - generic [ref=e617]: →
            - link "En savoir plus" [ref=e618]:
              - /url: /fr/custom/
              - img [ref=e619]
              - text: En savoir plus
      - generic [ref=e623]:
        - generic [ref=e624]:
          - generic [ref=e625]:
            - generic [ref=e626]: R
            - generic [ref=e627]: é
            - generic [ref=e628]: p
            - generic [ref=e629]: a
            - generic [ref=e630]: r
            - generic [ref=e631]: a
            - generic [ref=e632]: t
            - generic [ref=e633]: i
            - generic [ref=e634]: o
            - generic [ref=e635]: "n"
            - generic [ref=e636]: s
            - generic [ref=e638]: e
            - generic [ref=e639]: t
            - generic [ref=e641]: e
            - generic [ref=e642]: "n"
            - generic [ref=e643]: t
            - generic [ref=e644]: r
            - generic [ref=e645]: e
            - generic [ref=e646]: t
            - generic [ref=e647]: i
            - generic [ref=e648]: e
            - generic [ref=e649]: "n"
          - heading "Redonnez-lui vie." [level=2] [ref=e650]:
            - generic [ref=e652]: Redonnez-lui
            - generic [ref=e654]: vie.
          - paragraph [ref=e656]: Mise à grandeur, pierres, fermoirs, polissage, piles de montre — la plupart des réparations sont faites sur place à Laval.
        - generic [ref=e657]:
          - button "Mise à grandeur de bague Agrandir ou réduire, fait sur place." [ref=e659]:
            - img [ref=e660]
            - heading "Mise à grandeur de bague" [level=3] [ref=e662]
            - paragraph [ref=e663]: Agrandir ou réduire, fait sur place.
          - button "Réparation de chaîne et fermoir Maillons brisés, fermoirs et soudure." [ref=e665]:
            - img [ref=e666]
            - heading "Réparation de chaîne et fermoir" [level=3] [ref=e668]
            - paragraph [ref=e669]: Maillons brisés, fermoirs et soudure.
          - button "Sertissage et remplacement de pierres Resserrer, ressertir ou remplacer." [ref=e671]:
            - img [ref=e672]
            - heading "Sertissage et remplacement de pierres" [level=3] [ref=e674]
            - paragraph [ref=e675]: Resserrer, ressertir ou remplacer.
          - button "Polissage et rhodium Retrouvez l'éclat d'origine." [ref=e677]:
            - img [ref=e678]
            - heading "Polissage et rhodium" [level=3] [ref=e680]
            - paragraph [ref=e681]: Retrouvez l'éclat d'origine.
          - button "Piles et entretien de montres Piles pendant que vous attendez." [ref=e683]:
            - img [ref=e684]
            - heading "Piles et entretien de montres" [level=3] [ref=e686]
            - paragraph [ref=e687]: Piles pendant que vous attendez.
          - button "Nettoyage et inspection Vérification gratuite de vos bijoux." [ref=e689]:
            - img [ref=e690]
            - heading "Nettoyage et inspection" [level=3] [ref=e692]
            - paragraph [ref=e693]: Vérification gratuite de vos bijoux.
        - generic [ref=e694]:
          - button "Demander une estimation" [ref=e695]:
            - generic [ref=e696]: Demander une estimation
            - generic [ref=e697]: →
          - link "Voir les réparations" [ref=e698]:
            - /url: /fr/repairs/
            - img [ref=e699]
            - text: Voir les réparations
      - generic [ref=e704]:
        - generic [ref=e705]:
          - generic [ref=e706]:
            - generic [ref=e707]:
              - generic [ref=e708]: F
              - generic [ref=e709]: i
              - generic [ref=e710]: a
              - generic [ref=e711]: "n"
              - generic [ref=e712]: ç
              - generic [ref=e713]: a
              - generic [ref=e714]: i
              - generic [ref=e715]: l
              - generic [ref=e716]: l
              - generic [ref=e717]: e
              - generic [ref=e718]: s
            - heading "Le oui mérite Ormania." [level=2] [ref=e719]:
              - generic [ref=e721]: Le
              - generic [ref=e723]: oui
              - generic [ref=e725]: mérite
              - generic [ref=e727]: Ormania.
            - paragraph [ref=e729]: Diamants naturels et de laboratoire, consultations privées et une bague faite pour une seule histoire — la vôtre.
          - generic [ref=e730]:
            - button "Consultation fiançailles" [ref=e731]:
              - generic [ref=e732]: Consultation fiançailles
              - generic [ref=e733]: →
            - link "Guide fiançailles" [ref=e734]:
              - /url: /fr/engagement/
              - img [ref=e735]
              - text: Guide fiançailles
        - img "Bagues de fiançailles en diamant" [ref=e738]
      - generic [ref=e741]:
        - generic [ref=e742]:
          - generic [ref=e743]:
            - generic [ref=e744]: P
            - generic [ref=e745]: o
            - generic [ref=e746]: u
            - generic [ref=e747]: r
            - generic [ref=e748]: q
            - generic [ref=e749]: u
            - generic [ref=e750]: o
            - generic [ref=e751]: i
            - generic [ref=e753]: O
            - generic [ref=e754]: r
            - generic [ref=e755]: m
            - generic [ref=e756]: a
            - generic [ref=e757]: "n"
            - generic [ref=e758]: i
            - generic [ref=e759]: a
          - heading "Une boutique, pas un comptoir." [level=2] [ref=e760]:
            - generic [ref=e762]: Une
            - generic [ref=e764]: boutique,
            - generic [ref=e766]: pas
            - generic [ref=e768]: un
            - generic [ref=e770]: comptoir.
        - generic [ref=e771]:
          - generic [ref=e773]:
            - generic [ref=e774]: "01"
            - img [ref=e775]
            - heading "Des pièces réelles, en boutique" [level=3] [ref=e778]
            - paragraph [ref=e779]: Tout ce qui est sur notre Instagram existe — venez le voir en personne.
          - generic [ref=e781]:
            - generic [ref=e782]: "02"
            - img [ref=e783]
            - heading "Travail fait sur place" [level=3] [ref=e787]
            - paragraph [ref=e788]: Réparations et créations à notre propre atelier, jamais expédiées.
          - generic [ref=e790]:
            - generic [ref=e791]: "03"
            - img [ref=e792]
            - heading "Service familial" [level=3] [ref=e794]
            - paragraph [ref=e795]: Une boutique où vous êtes un nom, pas un numéro.
          - generic [ref=e797]:
            - generic [ref=e798]: "04"
            - img [ref=e799]
            - heading "Au cœur de Laval" [level=3] [ref=e802]
            - paragraph [ref=e803]: Boulevard des Laurentides — stationnement et visite faciles.
      - generic [ref=e805]:
        - generic [ref=e806]:
          - generic [ref=e807]:
            - generic [ref=e808]: O
            - generic [ref=e809]: u
            - generic [ref=e810]: t
            - generic [ref=e811]: i
            - generic [ref=e812]: l
            - generic [ref=e813]: s
          - heading "Petits outils, grandes décisions." [level=2] [ref=e814]:
            - generic [ref=e816]: Petits
            - generic [ref=e818]: outils,
            - generic [ref=e820]: grandes
            - generic [ref=e822]: décisions.
        - generic [ref=e823]:
          - link "Aperçu Quiz cadeau 3 questions, une sélection personnalisée." [ref=e825]:
            - /url: /fr/explore/#gift
            - generic [ref=e827]:
              - img [ref=e828]
              - generic [ref=e832]: Aperçu
            - heading "Quiz cadeau" [level=3] [ref=e833]
            - paragraph [ref=e834]: 3 questions, une sélection personnalisée.
            - generic [ref=e835]: →
          - link "Aperçu Guide des tailles de bague Trouvez la taille sans demander." [ref=e837]:
            - /url: /fr/explore/#size
            - generic [ref=e839]:
              - img [ref=e840]
              - generic [ref=e842]: Aperçu
            - heading "Guide des tailles de bague" [level=3] [ref=e843]
            - paragraph [ref=e844]: Trouvez la taille sans demander.
            - generic [ref=e845]: →
          - link "Aperçu Visualiseur de longueur de chaîne Visualisez chaque longueur." [ref=e847]:
            - /url: /fr/explore/#chain
            - generic [ref=e849]:
              - img [ref=e850]
              - generic [ref=e853]: Aperçu
            - heading "Visualiseur de longueur de chaîne" [level=3] [ref=e854]
            - paragraph [ref=e855]: Visualisez chaque longueur.
            - generic [ref=e856]: →
          - link "En ligne Suivi de réparation Vérifiez votre réparation par numéro de référence." [ref=e858]:
            - /url: /fr/explore/#status
            - generic [ref=e860]:
              - img [ref=e861]
              - generic [ref=e864]: En ligne
            - heading "Suivi de réparation" [level=3] [ref=e865]
            - paragraph [ref=e866]: Vérifiez votre réparation par numéro de référence.
            - generic [ref=e867]: →
          - link "Aperçu Guide d'entretien Gardez l'or et les pierres comme neufs." [ref=e869]:
            - /url: /fr/explore/#care
            - generic [ref=e871]:
              - img [ref=e872]
              - generic [ref=e875]: Aperçu
            - heading "Guide d'entretien" [level=3] [ref=e876]
            - paragraph [ref=e877]: Gardez l'or et les pierres comme neufs.
            - generic [ref=e878]: →
      - generic [ref=e880]:
        - generic [ref=e881]:
          - generic [ref=e882]:
            - generic [ref=e883]: V
            - generic [ref=e884]: i
            - generic [ref=e885]: s
            - generic [ref=e886]: i
            - generic [ref=e887]: t
            - generic [ref=e888]: e
            - generic [ref=e889]: z
            - generic [ref=e890]: "-"
            - generic [ref=e891]: "n"
            - generic [ref=e892]: o
            - generic [ref=e893]: u
            - generic [ref=e894]: s
          - heading "Au cœur de Laval." [level=2] [ref=e895]:
            - generic [ref=e897]: Au
            - generic [ref=e899]: cœur
            - generic [ref=e901]: de
            - generic [ref=e903]: Laval.
          - paragraph [ref=e905]: 3000 Boulevard des Laurentides, Laval, QC H7K 3G5
        - generic [ref=e906]:
          - link "(450) 629-2959" [ref=e907]:
            - /url: tel:+14506292959
            - img [ref=e908]
            - generic [ref=e910]: (450) 629-2959
          - link "Itinéraire" [ref=e911]:
            - /url: https://www.google.com/maps/dir/?api=1&destination=3000+Boulevard+des+Laurentides+Laval+QC+H7K+3G5
            - img [ref=e912]
            - text: Itinéraire
          - link "Instagram" [ref=e915]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e916]
            - text: Instagram
    - generic [ref=e922]:
      - generic [ref=e923]:
        - text: Besoin d'aide ?
        - heading "Laissez Ormania vous guider." [level=2] [ref=e924]
        - paragraph [ref=e925]: Dites-nous ce que vous recherchez et la boutique pourra vous orienter vers les bonnes pièces.
        - button "Demander à Ormania" [ref=e926]:
          - img [ref=e927]
          - text: Demander à Ormania
          - img [ref=e929]
      - generic [ref=e931]:
        - heading "Demande rapide" [level=3] [ref=e932]
        - generic [ref=e933]:
          - textbox "Nom" [ref=e934]
          - textbox "Téléphone" [ref=e935]
          - textbox "Message" [ref=e936]
          - button "Envoyer" [ref=e937]
    - generic [ref=e939]:
      - generic [ref=e940]:
        - generic [ref=e941]:
          - text: Récemment
          - heading "Récemment à Ormania" [level=2] [ref=e942]
        - paragraph [ref=e943]: Ce qui se passe en boutique en ce moment.
      - generic [ref=e944]:
        - generic [ref=e946] [cursor=pointer]:
          - generic [ref=e947]:
            - generic [ref=e948]: Nouveau cette semaine
            - button [ref=e949]:
              - img [ref=e950]
          - generic [ref=e953]: Image placeholder
          - heading "Bracelet tennis de lab" [level=3] [ref=e954]
          - button "Demander" [ref=e955]:
            - generic [ref=e956]: Demander
            - img [ref=e957]
        - generic [ref=e960] [cursor=pointer]:
          - generic [ref=e961]:
            - generic [ref=e962]: Populaire en boutique
            - button [ref=e963]:
              - img [ref=e964]
          - generic [ref=e967]: Image placeholder
          - heading "Collier diamant halo" [level=3] [ref=e968]
          - button "Demander" [ref=e969]:
            - generic [ref=e970]: Demander
            - img [ref=e971]
        - generic [ref=e974] [cursor=pointer]:
          - generic [ref=e975]:
            - generic [ref=e976]: Pièce sur mesure
            - button [ref=e977]:
              - img [ref=e978]
          - generic [ref=e981]: Image placeholder
          - heading "Empilez vos bagues" [level=3] [ref=e982]
          - button "Demander" [ref=e983]:
            - generic [ref=e984]: Demander
            - img [ref=e985]
        - generic [ref=e988] [cursor=pointer]:
          - generic [ref=e989]:
            - generic [ref=e990]: Idée cadeau
            - button [ref=e991]:
              - img [ref=e992]
          - generic [ref=e995]: Image placeholder
          - heading "Boucles d'oreilles perle" [level=3] [ref=e996]
          - button "Demander" [ref=e997]:
            - generic [ref=e998]: Demander
            - img [ref=e999]
        - generic [ref=e1002] [cursor=pointer]:
          - generic [ref=e1003]:
            - generic [ref=e1004]: Récemment en vedette
            - button [ref=e1005]:
              - img [ref=e1006]
          - generic [ref=e1009]: Image placeholder
          - heading "Chaîne en or 18\"" [level=3] [ref=e1010]
          - button "Demander" [ref=e1011]:
            - generic [ref=e1012]: Demander
            - img [ref=e1013]
        - generic [ref=e1016] [cursor=pointer]:
          - generic [ref=e1017]:
            - generic [ref=e1018]: Demander la disponibilité
            - button [ref=e1019]:
              - img [ref=e1020]
          - generic [ref=e1023]: Image placeholder
          - heading "Bague de fiançailles" [level=3] [ref=e1024]
          - button "Demander" [ref=e1025]:
            - generic [ref=e1026]: Demander
            - img [ref=e1027]
    - generic [ref=e1030]:
      - generic [ref=e1031]:
        - text: Avant / Après
        - heading "Restauré, redimensionné, réparé, mémorisé." [level=2] [ref=e1032]
      - generic [ref=e1033]:
        - generic [ref=e1036]:
          - generic [ref=e1038]: Après
          - generic [ref=e1040]: Avant
          - generic [ref=e1042]: ↔
          - generic [ref=e1043]: Chaîne cassée → réparée
        - generic [ref=e1046]:
          - generic [ref=e1048]: Après
          - generic [ref=e1050]: Avant
          - generic [ref=e1052]: ↔
          - generic [ref=e1053]: Bague redimensionnée → prête à porter
        - generic [ref=e1056]:
          - generic [ref=e1058]: Après
          - generic [ref=e1060]: Avant
          - generic [ref=e1062]: ↔
          - generic [ref=e1063]: Pierre desserrée → fixée
        - generic [ref=e1066]:
          - generic [ref=e1068]: Après
          - generic [ref=e1070]: Avant
          - generic [ref=e1072]: ↔
          - generic [ref=e1073]: Pile de montre → remplacée
        - generic [ref=e1076]:
          - generic [ref=e1078]: Après
          - generic [ref=e1080]: Avant
          - generic [ref=e1082]: ↔
          - generic [ref=e1083]: Pièce ternie → polie
        - generic [ref=e1086]:
          - generic [ref=e1088]: Après
          - generic [ref=e1090]: Avant
          - generic [ref=e1092]: ↔
          - generic [ref=e1093]: Fermoir remplacé → à nouveau portable
      - button "Envoyez-nous des photos de votre réparation" [ref=e1095]:
        - img [ref=e1096]
        - text: Envoyez-nous des photos de votre réparation
    - generic [ref=e1100]:
      - generic [ref=e1101]:
        - text: Outils et guides
        - heading "Petits outils, grandes décisions." [level=2] [ref=e1102]
      - generic [ref=e1103]:
        - generic [ref=e1105] [cursor=pointer]:
          - img [ref=e1107]
          - heading "Trouver un cadeau" [level=3] [ref=e1111]
          - generic [ref=e1112]: En ligne
        - generic [ref=e1114] [cursor=pointer]:
          - img [ref=e1116]
          - heading "Guide des tailles" [level=3] [ref=e1122]
          - generic [ref=e1123]: En ligne
        - generic [ref=e1125] [cursor=pointer]:
          - img [ref=e1127]
          - heading "Longueur de chaîne" [level=3] [ref=e1130]
          - generic [ref=e1131]: En ligne
        - generic [ref=e1133] [cursor=pointer]:
          - img [ref=e1135]
          - heading "Statut de réparation" [level=3] [ref=e1138]
          - generic [ref=e1139]: Aperçu
        - generic [ref=e1141] [cursor=pointer]:
          - img [ref=e1143]
          - heading "Guide d'entretien" [level=3] [ref=e1145]
          - generic [ref=e1146]: En ligne
        - generic [ref=e1148]:
          - img [ref=e1150]
          - heading "Trouver l'occasion" [level=3] [ref=e1152]
          - generic [ref=e1153]: Bientôt
        - generic [ref=e1155]:
          - img [ref=e1157]
          - heading "Trouver le style" [level=3] [ref=e1160]
          - generic [ref=e1161]: Bientôt
        - generic [ref=e1163]:
          - img [ref=e1165]
          - heading "Rappel d'entretien" [level=3] [ref=e1168]
          - generic [ref=e1169]: Bientôt
        - generic [ref=e1171]:
          - img [ref=e1173]
          - heading "Rappel de pile" [level=3] [ref=e1178]
          - generic [ref=e1179]: Bientôt
        - generic [ref=e1181]:
          - img [ref=e1183]
          - heading "Rappel de nettoyage" [level=3] [ref=e1186]
          - generic [ref=e1187]: Bientôt
    - generic [ref=e1189]:
      - generic [ref=e1190]:
        - text: Confiance
        - heading "De confiance à Laval." [level=2] [ref=e1191]
      - generic [ref=e1192]:
        - generic [ref=e1193]:
          - img [ref=e1194]
          - generic [ref=e1197]: Boutique locale de Laval
        - generic [ref=e1198]:
          - img [ref=e1199]
          - generic [ref=e1201]: Service personnalisé
        - generic [ref=e1202]:
          - img [ref=e1203]
          - generic [ref=e1205]: Réparations et travail sur mesure
        - generic [ref=e1206]:
          - img [ref=e1207]
          - generic [ref=e1209]: Demandes Instagram bienvenues
      - generic [ref=e1210]:
        - generic [ref=e1212]:
          - generic [ref=e1213]:
            - img [ref=e1214]
            - img [ref=e1216]
            - img [ref=e1218]
            - img [ref=e1220]
            - img [ref=e1222]
          - paragraph [ref=e1224]: "\"Ormania a redimensionné la bague de ma grand-mère et elle fits parfaitement. Le soin apporté était incroyable.\""
          - text: Sarah M.
        - generic [ref=e1226]:
          - generic [ref=e1227]:
            - img [ref=e1228]
            - img [ref=e1230]
            - img [ref=e1232]
            - img [ref=e1234]
            - img [ref=e1236]
          - paragraph [ref=e1238]: "\"J'ai trouvé ma bague de fiançailles ici après des mois de recherche. L'équipe a rendu le moment spécial.\""
          - text: Alex T.
      - generic [ref=e1239]:
        - paragraph [ref=e1240]: Bijouterie Ormania est une boutique familiale au cœur de Laval. Depuis des années, nous aidons nos clients à marquer les moments importants de leur vie avec des bijoux qui racontent une histoire.
        - button "Contactez-nous" [ref=e1241]:
          - text: Contactez-nous
          - img [ref=e1242]
  - contentinfo [ref=e1244]:
    - generic [ref=e1245]:
      - navigation "Footer navigation" [ref=e1246]:
        - link "Collections" [ref=e1248]:
          - /url: /fr/collections/
        - link "Instagram" [ref=e1251]:
          - /url: /fr/instagram/
        - link "Fiançailles" [ref=e1254]:
          - /url: /fr/engagement/
        - link "Outils" [ref=e1257]:
          - /url: /fr/explore/
        - link "Sur mesure" [ref=e1260]:
          - /url: /fr/custom/
        - link "Réparations" [ref=e1263]:
          - /url: /fr/repairs/
        - link "Visite" [ref=e1266]:
          - /url: /fr/visit/
        - link "Présentation" [ref=e1269]:
          - /url: /fr/pitch/
      - generic [ref=e1270]:
        - generic:
          - img
        - img "Ormania" [ref=e1271]
        - paragraph [ref=e1272]: Des bijoux faits pour être mémorables.
        - generic [ref=e1273]:
          - link "Instagram" [ref=e1274]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e1275]
          - link "Phone" [ref=e1278]:
            - /url: tel:+14506292959
            - text: (450) 629-2959
      - generic [ref=e1279]:
        - generic [ref=e1280]: © 2026 Bijouterie Ormania. Tous droits réservés.
        - generic [ref=e1281]:
          - link "Confidentialité" [ref=e1282]:
            - /url: /fr/privacy/
          - link "Conditions" [ref=e1283]:
            - /url: /fr/terms/
          - link "Personnel" [ref=e1284]:
            - /url: /fr/admin/
  - button "Open Next.js Dev Tools" [ref=e1290] [cursor=pointer]:
    - img [ref=e1291]
  - alert [ref=e1294]
  - button "Back to top" [ref=e1295]:
    - img [ref=e1296]
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