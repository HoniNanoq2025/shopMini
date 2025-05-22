uniqueCats og kategori-ekstraktion forklaret i detaljer:

javascript:

const uniqueCats = [
...new Set(data.products.map((product) => product.category)),
];
setCategories(uniqueCats);

Denne kode udvinder alle de unikke kategorier fra produktlisten. Lad os bryde det ned trin for trin:

1. Extracting all categories from products with map:

javascript:
data.products.map((product) => product.category)

data.products er vores array af produkter hentet fra API'et

.map() metoden gennemgår hvert produkt i arrayet
For hvert produkt tager vi kun product.category værdien

Resultatet er et nyt array med alle kategorier (hvor nogle kan være gentaget)

Eksempel:
Hvis vi havde disse produkter:
[
{ id: 1, title: "iPhone", category: "smartphones" },
{ id: 2, title: "Samsung Galaxy", category: "smartphones" },
{ id: 3, title: "MacBook", category: "laptops" },
{ id: 4, title: "Dell XPS", category: "laptops" },
{ id: 5, title: "Logitech Mouse", category: "peripherals" }
]

Efter .map() ville vi have:
["smartphones", "smartphones", "laptops", "laptops", "peripherals"]

2. Removing duplicates with Set:

javascript:
new Set(data.products.map((product) => product.category))

Set er en JavaScript datastruktur, der kun indeholder unikke værdier
Når vi laver new Set() af vores kategori-array, fjernes alle dubletter automatisk
Set objektet indeholder nu kun én forekomst af hver kategori

Efter new Set() ville vi have et Set objekt, der indeholder:
Set(3) {"smartphones", "laptops", "peripherals"}

3. Converting back to an array with spread operator:
   javascript:
   [...new Set(data.products.map((product) => product.category))]

Set objektet er nyttigt til at fjerne dubletter, men vi vil gerne have et almindeligt array tilbage
... er spread operatoren, der konverterer Set objektet tilbage til et array
Dette giver os et nyt array med kun unikke kategorier

Efter spread operatoren ville vi have:
["smartphones", "laptops", "peripherals"]

4. Setting state with the unique categories:

javascript:
setCategories(uniqueCats);

setCategories er en state-opdateringsfunktion fra React's useState hook
Den opdaterer categories state-variablen med vores nye array af unikke kategorier
Disse kategorier bruges senere til at populere filter-dropdownen i FilterPanel komponenten

Hvorfor er dette vigtigt?

Effektivitet: Vi vil kun vise hver kategori én gang i filterpanelet, ikke have dubletter
Brugervenlighed: Brugeren skal kunne vælge mellem klare, unikke muligheder
Automatisering: Vi behøver ikke at hardkode kategorierne; de udtrækkes dynamisk fra produkterne

Praktisk anvendelse:
Når brugeren åbner siden:

Produkter hentes fra API'et
Koden udtrækker alle unikke kategorier
Filterpanelet viser disse kategorier som valgmuligheder
Brugeren kan nu filtrere produkter baseret på disse kategorier

Det er en elegant løsning, der sikrer, at filterpanelet altid afspejler de faktiske kategorier i produktdatabasen, selv hvis kategorierne ændrer sig over tid.

uniqueCats kigger på alle produkter, finder alle kategorierne, fjerner gentagelser, og laver så en pæn liste med filtrerings-muligheder, som brugeren kan vælge imellem.
Så når du ser hjemmesiden, får du en dropdown-menu med hver kategori listet præcis én gang, selvom der er mange produkter i samme kategori.

Forklaring af ...new for helt almindelige danskere
Okay, lad os tage den her ...new Set() ting og gøre den forståelig:
javascriptconst uniqueCats = [
...new Set(data.products.map((product) => product.category)),
];
Forestil dig, at du er til buffet:
Del 1: new Set()
Tænk på new Set() som en speciel tallerken med magiske egenskaber. Hvis du lægger to stykker af samme slags mad på den, forsvinder det ene automatisk! Den specielle tallerken tillader kun ét stykke af hver slags mad.

Hvis du lægger to frikadeller på - puf! - nu er der kun én frikadelle.
Hvis du lægger tre kartofler på - puf! puf! - nu er der kun én kartoffel.

Del 2: ... (tre prikker)
Nu kommer den sjove del. De tre prikker ... er som at hælde maden fra din specielle tallerken over på en almindelig tallerken.

Din specielle tallerken holder maden adskilt på en bestemt måde
Men du vil have maden på en almindelig tallerken, som du er vant til
De tre prikker betyder "hæld indholdet ud"

Sammen: [...new Set()]
De firkantede parenteser [ ] er din almindelige tallerken.
Så hele udtrykket:
[...new Set(alle-kategorier)]
På jævnt dansk betyder det:

Tag alle produktkategorierne (selv gentagelser)
Læg dem på den magiske tallerken, der fjerner dubletter
Hæld dem tilbage på en almindelig tallerken

Eller endnu enklere:
"Tag alle kategorier, fjern alle dubletter, og giv mig listen."
Det er ligesom at sortere vasketøj:

Du har en bunke med tøj (alle kategorier)
Du sorterer det i bunker (sokker, t-shirts, bukser)
Men du laver kun én bunke for hver type (ingen "sokke-bunke #1" og "sokke-bunke #2")
Til sidst har du en pæn række bunker uden dubletter

Det er præcis hvad [...new Set()] gør - det er en smart måde at sige "giv mig kun én af hver slags".
