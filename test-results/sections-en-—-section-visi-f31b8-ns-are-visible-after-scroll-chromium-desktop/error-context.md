# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: sections.spec.ts >> en — section visibility >> home page sections are visible after scroll
- Location: e2e/sections.spec.ts:7:9

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.evaluate: Test timeout of 30000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content" [ref=e2]:
    - /url: "#main"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Ormania home" [ref=e5]:
        - /url: /en/
        - img "Ormania" [ref=e6]
      - navigation "Main" [ref=e7]:
        - link "Home" [ref=e9]:
          - /url: /en/
          - text: Home
        - link "Collections" [ref=e12]:
          - /url: /en/collections/
        - link "Instagram" [ref=e14]:
          - /url: /en/instagram/
        - link "Custom" [ref=e16]:
          - /url: /en/custom/
        - link "Repairs" [ref=e18]:
          - /url: /en/repairs/
        - link "Engagement" [ref=e20]:
          - /url: /en/engagement/
        - link "Visit" [ref=e22]:
          - /url: /en/visit/
      - generic [ref=e23]:
        - link "Passer au français" [ref=e24]:
          - /url: /fr/
          - generic [ref=e25]: EN
          - generic [ref=e26]: /
          - generic [ref=e27]: FR
        - button "Saved pieces" [ref=e28]:
          - img [ref=e29]
        - button "Compare" [ref=e31]:
          - img [ref=e32]
        - link "Book Consultation" [ref=e36]:
          - /url: /en/engagement/#book
  - main [ref=e38]:
    - region "Hero" [ref=e42]:
      - generic: ORMANIA
      - generic [ref=e44]:
        - img "Bijouterie Ormania" [ref=e47]
        - generic [ref=e49]:
          - generic [ref=e50]: Bijouterie Ormania — Laval
          - heading "J e w e l r y m a d e t o b e r e m e m b e r e d ." [level=1] [ref=e52]:
            - generic [ref=e53]:
              - generic [ref=e54]:
                - generic [ref=e55]: J
                - generic [ref=e56]: e
                - generic [ref=e57]: w
                - generic [ref=e58]: e
                - generic [ref=e59]: l
                - generic [ref=e60]: r
                - generic [ref=e61]: "y"
              - generic [ref=e64]:
                - generic [ref=e65]: m
                - generic [ref=e66]: a
                - generic [ref=e67]: d
                - generic [ref=e68]: e
              - generic [ref=e71]:
                - generic [ref=e72]: t
                - generic [ref=e73]: o
              - generic [ref=e76]:
                - generic [ref=e77]: b
                - generic [ref=e78]: e
              - generic [ref=e81]:
                - generic [ref=e82]: r
                - generic [ref=e83]: e
                - generic [ref=e84]: m
                - generic [ref=e85]: e
                - generic [ref=e86]: m
                - generic [ref=e87]: b
                - generic [ref=e88]: e
                - generic [ref=e89]: r
                - generic [ref=e90]: e
                - generic [ref=e91]: d
                - generic [ref=e92]: .
          - paragraph [ref=e94]: Fine jewelry, custom pieces, repairs, watches, and timeless gifts — in the heart of Laval.
          - generic [ref=e95]:
            - link "Explore Collections" [ref=e96]:
              - /url: /en/collections/
              - generic [ref=e97]: Explore Collections
              - generic [ref=e98]: →
            - link "Book a Consultation" [ref=e99]:
              - /url: /en/engagement/#book
              - generic [ref=e100]: Book a Consultation
          - link "Seen something on Instagram?" [ref=e102]:
            - /url: /en/instagram/
            - img [ref=e103]
            - text: Seen something on Instagram?
            - generic [ref=e106]: →
      - link "Scroll" [ref=e110]:
        - /url: "#featured"
        - text: Scroll
        - img [ref=e111]
    - generic [ref=e112]:
      - generic [ref=e114]:
        - generic [ref=e115]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e116]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e117]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e118]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e119]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
        - generic [ref=e120]: Laval · Custom · Repair · Gold · Engagement · Gifts · Watches · Ormania ·
      - generic [ref=e122]:
        - generic [ref=e123]:
          - text: Bijouterie Ormania — Laval
          - heading "Ormania turns everyday moments into pieces you keep close." [level=2] [ref=e124]:
            - generic [ref=e125]:
              - generic [ref=e127]: Ormania
              - generic [ref=e129]: turns
              - generic [ref=e131]: everyday
              - generic [ref=e133]: moments
              - generic [ref=e135]: into
              - generic [ref=e137]: pieces
              - generic [ref=e139]: you
              - generic [ref=e141]: keep
              - generic [ref=e143]: close.
        - paragraph [ref=e146]: A Laval jewelry boutique for fine pieces, meaningful gifts, custom work, repairs, watches, and engagement moments.
    - generic [ref=e148]:
      - text: Signature Services
      - heading "Our craft, at your service." [level=2] [ref=e149]
      - generic [ref=e150]:
        - generic [ref=e152]:
          - img [ref=e154]
          - generic [ref=e157]:
            - heading "Custom Design" [level=3] [ref=e158]
            - paragraph [ref=e159]: From idea to finished piece.
            - paragraph [ref=e160]: Bring us a sketch, a photo, or just a feeling. We guide you through materials, stones, and design until it feels exactly right.
        - generic [ref=e162]:
          - img [ref=e164]
          - generic [ref=e166]:
            - heading "Jewelry Restoration" [level=3] [ref=e167]
            - paragraph [ref=e168]: Repairs, resizing, polishing, and stone work.
            - paragraph [ref=e169]: Sizing, stones, clasps, polish, watch batteries — most repairs are done in-house in Laval with care and precision.
        - generic [ref=e171]:
          - img [ref=e173]
          - generic [ref=e175]:
            - heading "Engagement Guidance" [level=3] [ref=e176]
            - paragraph [ref=e177]: Personal help choosing or creating the ring.
            - paragraph [ref=e178]: Natural and lab-grown diamonds, private consultations, and a ring made for one story — yours.
        - generic [ref=e180]:
          - img [ref=e182]
          - generic [ref=e186]:
            - heading "Gift Curation" [level=3] [ref=e187]
            - paragraph [ref=e188]: Help finding something meaningful.
            - paragraph [ref=e189]: Not sure what to choose? Tell us about the person and the occasion. We'll suggest pieces that feel personal and lasting.
    - generic [ref=e191]:
      - generic [ref=e192]:
        - text: Shop by Intention
        - heading "How can we help you?" [level=2] [ref=e193]
      - generic [ref=e194]:
        - generic [ref=e195] [cursor=pointer]:
          - generic [ref=e196]:
            - img [ref=e198]
            - generic [ref=e201]: Custom
          - heading "Make it personal" [level=3] [ref=e202]
          - paragraph [ref=e203]: Custom jewelry, engraving, meaningful pieces.
          - generic [ref=e204]:
            - generic [ref=e205]: Explore
            - generic [ref=e206]: →
        - generic [ref=e207] [cursor=pointer]:
          - generic [ref=e208]:
            - img [ref=e210]
            - generic [ref=e212]: Engagement
          - heading "Mark a milestone" [level=3] [ref=e213]
          - paragraph [ref=e214]: Engagement, anniversary, graduation, special moments.
          - generic [ref=e215]:
            - generic [ref=e216]: Explore
            - generic [ref=e217]: →
        - generic [ref=e218] [cursor=pointer]:
          - generic [ref=e219]:
            - img [ref=e221]
            - generic [ref=e227]: Explore
          - heading "Everyday gold" [level=3] [ref=e228]
          - paragraph [ref=e229]: Chains, rings, bracelets, and daily pieces.
          - generic [ref=e230]:
            - generic [ref=e231]: Explore
            - generic [ref=e232]: →
        - generic [ref=e233] [cursor=pointer]:
          - generic [ref=e234]:
            - img [ref=e236]
            - generic [ref=e240]: Men's
          - heading "Something for him" [level=3] [ref=e241]
          - paragraph [ref=e242]: Men's rings, chains, watches, and gifts.
          - generic [ref=e243]:
            - generic [ref=e244]: Explore
            - generic [ref=e245]: →
        - generic [ref=e246] [cursor=pointer]:
          - generic [ref=e247]:
            - img [ref=e249]
            - generic [ref=e251]: Repair
          - heading "Repair what matters" [level=3] [ref=e252]
          - paragraph [ref=e253]: Resize, restore, polish, and fix the pieces you love.
          - generic [ref=e254]:
            - generic [ref=e255]: Explore
            - generic [ref=e256]: →
        - generic [ref=e257] [cursor=pointer]:
          - generic [ref=e258]:
            - img [ref=e260]
            - generic [ref=e263]: Gift Finder
          - heading "Find a gift" [level=3] [ref=e264]
          - paragraph [ref=e265]: Guided gift ideas by occasion, style, and budget.
          - generic [ref=e266]:
            - generic [ref=e267]: Explore
            - generic [ref=e268]: →
    - generic [ref=e269]:
      - generic [ref=e271]:
        - generic [ref=e272]:
          - generic [ref=e273]:
            - generic [ref=e274]: D
            - generic [ref=e275]: i
            - generic [ref=e276]: s
            - generic [ref=e277]: c
            - generic [ref=e278]: o
            - generic [ref=e279]: v
            - generic [ref=e280]: e
            - generic [ref=e281]: r
          - heading "Our collections, ready in store." [level=2] [ref=e282]:
            - generic [ref=e284]: Our
            - generic [ref=e286]: collections,
            - generic [ref=e288]: ready
            - generic [ref=e290]: in
            - generic [ref=e292]: store.
          - paragraph [ref=e294]: From everyday pieces to heirloom commissions — browse what's at Ormania this season.
        - generic [ref=e295]:
          - link "Chains & Necklaces Chains & Necklaces Cuban links, torsades, and diamond pieces — solid gold, ready in store. View" [ref=e298]:
            - /url: /en/collections/#chains
            - img "Chains & Necklaces" [ref=e299]
            - generic [ref=e301]:
              - heading "Chains & Necklaces" [level=3] [ref=e302]
              - paragraph: Cuban links, torsades, and diamond pieces — solid gold, ready in store.
              - generic [ref=e303]:
                - text: View
                - generic [ref=e304]: →
          - link "Rings Rings Stackable bands, statement gold, and everyday diamonds. View" [ref=e307]:
            - /url: /en/collections/#rings
            - img "Rings" [ref=e308]
            - generic [ref=e310]:
              - heading "Rings" [level=3] [ref=e311]
              - paragraph: Stackable bands, statement gold, and everyday diamonds.
              - generic [ref=e312]:
                - text: View
                - generic [ref=e313]: →
          - link "Bracelets Bracelets Tennis bracelets and gold bangles that never come off. View" [ref=e316]:
            - /url: /en/collections/#bracelets
            - img "Bracelets" [ref=e317]
            - generic [ref=e319]:
              - heading "Bracelets" [level=3] [ref=e320]
              - paragraph: Tennis bracelets and gold bangles that never come off.
              - generic [ref=e321]:
                - text: View
                - generic [ref=e322]: →
          - link "Watches Watches Selected Swiss timepieces, batteries, and service. View" [ref=e325]:
            - /url: /en/collections/#watches
            - img "Watches" [ref=e326]
            - generic [ref=e328]:
              - heading "Watches" [level=3] [ref=e329]
              - paragraph: Selected Swiss timepieces, batteries, and service.
              - generic [ref=e330]:
                - text: View
                - generic [ref=e331]: →
          - link "Engagement Engagement Natural and lab-grown diamonds, set to be remembered. View" [ref=e334]:
            - /url: /en/collections/#engagement
            - img "Engagement" [ref=e335]
            - generic [ref=e337]:
              - heading "Engagement" [level=3] [ref=e338]
              - paragraph: Natural and lab-grown diamonds, set to be remembered.
              - generic [ref=e339]:
                - text: View
                - generic [ref=e340]: →
          - link "Custom Pieces Custom Pieces One-of-one commissions, designed with you at the bench. View" [ref=e343]:
            - /url: /en/collections/#custom
            - img "Custom Pieces" [ref=e344]
            - generic [ref=e346]:
              - heading "Custom Pieces" [level=3] [ref=e347]
              - paragraph: One-of-one commissions, designed with you at the bench.
              - generic [ref=e348]:
                - text: View
                - generic [ref=e349]: →
      - generic [ref=e351]:
        - paragraph [ref=e352]: Seen on Instagram
        - generic [ref=e353]:
          - generic [ref=e354]:
            - article [ref=e355]:
              - link "Lab-Grown Tennis Bracelet — Instagram" [ref=e356]:
                - /url: https://www.instagram.com/p/DSAifEiDouU/
                - generic [ref=e357]:
                  - img "Lab-Grown Tennis Bracelet" [ref=e358]
                  - generic [ref=e361]: In stock
                  - generic [ref=e362]: Recently posted
                  - generic [ref=e363]:
                    - heading "Lab-Grown Tennis Bracelet" [level=3] [ref=e364]
                    - paragraph [ref=e365]: Your new never-taking-it-off bracelet — lab-grown tennis, made to shine all season long.
              - button "Ask About This" [ref=e367]
            - article [ref=e368]:
              - link "Halo Diamond Necklace — Instagram" [ref=e369]:
                - /url: https://www.instagram.com/reel/DSdMAuPETdF/
                - generic [ref=e370]:
                  - img "Halo Diamond Necklace" [ref=e371]
                  - generic [ref=e373]:
                    - generic [ref=e374]: In store
                    - generic [ref=e375]:
                      - img [ref=e376]
                      - text: Reel
                  - generic [ref=e378]: Recently posted
                  - generic [ref=e379]:
                    - heading "Halo Diamond Necklace" [level=3] [ref=e380]
                    - paragraph [ref=e381]: Halo diamond necklace, available in store.
              - button "Ask About This" [ref=e383]
            - article [ref=e384]:
              - link "Stack Your Rings — Instagram" [ref=e385]:
                - /url: https://www.instagram.com/reel/DSaTiT1jgKb/
                - generic [ref=e386]:
                  - img "Stack Your Rings" [ref=e387]
                  - generic [ref=e389]:
                    - generic [ref=e390]: In store
                    - generic [ref=e391]:
                      - img [ref=e392]
                      - text: Reel
                  - generic [ref=e394]: Recently posted
                  - generic [ref=e395]:
                    - heading "Stack Your Rings" [level=3] [ref=e396]
                    - paragraph [ref=e397]: This is your sign to stack — custom jewelry, Laval.
              - button "Ask About This" [ref=e399]
            - article [ref=e400]:
              - link "Sterling Silver & Moissanite — Instagram" [ref=e401]:
                - /url: https://www.instagram.com/reel/DSVUrrLDrSl/
                - generic [ref=e402]:
                  - img "Sterling Silver & Moissanite" [ref=e403]
                  - generic [ref=e405]:
                    - generic [ref=e406]: In store
                    - generic [ref=e407]:
                      - img [ref=e408]
                      - text: Reel
                  - generic [ref=e410]: Recently posted
                  - generic [ref=e411]:
                    - heading "Sterling Silver & Moissanite" [level=3] [ref=e412]
                    - paragraph [ref=e413]: Silver at its all-time high — S925 sterling silver moissanite pieces in store.
              - button "Ask About This" [ref=e415]
            - article [ref=e416]:
              - link "A Gift She'll Wear Every Day — Instagram" [ref=e417]:
                - /url: https://www.instagram.com/reel/DRzvxN2kWfn/
                - generic [ref=e418]:
                  - img "A Gift She'll Wear Every Day" [ref=e419]
                  - generic [ref=e421]:
                    - generic [ref=e422]: In store
                    - generic [ref=e423]:
                      - img [ref=e424]
                      - text: Reel
                  - generic [ref=e426]:
                    - heading "A Gift She'll Wear Every Day" [level=3] [ref=e427]
                    - paragraph [ref=e428]: Not sure what to get her? Start with something she'll wear every day.
              - button "Ask About This" [ref=e430]
            - article [ref=e431]:
              - link "Custom Pearl Earrings — Instagram" [ref=e432]:
                - /url: https://www.instagram.com/reel/DRP2awpjmhB/
                - generic [ref=e433]:
                  - img "Custom Pearl Earrings" [ref=e434]
                  - generic [ref=e436]:
                    - generic [ref=e437]: Commission
                    - generic [ref=e438]:
                      - img [ref=e439]
                      - text: Reel
                  - generic [ref=e441]:
                    - heading "Custom Pearl Earrings" [level=3] [ref=e442]
                    - paragraph [ref=e443]: A custom pair of earrings designed to match her pearls — a 65th birthday gift.
              - button "Ask About This" [ref=e445]
            - article [ref=e446]:
              - link "Baume & Mercier M0A10619 — Instagram" [ref=e447]:
                - /url: https://www.instagram.com/p/DHuHBHMuREj/
                - generic [ref=e448]:
                  - img "Baume & Mercier M0A10619" [ref=e449]
                  - generic [ref=e452]: In stock
                  - generic [ref=e453]:
                    - heading "Baume & Mercier M0A10619" [level=3] [ref=e454]
                    - paragraph [ref=e455]: New arrival — Baume & Mercier M0A10619, in stock and ready.
              - button "Ask About This" [ref=e457]
            - article [ref=e458]:
              - link "Men's Solitaire Diamond Ring — Instagram" [ref=e459]:
                - /url: https://www.instagram.com/reel/DCu5JdFO5TV/
                - generic [ref=e460]:
                  - img "Men's Solitaire Diamond Ring" [ref=e461]
                  - generic [ref=e463]:
                    - generic [ref=e464]: In store
                    - generic [ref=e465]:
                      - img [ref=e466]
                      - text: Reel
                  - generic [ref=e468]:
                    - heading "Men's Solitaire Diamond Ring" [level=3] [ref=e469]
                    - paragraph [ref=e470]: Our men's ring collection — crafted to bring elegance to every occasion.
              - button "Ask About This" [ref=e472]
          - generic [ref=e473]:
            - button "Upload a Screenshot" [ref=e474]:
              - img [ref=e475]
              - text: Upload a Screenshot
            - button "Paste an Instagram Link" [ref=e478]:
              - img [ref=e479]
              - text: Paste an Instagram Link
        - link "See the Full Showroom" [ref=e483]:
          - /url: /en/instagram/
          - text: See the Full Showroom
          - generic [ref=e484]: →
      - generic [ref=e486]:
        - generic [ref=e497]: The Craft
        - generic [ref=e498]:
          - generic [ref=e499]:
            - generic [ref=e500]: 01 / 04
            - heading "Design" [level=2] [ref=e501]
            - paragraph [ref=e502]: Every piece starts with a conversation. We sketch, model, and refine until it feels like yours.
          - generic [ref=e504]:
            - generic [ref=e505]: 02 / 04
            - heading "Source" [level=2] [ref=e506]
            - paragraph [ref=e507]: Natural and lab-grown diamonds, ethically sourced and hand-selected for brilliance.
          - generic [ref=e509]:
            - generic [ref=e510]: 03 / 04
            - heading "Craft" [level=2] [ref=e511]
            - paragraph [ref=e512]: Our bench in Laval brings it to life — casting, setting, polishing, all in-house.
          - generic [ref=e514]:
            - generic [ref=e515]: 04 / 04
            - heading "Restore" [level=2] [ref=e516]
            - paragraph [ref=e517]: Repairs, restorations, and watch services — trusted by generations.
      - generic [ref=e520]:
        - generic [ref=e521]:
          - img "Custom pearl earrings made at Ormania" [ref=e522]
          - generic [ref=e524]: “Earrings made to match her pearls — a 65th birthday gift.”
        - generic [ref=e525]:
          - generic [ref=e526]:
            - generic [ref=e527]:
              - generic [ref=e528]: C
              - generic [ref=e529]: u
              - generic [ref=e530]: s
              - generic [ref=e531]: t
              - generic [ref=e532]: o
              - generic [ref=e533]: m
              - generic [ref=e535]: J
              - generic [ref=e536]: e
              - generic [ref=e537]: w
              - generic [ref=e538]: e
              - generic [ref=e539]: l
              - generic [ref=e540]: r
              - generic [ref=e541]: "y"
            - heading "If you can imagine it, we can make it." [level=2] [ref=e542]:
              - generic [ref=e544]: If
              - generic [ref=e546]: you
              - generic [ref=e548]: can
              - generic [ref=e550]: imagine
              - generic [ref=e552]: it,
              - generic [ref=e554]: we
              - generic [ref=e556]: can
              - generic [ref=e558]: make
              - generic [ref=e560]: it.
            - paragraph [ref=e562]: From a sketch on a napkin to a screenshot from Instagram — our bench brings one-of-one pieces to life.
          - generic [ref=e563]:
            - generic [ref=e564]:
              - generic [ref=e565]: "1"
              - generic [ref=e566]:
                - heading "Share your idea" [level=3] [ref=e567]
                - paragraph [ref=e568]: Photos, sketches, a story — anything that inspires you.
            - generic [ref=e569]:
              - generic [ref=e570]: "2"
              - generic [ref=e571]:
                - heading "Design together" [level=3] [ref=e572]
                - paragraph [ref=e573]: We refine the design, metal, and stones with you.
            - generic [ref=e574]:
              - generic [ref=e575]: "3"
              - generic [ref=e576]:
                - heading "Crafted at the bench" [level=3] [ref=e577]
                - paragraph [ref=e578]: Your piece is made with care, with updates along the way.
            - generic [ref=e579]:
              - generic [ref=e580]: "4"
              - generic [ref=e581]:
                - heading "Made to be remembered" [level=3] [ref=e582]
                - paragraph [ref=e583]: Pick it up in store — a piece that exists only once.
          - generic [ref=e584]:
            - button "Start a Custom Request" [ref=e585]:
              - generic [ref=e586]: Start a Custom Request
              - generic [ref=e587]: →
            - link "Learn more" [ref=e588]:
              - /url: /en/custom/
              - img [ref=e589]
              - text: Learn more
      - generic [ref=e593]:
        - generic [ref=e594]:
          - generic [ref=e595]:
            - generic [ref=e596]: R
            - generic [ref=e597]: e
            - generic [ref=e598]: p
            - generic [ref=e599]: a
            - generic [ref=e600]: i
            - generic [ref=e601]: r
            - generic [ref=e602]: s
            - generic [ref=e604]: "&"
            - generic [ref=e606]: C
            - generic [ref=e607]: a
            - generic [ref=e608]: r
            - generic [ref=e609]: e
          - heading "Bring it back to life." [level=2] [ref=e610]:
            - generic [ref=e612]: Bring
            - generic [ref=e614]: it
            - generic [ref=e616]: back
            - generic [ref=e618]: to
            - generic [ref=e620]: life.
          - paragraph [ref=e622]: Sizing, stones, clasps, polish, watch batteries — most repairs are done in-house in Laval.
        - generic [ref=e623]:
          - button "Ring sizing Up or down, most sizings done in-house." [ref=e625]:
            - img [ref=e626]
            - heading "Ring sizing" [level=3] [ref=e628]
            - paragraph [ref=e629]: Up or down, most sizings done in-house.
          - button "Chain & clasp repair Broken links, clasps, and solder work." [ref=e631]:
            - img [ref=e632]
            - heading "Chain & clasp repair" [level=3] [ref=e634]
            - paragraph [ref=e635]: Broken links, clasps, and solder work.
          - button "Stone setting & replacement Tighten, reset, or replace stones." [ref=e637]:
            - img [ref=e638]
            - heading "Stone setting & replacement" [level=3] [ref=e640]
            - paragraph [ref=e641]: Tighten, reset, or replace stones.
          - button "Polishing & rhodium Bring back the original shine." [ref=e643]:
            - img [ref=e644]
            - heading "Polishing & rhodium" [level=3] [ref=e646]
            - paragraph [ref=e647]: Bring back the original shine.
          - button "Watch batteries & service Batteries while you wait." [ref=e649]:
            - img [ref=e650]
            - heading "Watch batteries & service" [level=3] [ref=e652]
            - paragraph [ref=e653]: Batteries while you wait.
          - button "Cleaning & inspection Complimentary check of your pieces." [ref=e655]:
            - img [ref=e656]
            - heading "Cleaning & inspection" [level=3] [ref=e658]
            - paragraph [ref=e659]: Complimentary check of your pieces.
        - generic [ref=e660]:
          - button "Request a Repair Estimate" [ref=e661]:
            - generic [ref=e662]: Request a Repair Estimate
            - generic [ref=e663]: →
          - link "See repairs" [ref=e664]:
            - /url: /en/repairs/
            - img [ref=e665]
            - text: See repairs
      - generic [ref=e670]:
        - generic [ref=e671]:
          - generic [ref=e672]:
            - generic [ref=e673]:
              - generic [ref=e674]: E
              - generic [ref=e675]: "n"
              - generic [ref=e676]: g
              - generic [ref=e677]: a
              - generic [ref=e678]: g
              - generic [ref=e679]: e
              - generic [ref=e680]: m
              - generic [ref=e681]: e
              - generic [ref=e682]: "n"
              - generic [ref=e683]: t
            - heading "The yes deserves Ormania." [level=2] [ref=e684]:
              - generic [ref=e686]: The
              - generic [ref=e688]: "yes"
              - generic [ref=e690]: deserves
              - generic [ref=e692]: Ormania.
            - paragraph [ref=e694]: Natural and lab-grown diamonds, private consultations, and a ring made for one story — yours.
          - generic [ref=e695]:
            - button "Book Engagement Consultation" [ref=e696]:
              - generic [ref=e697]: Book Engagement Consultation
              - generic [ref=e698]: →
            - link "Engagement guide" [ref=e699]:
              - /url: /en/engagement/
              - img [ref=e700]
              - text: Engagement guide
        - img "Diamond engagement rings at Ormania" [ref=e703]
      - generic [ref=e706]:
        - generic [ref=e707]:
          - generic [ref=e708]:
            - generic [ref=e709]: W
            - generic [ref=e710]: h
            - generic [ref=e711]: "y"
            - generic [ref=e713]: O
            - generic [ref=e714]: r
            - generic [ref=e715]: m
            - generic [ref=e716]: a
            - generic [ref=e717]: "n"
            - generic [ref=e718]: i
            - generic [ref=e719]: a
          - heading "A boutique, not a counter." [level=2] [ref=e720]:
            - generic [ref=e722]: A
            - generic [ref=e724]: boutique,
            - generic [ref=e726]: not
            - generic [ref=e728]: a
            - generic [ref=e730]: counter.
        - generic [ref=e731]:
          - generic [ref=e733]:
            - generic [ref=e734]: "01"
            - img [ref=e735]
            - heading "Real pieces, in store" [level=3] [ref=e738]
            - paragraph [ref=e739]: Everything on our Instagram exists — come see it in person.
          - generic [ref=e741]:
            - generic [ref=e742]: "02"
            - img [ref=e743]
            - heading "Work done in-house" [level=3] [ref=e747]
            - paragraph [ref=e748]: Repairs and custom work at our own bench, not shipped away.
          - generic [ref=e750]:
            - generic [ref=e751]: "03"
            - img [ref=e752]
            - heading "Family service" [level=3] [ref=e754]
            - paragraph [ref=e755]: A boutique where you're a name, not a ticket number.
          - generic [ref=e757]:
            - generic [ref=e758]: "04"
            - img [ref=e759]
            - heading "In the heart of Laval" [level=3] [ref=e762]
            - paragraph [ref=e763]: Boulevard des Laurentides — easy parking, easy visit.
      - generic [ref=e765]:
        - generic [ref=e766]:
          - generic [ref=e767]:
            - generic [ref=e768]: T
            - generic [ref=e769]: o
            - generic [ref=e770]: o
            - generic [ref=e771]: l
            - generic [ref=e772]: s
          - heading "Little helpers, big decisions." [level=2] [ref=e773]:
            - generic [ref=e775]: Little
            - generic [ref=e777]: helpers,
            - generic [ref=e779]: big
            - generic [ref=e781]: decisions.
        - generic [ref=e782]:
          - link "Preview Gift Finder Quiz Answer 3 questions, get a shortlist." [ref=e784]:
            - /url: /en/explore/#gift
            - generic [ref=e786]:
              - img [ref=e787]
              - generic [ref=e791]: Preview
            - heading "Gift Finder Quiz" [level=3] [ref=e792]
            - paragraph [ref=e793]: Answer 3 questions, get a shortlist.
            - generic [ref=e794]: →
          - link "Preview Ring Size Guide Find their size without asking." [ref=e796]:
            - /url: /en/explore/#size
            - generic [ref=e798]:
              - img [ref=e799]
              - generic [ref=e801]: Preview
            - heading "Ring Size Guide" [level=3] [ref=e802]
            - paragraph [ref=e803]: Find their size without asking.
            - generic [ref=e804]: →
          - link "Preview Chain Length Visualizer See where each length falls." [ref=e806]:
            - /url: /en/explore/#chain
            - generic [ref=e808]:
              - img [ref=e809]
              - generic [ref=e812]: Preview
            - heading "Chain Length Visualizer" [level=3] [ref=e813]
            - paragraph [ref=e814]: See where each length falls.
            - generic [ref=e815]: →
          - link "Live Repair Status Lookup Check your repair by reference number." [ref=e817]:
            - /url: /en/explore/#status
            - generic [ref=e819]:
              - img [ref=e820]
              - generic [ref=e823]: Live
            - heading "Repair Status Lookup" [level=3] [ref=e824]
            - paragraph [ref=e825]: Check your repair by reference number.
            - generic [ref=e826]: →
          - link "Preview Jewelry Care Guide Keep gold and stones looking new." [ref=e828]:
            - /url: /en/explore/#care
            - generic [ref=e830]:
              - img [ref=e831]
              - generic [ref=e834]: Preview
            - heading "Jewelry Care Guide" [level=3] [ref=e835]
            - paragraph [ref=e836]: Keep gold and stones looking new.
            - generic [ref=e837]: →
      - generic [ref=e839]:
        - generic [ref=e840]:
          - generic [ref=e841]:
            - generic [ref=e842]: V
            - generic [ref=e843]: i
            - generic [ref=e844]: s
            - generic [ref=e845]: i
            - generic [ref=e846]: t
            - generic [ref=e848]: U
            - generic [ref=e849]: s
          - heading "In the heart of Laval." [level=2] [ref=e850]:
            - generic [ref=e852]: In
            - generic [ref=e854]: the
            - generic [ref=e856]: heart
            - generic [ref=e858]: of
            - generic [ref=e860]: Laval.
          - paragraph [ref=e862]: 3000 Boulevard des Laurentides, Laval, QC H7K 3G5
        - generic [ref=e863]:
          - link "(450) 629-2959" [ref=e864]:
            - /url: tel:+14506292959
            - img [ref=e865]
            - generic [ref=e867]: (450) 629-2959
          - link "Directions" [ref=e868]:
            - /url: https://www.google.com/maps/dir/?api=1&destination=3000+Boulevard+des+Laurentides+Laval+QC+H7K+3G5
            - img [ref=e869]
            - text: Directions
          - link "Instagram" [ref=e872]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e873]
            - text: Instagram
    - generic [ref=e879]:
      - generic [ref=e880]:
        - text: Need help choosing?
        - heading "Let Ormania guide you." [level=2] [ref=e881]
        - paragraph [ref=e882]: Tell Ormania what you are looking for and the boutique can guide you to the right pieces.
        - button "Ask Ormania" [ref=e883]:
          - img [ref=e884]
          - text: Ask Ormania
          - img [ref=e886]
      - generic [ref=e888]:
        - heading "Quick Ask" [level=3] [ref=e889]
        - generic [ref=e890]:
          - textbox "Name" [ref=e891]
          - textbox "Phone" [ref=e892]
          - textbox "Message" [ref=e893]
          - button "Send" [ref=e894]
    - generic [ref=e896]:
      - generic [ref=e897]:
        - generic [ref=e898]:
          - text: Recently at Ormania
          - heading "Recently at Ormania" [level=2] [ref=e899]
        - paragraph [ref=e900]: What's happening in the boutique right now.
      - generic [ref=e901]:
        - generic [ref=e903] [cursor=pointer]:
          - generic [ref=e904]:
            - generic [ref=e905]: New this week
            - button [ref=e906]:
              - img [ref=e907]
          - generic [ref=e910]: Image placeholder
          - heading "Lab-Grown Tennis Bracelet" [level=3] [ref=e911]
          - button "Ask About This" [ref=e912]:
            - generic [ref=e913]: Ask About This
            - img [ref=e914]
        - generic [ref=e917] [cursor=pointer]:
          - generic [ref=e918]:
            - generic [ref=e919]: Popular in store
            - button [ref=e920]:
              - img [ref=e921]
          - generic [ref=e924]: Image placeholder
          - heading "Halo Diamond Necklace" [level=3] [ref=e925]
          - button "Ask About This" [ref=e926]:
            - generic [ref=e927]: Ask About This
            - img [ref=e928]
        - generic [ref=e931] [cursor=pointer]:
          - generic [ref=e932]:
            - generic [ref=e933]: Custom piece
            - button [ref=e934]:
              - img [ref=e935]
          - generic [ref=e938]: Image placeholder
          - heading "Stack Your Rings" [level=3] [ref=e939]
          - button "Ask About This" [ref=e940]:
            - generic [ref=e941]: Ask About This
            - img [ref=e942]
        - generic [ref=e945] [cursor=pointer]:
          - generic [ref=e946]:
            - generic [ref=e947]: Gift idea
            - button [ref=e948]:
              - img [ref=e949]
          - generic [ref=e952]: Image placeholder
          - heading "Pearl Earrings" [level=3] [ref=e953]
          - button "Ask About This" [ref=e954]:
            - generic [ref=e955]: Ask About This
            - img [ref=e956]
        - generic [ref=e959] [cursor=pointer]:
          - generic [ref=e960]:
            - generic [ref=e961]: Recently featured
            - button [ref=e962]:
              - img [ref=e963]
          - generic [ref=e966]: Image placeholder
          - heading "Gold Chain 18\"" [level=3] [ref=e967]
          - button "Ask About This" [ref=e968]:
            - generic [ref=e969]: Ask About This
            - img [ref=e970]
        - generic [ref=e973] [cursor=pointer]:
          - generic [ref=e974]:
            - generic [ref=e975]: Ask for availability
            - button [ref=e976]:
              - img [ref=e977]
          - generic [ref=e980]: Image placeholder
          - heading "Engagement Ring" [level=3] [ref=e981]
          - button "Ask About This" [ref=e982]:
            - generic [ref=e983]: Ask About This
            - img [ref=e984]
    - generic [ref=e987]:
      - generic [ref=e988]:
        - text: Before / After
        - heading "Restored, resized, repaired, remembered." [level=2] [ref=e989]
      - generic [ref=e990]:
        - generic [ref=e993]:
          - generic [ref=e995]: After
          - generic [ref=e997]: Before
          - generic [ref=e999]: ↔
          - generic [ref=e1000]: Broken chain → repaired
        - generic [ref=e1003]:
          - generic [ref=e1005]: After
          - generic [ref=e1007]: Before
          - generic [ref=e1009]: ↔
          - generic [ref=e1010]: Ring resized → ready to wear
        - generic [ref=e1013]:
          - generic [ref=e1015]: After
          - generic [ref=e1017]: Before
          - generic [ref=e1019]: ↔
          - generic [ref=e1020]: Loose stone → secured
        - generic [ref=e1023]:
          - generic [ref=e1025]: After
          - generic [ref=e1027]: Before
          - generic [ref=e1029]: ↔
          - generic [ref=e1030]: Watch battery → replaced
        - generic [ref=e1033]:
          - generic [ref=e1035]: After
          - generic [ref=e1037]: Before
          - generic [ref=e1039]: ↔
          - generic [ref=e1040]: Tarnished piece → polished
        - generic [ref=e1043]:
          - generic [ref=e1045]: After
          - generic [ref=e1047]: Before
          - generic [ref=e1049]: ↔
          - generic [ref=e1050]: Clasp replaced → wearable again
      - button "Send us photos of your repair" [ref=e1052]:
        - img [ref=e1053]
        - text: Send us photos of your repair
    - generic [ref=e1057]:
      - generic [ref=e1058]:
        - text: Tools & Guides
        - heading "Little helpers, big decisions." [level=2] [ref=e1059]
      - generic [ref=e1060]:
        - generic [ref=e1062] [cursor=pointer]:
          - img [ref=e1064]
          - heading "Gift Finder" [level=3] [ref=e1068]
          - generic [ref=e1069]: Live
        - generic [ref=e1071] [cursor=pointer]:
          - img [ref=e1073]
          - heading "Ring Size Guide" [level=3] [ref=e1079]
          - generic [ref=e1080]: Live
        - generic [ref=e1082] [cursor=pointer]:
          - img [ref=e1084]
          - heading "Chain Length" [level=3] [ref=e1087]
          - generic [ref=e1088]: Live
        - generic [ref=e1090] [cursor=pointer]:
          - img [ref=e1092]
          - heading "Repair Status" [level=3] [ref=e1095]
          - generic [ref=e1096]: Preview
        - generic [ref=e1098] [cursor=pointer]:
          - img [ref=e1100]
          - heading "Care Guide" [level=3] [ref=e1102]
          - generic [ref=e1103]: Live
        - generic [ref=e1105]:
          - img [ref=e1107]
          - heading "Occasion Finder" [level=3] [ref=e1109]
          - generic [ref=e1110]: Soon
        - generic [ref=e1112]:
          - img [ref=e1114]
          - heading "Style Finder" [level=3] [ref=e1117]
          - generic [ref=e1118]: Soon
        - generic [ref=e1120]:
          - img [ref=e1122]
          - heading "Gold Care Reminder" [level=3] [ref=e1125]
          - generic [ref=e1126]: Soon
        - generic [ref=e1128]:
          - img [ref=e1130]
          - heading "Battery Reminder" [level=3] [ref=e1135]
          - generic [ref=e1136]: Soon
        - generic [ref=e1138]:
          - img [ref=e1140]
          - heading "Cleaning Reminder" [level=3] [ref=e1143]
          - generic [ref=e1144]: Soon
    - generic [ref=e1146]:
      - generic [ref=e1147]:
        - text: Trust
        - heading "Trusted in Laval." [level=2] [ref=e1148]
      - generic [ref=e1149]:
        - generic [ref=e1150]:
          - img [ref=e1151]
          - generic [ref=e1154]: Local Laval boutique
        - generic [ref=e1155]:
          - img [ref=e1156]
          - generic [ref=e1158]: Personalized service
        - generic [ref=e1159]:
          - img [ref=e1160]
          - generic [ref=e1162]: Repairs and custom work
        - generic [ref=e1163]:
          - img [ref=e1164]
          - generic [ref=e1166]: Instagram inquiries welcome
      - generic [ref=e1167]:
        - generic [ref=e1169]:
          - generic [ref=e1170]:
            - img [ref=e1171]
            - img [ref=e1173]
            - img [ref=e1175]
            - img [ref=e1177]
            - img [ref=e1179]
          - paragraph [ref=e1181]: "\"Ormania resized my grandmother's ring and it fits perfectly. The care they took was incredible.\""
          - text: Sarah M.
        - generic [ref=e1183]:
          - generic [ref=e1184]:
            - img [ref=e1185]
            - img [ref=e1187]
            - img [ref=e1189]
            - img [ref=e1191]
            - img [ref=e1193]
          - paragraph [ref=e1195]: "\"Found my engagement ring here after searching for months. The team made it feel special.\""
          - text: Alex T.
      - generic [ref=e1196]:
        - paragraph [ref=e1197]: Bijouterie Ormania is a family-owned boutique in the heart of Laval. For years, we've helped our customers mark life's important moments with jewelry that tells a story.
        - button "Contact Us" [ref=e1198]:
          - text: Contact Us
          - img [ref=e1199]
  - contentinfo [ref=e1201]:
    - generic [ref=e1202]:
      - navigation "Footer navigation" [ref=e1203]:
        - link "Collections" [ref=e1205]:
          - /url: /en/collections/
        - link "Instagram" [ref=e1208]:
          - /url: /en/instagram/
        - link "Engagement" [ref=e1211]:
          - /url: /en/engagement/
        - link "Tools" [ref=e1214]:
          - /url: /en/explore/
        - link "Custom" [ref=e1217]:
          - /url: /en/custom/
        - link "Repairs" [ref=e1220]:
          - /url: /en/repairs/
        - link "Visit" [ref=e1223]:
          - /url: /en/visit/
        - link "Pitch" [ref=e1226]:
          - /url: /en/pitch/
      - generic [ref=e1227]:
        - generic:
          - img
        - img "Ormania" [ref=e1228]
        - paragraph [ref=e1229]: Jewelry made to be remembered.
        - generic [ref=e1230]:
          - link "Instagram" [ref=e1231]:
            - /url: https://www.instagram.com/bijouterie_ormania
            - img [ref=e1232]
          - link "Phone" [ref=e1235]:
            - /url: tel:+14506292959
            - text: (450) 629-2959
      - generic [ref=e1236]:
        - generic [ref=e1237]: © 2026 Bijouterie Ormania. All rights reserved.
        - generic [ref=e1238]:
          - link "Privacy" [ref=e1239]:
            - /url: /en/privacy/
          - link "Terms" [ref=e1240]:
            - /url: /en/terms/
          - link "Staff" [ref=e1241]:
            - /url: /en/admin/
  - button "Open Next.js Dev Tools" [ref=e1247] [cursor=pointer]:
    - img [ref=e1248]
  - alert [ref=e1251]
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
> 21 |         await page.evaluate((y) => window.scrollTo(0, y), scrollY);
     |                    ^ Error: page.evaluate: Test timeout of 30000ms exceeded.
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
  71 |       expect(stuck.length).toBeLessThanOrEqual(2); // allow a couple of intentionally hidden elements
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