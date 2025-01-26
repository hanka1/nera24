const intro_info = {
    cz: `
        <div class="container-left-photo">
            <div class="image-container-left">
                <img src="./public/img/Mara.jpg" alt="Závod" class="rounded-image">
            </div>
            <div>
                <div class="heading3">Termín konání: ${config.RACE_DATE}</div>
                <div class="heading3"><br> Info k závodu:</div>
                <ul>
                    <li>Místo konání: Veslařská loděnice Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">mapa</a></li>
                    <li>Závod 24h / 12h / maraton - <a href="#" data-content="nav.proposition" data-i18n="nav.proposition" onclick="showContent('nav.proposition')" class="href1">propozice</a></li>
                    <li>Zaregistrujte se - <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">formulář</a></li>
                    <br>
                    <li>Tady můžete sledovat <a href="#" data-content="nav.online" data-i18n="nav.online" onclick="showContent('nav.online')" class="href1">průběžné výsledky online</a></li>
                </ul>
            </div>
        </div>
    `,
    en: `        
        <div class="container-left-photo">
            <div class="image-container-left">
                <img src="./public/img/Mara.jpg" alt="Race" class="rounded-image">
            </div>
            <div>
                <div class="heading3">Event date: ${config.RACE_DATE}<br></div>
                <div class="heading3">Race information:</div>
                <ul>
                    <li>Location: Rowing Boathouse Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">map</a></li>
                    <li>Race 24h / 12h / marathon - <a href="#" data-content="nav.proposition" data-i18n="nav.proposition" onclick="showContent('nav.proposition')" class="href1">proposition</a></li>
                    <li>Register - <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">form</a></li>
                    <br>
                    <li>You can follow <a href="#" data-content="nav.online" data-i18n="nav.online" onclick="showContent('nav.online')" class="href1">live results online here</a></li>
                </ul>
            </div>
        </div>
    `
}