const proposition_info = {
    cz: `
        <div class="heading1">PŘEDBĚŽNÉ PROPOZICE ZÁVODU</div>

        <div class="heading2">O závodu:</div>
        <p>Jedná se o jedinečný závod v ČR na 24h, který se jede na Labi v Neratovicích.
        Závodu se mohou zúčastnit jak jednotlivci, dvojice, trojice, tak i týmy, ať už začátečníků nebo v rámci teambuildingu.</p>
    
        <div class="heading2">Základní informace:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Termín konání: 21.9-22.9.2025</li>
            <li>Místo konání: Veslařská loděnice Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">odkaz na mapu</a></li>
            <li>Registrace: <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">registrační formulář</a></li>
            <li>Pokyny pro zaplacení obdržíte emailem po registraci</li>
            <li>Závodníci registrovaní a zaplacení do 31.7.2025 získají startovní číslo se jménem</li>
            </ul>

    
        <div class="heading2">Zázemí a vybavení:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Zajištěné vnitřní prostory pro spánek a uložení věcí</li>
            <li>Kompletní občerstvení po celou dobu závodu (teplé jídlo, káva, čaj, voda, ovoce)</li>
            <li>Povinná výbava: leash a bílé světlo na boardu po setmění</li>
            <li>ZAKÁZANÉ draftování - KAŽDÝ SÁM ZA SEBE!</li>
        </ul>

        <br><div class="heading1">Kategorie Nera 24:</div>
        <p>Závod na 24h je ve 4 kategoriích. Každá posádka (sólo, dvojice, trojice, tým).
        Kategorie "tým" je pro firmy nebo týmy kteří chtějí být ve větší partě.</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Tým může mít 1 až 5 členů</li>
            <li>Předávání "štafet" pro týmy u mola v prostoru cíle</li>
            <li>Není podmínkou, aby byl vždy někdo na vodě</li>
            <li>Trať za světla: cca 13 km okruh</li>
            <li>Trať po setmění: cca 5 km okruh</li>
            <li>Bonus 5000,- za překonání mety 200km</li>
            <li>Start: 20.9.2025  10:00 </li>
            <li>Konec: 21.9.2025  10:00 </li>
        </ul>

        <div class="heading4">Startovné 24h zaplacené do 31.7.2025 <span style="color: rgb(13, 119, 189);">(po 31.7.2025)</span></div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Sólo: 2 000 Kč <span style="color: rgb(13, 119, 189);">(2 800 Kč)</span></li>
            <li>Týmy (každý člen): 1 800 Kč <span style="color: rgb(13, 119, 189);">(2 600 Kč)</span></li>
        </ul>

        <br><div class="heading1">Kategorie 12h:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Pouze pro sólo a dvojice !</li>
            <li>Start: 20.9.2025  10:00 </li>
            <li>Konec: 20.9.2025  22:00 </li>
        </ul>
        <div class="heading4">Startovné 12h zaplacené do 31.7.2025 <span style="color: rgb(13, 119, 189);">(po 31.7.2025)</span></div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Sólo: 1 600 Kč <span style="color: rgb(13, 119, 189);">(2 200 Kč)</span></li>
            <li>Týmy (každý člen): 1 400 Kč <span style="color: rgb(13, 119, 189);">(2 400 Kč)</span></li>
        </ul>

        <br><div class="heading1">Kategorie Maraton 43,2 km:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Pouze sólo !</li>
            <li>Start: 20.9.2025  10:00 </li>
            <li>Konec: definováno délkou trati (3 * 12,8 km + 4,8 km)</li>
            <li>Startovné do 31.7.2025: 1 600 Kč <span style="color: rgb(13, 119, 189);">(po 31.7.2025: 2 200 Kč)</span></li>
        </ul>
        `,
    en: `
        <div class="heading1">PRELIMINARY RACE PROPOSITION</div>
        <div class="heading2">About the race:</div>
        <p>This is a unique 24-hour race in the Czech Republic, taking place on the Elbe River in Neratovice.
        The race is open to individuals, pairs, trios, and teams, whether beginners or as part of team building.</p>
    
        <div class="heading2">Basic information:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Date: September 21-22, 2025</li>
            <li>Location: Rowing Boathouse Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">link to map</a></li>
            <li>Registration: <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">registration form</a></li>
            <li>Payment instructions will be sent by email after registration</li>
            <li>Participants registered and paid by July 31, 2025, will receive a race number with their name</li>
        </ul>
    
        <div class="heading2">Facilities and equipment:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Indoor space provided for sleeping and storage</li>
            <li>Full refreshments throughout the race (hot meals, coffee, tea, water, fruit)</li>
            <li>Mandatory equipment: leash and white light on board after dark</li>
            <li>Drafting is PROHIBITED - EVERYONE ON THEIR OWN!</li>
        </ul>

        <br><div class="heading1">Nera 24 Category:</div>
        <p>The 24-hour race has 4 categories. Each crew (solo, pair, trio, team).
        The "team" category is for companies or groups who want to participate in a larger group.</p>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Teams can have 1 to 5 members</li>
            <li>Team relay handovers at the pier in the finish area</li>
            <li>Not mandatory to have someone on the water at all times</li>
            <li>Daylight course: approximately 13 km circuit</li>
            <li>Night course: approximately 5 km circuit</li>
            <li>5000 CZK bonus for surpassing 200km</li>
            <li>Start: September 20, 2025  10:00</li>
            <li>End: September 21, 2025  10:00</li>
        </ul>

        <div class="heading4">24h entry fee paid by July 31, 2025 <span style="color: rgb(13, 119, 189);">(after July 31, 2025)</span></div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Solo: 2,000 CZK <span style="color: rgb(13, 119, 189);">(2,800 CZK)</span></li>
            <li>Teams (per member): 1,800 CZK <span style="color: rgb(13, 119, 189);">(2,600 CZK)</span></li>
        </ul>

        <br><div class="heading1">12h Category:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Solo and pairs only!</li>
            <li>Start: September 20, 2025  10:00</li>
            <li>End: September 20, 2025  22:00</li>
        </ul>

        <div class="heading4">12h entry fee paid by July 31, 2025 <span style="color: rgb(13, 119, 189);">(after July 31, 2025)</span></div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Solo: 1,600 CZK <span style="color: rgb(13, 119, 189);">(2,200 CZK)</span></li>
            <li>Teams (per member): 1,400 CZK <span style="color: rgb(13, 119, 189);">(2,400 CZK)</span></li>
        </ul>

        <br><div class="heading1">Marathon Category 43.2 km:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Solo only!</li>
            <li>Start: September 20, 2025  10:00</li>
            <li>End: determined by course length (3 * 12.8 km + 4.8 km)</li>
            <li>Entry fee by July 31, 2025: 1,600 CZK <span style="color: rgb(13, 119, 189);">(after July 31, 2025: 2,200 CZK)</span></li>
        </ul>
        `
}