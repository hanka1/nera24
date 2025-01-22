const intro_info = {
    cz: `
        <div class="heading1">Termín konání: ${config.RACE_DATE}</div>
        <div class="heading1">Info k závodu:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Místo konání: Veslařská loděnice Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">odkaz na mapu</a><br></li>
            <li>Závod 24h / 12h / maraton - <a href="#" data-content="nav.proposition" data-i18n="nav.proposition" onclick="showContent('nav.proposition')" class="href1">odkaz na propozice</a></li>
            <li>Zaregistrujte se <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">na tomto formuláři</a></li>
            <li>Tady můžete sledovat <a href="#" data-content="nav.online" data-i18n="nav.online" onclick="showContent('nav.online')" class="href1">průběžné výsledky online</a></li>
        </ul>
        `
    ,
    en: `        
        <div class="heading1">Event date: ${config.RACE_DATE}</div>
        <div class="heading1">Race information:</div>
        <ul style="list-style-type: disc; padding-left: 20px;">
            <li>Location: Rowing Boathouse Neratovice - <a href="https://mapy.cz/s/kunomocona" target="_blank" class="href1">link to map</a></li>
            <li>Race 24h / 12h / marathon - <a href="#" data-content="nav.proposition" data-i18n="nav.proposition" onclick="showContent('nav.proposition')" class="href1">link to proposition</a></li>
            <li>Register <a href=${config.RACE_REGISTRATION_FORM} target="_blank" class="href1">using this form</a></li>
            <li>You can follow <a href="#" data-content="nav.online" data-i18n="nav.online" onclick="showContent('nav.online')" class="href1">live results online here</a></li>
        </ul>
        `
}