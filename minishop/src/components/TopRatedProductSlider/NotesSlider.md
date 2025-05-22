Slider kommentarer:

Komponentstruktur: En React-komponent, der viser en karrusel med de 5 bedst bedømte produkter, hentet fra et eksternt API.
Tilstandshåndtering: Bruger React's useState til at holde styr på:

Listen af produkter
Indlæsningsstatus
Hvilket produktindeks der vises

Datahentning: Bruger useEffect til at hente produktdata fra 'dummyjson.com' API'et når komponenten indlæses første gang.
Sortering: Sorterer produkterne efter bedømmelse og viser kun de 5 bedste.
Navigation: Inkluderer funktioner til at skifte mellem produkter med:

Forrige/næste knapper
Navigationsprikker i bunden

Prisberegning: Beregner og viser rabatterede priser baseret på den originale pris og rabatprocent.
Responsiv UI: Viser en indlæsningsindikator under datahentning, og viser derefter produktdetaljer med billede, titel, beskrivelse, pris og kategori.
