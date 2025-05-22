totalFilteredItems forklaret i detaljer
Dette kodestykke tæller, hvor mange produkter der matcher brugerens søgning og filtreringsvalg. Lad os gennemgå det trin for trin:

javascript:
const totalFilteredItems = allProducts.filter((product) => {
let matchesCategory = true;
let matchesSearch = true;

    if (selectedCategory) {
      matchesCategory = product.category === selectedCategory;
    }

    if (searchTerm.trim()) {
      matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    }

    return matchesCategory && matchesSearch;

}).length;

1. Vi starter med alle produkter:
   allProducts er et array med alle produkter hentet fra API'et.

2. Vi bruger .filter() til at gennemgå hvert produkt:
   Filter-funktionen gennemgår hvert enkelt produkt og bestemmer, om det skal være med i det endelige resultat.

3. For hvert produkt opretter vi to "flag":

javascript:
let matchesCategory = true;
let matchesSearch = true;

Disse starter som true, hvilket betyder "indtil videre matcher produktet vores kriterier".

4. Tjek om produktet matcher den valgte kategori:
   javascript:

if (selectedCategory) {
matchesCategory = product.category === selectedCategory;
}

Dette betyder:

Hvis brugeren har valgt en kategori (selectedCategory er ikke tom)
Så sammenligner vi denne kategori med produktets kategori
Hvis de er ens, forbliver matchesCategory true, ellers bliver den false
Hvis brugeren ikke har valgt en kategori, forbliver matchesCategory true (alle kategorier accepteres)

5. Tjek om produktet matcher søgeordet:

javascript:

if (searchTerm.trim()) {
matchesSearch = product.title
.toLowerCase()
.includes(searchTerm.toLowerCase());
}

Dette betyder:

Hvis brugeren har indtastet et søgeord (searchTerm.trim() er ikke tom)
Så konverterer vi både produktets titel og søgeordet til små bogstaver (for at gøre søgningen ikke-case-sensitiv)
Derefter tjekker vi, om produktets titel indeholder søgeordet
Hvis titlen indeholder søgeordet, forbliver matchesSearch true, ellers bliver den false
Hvis brugeren ikke har indtastet et søgeord, forbliver matchesSearch true (alle titler accepteres)

6. Afgør om produktet skal inkluderes:

javascript:

return matchesCategory && matchesSearch;
Dette betyder:

Produktet skal inkluderes KUN hvis det matcher BÅDE kategori OG søgeord
Hvis et af flagene er false, returneres false, og produktet bliver ikke inkluderet

7. Til sidst tæller vi resultaterne:

javascript:
.length;

Dette giver os det totale antal produkter, der matcher alle kriterier.

Praktisk eksempel:
Lad os sige, du har følgende produkter:

iPhone (kategori: smartphones)
Samsung TV (kategori: electronics)
Samsung Galaxy (kategori: smartphones)

Hvis brugeren:

Vælger kategori "smartphones"
Søger efter "samsung"

Så vil:

iPhone: matchesCategory = true, matchesSearch = false → inkluderes IKKE
Samsung TV: matchesCategory = false, matchesSearch = true → inkluderes IKKE
Samsung Galaxy: matchesCategory = true, matchesSearch = true → INKLUDERES

totalFilteredItems ville i dette tilfælde være 1, da kun ét produkt matcher begge kriterier.
Dette tal bruges derefter til at beregne det korrekte antal sider til pagination-komponentet.
