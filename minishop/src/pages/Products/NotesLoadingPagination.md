Loading og setLoading forklaret for begyndere:
loading og setLoading er som en lampe med tænd/sluk-knap på din webside:

loading er en variabel, der kan være enten "tændt" (true) eller "slukket" (false)
Når loading er "tændt" (true), viser siden "Indlæser produkter..." til brugeren
Når loading er "slukket" (false), viser siden selve produkterne

setLoading er knappen, der skifter mellem tændt og slukket:

Når siden starter med at hente produkter: setLoading(true) - tænder lampen
Når produkterne er hentet færdigt: setLoading(false) - slukker lampen

Det fungerer som en ventebesked til brugeren: "Vent lige et øjeblik, jeg arbejder på det!"

Paginering forklaret for begyndere, trin for trin
Paginering er ligesom siderne i en bog - du viser kun én side ad gangen. Her er hvordan det virker:

Hvor mange produkter per side?
PRODUCTS_PER_PAGE = 8 betyder, at der vises 8 produkter på hver side.

Hvilken side er brugeren på?
page holder styr på det aktuelle sidenummer (starter med side 1).
Beregning af hvilke produkter der skal vises:

javascript:
const startIndex = (page - 1) \* PRODUCTS_PER_PAGE;
const endIndex = startIndex + PRODUCTS_PER_PAGE;

Hvis du er på side 1:

startIndex = (1-1) \* 8 = 0
endIndex = 0 + 8 = 8
Du viser produkterne fra nummer 0 til 7

Hvis du er på side 2:

startIndex = (2-1) \* 8 = 8
endIndex = 8 + 8 = 16
Du viser produkterne fra nummer 8 til 15

Find ud af hvor mange sider der skal være i alt:
javascript:
const totalFilteredItems = /_ antal filtrerede produkter _/;
const totalPages = Math.max(1, Math.ceil(totalFilteredItems / PRODUCTS_PER_PAGE));

Hvis du har 20 produkter:

totalPages = 20 ÷ 8 = 2,5 → rundes op til 3 sider

Vis de rigtige produkter for den valgte side:
javascript:
setDisplayedProducts(filtered.slice(startIndex, endIndex));

Dette viser kun de produkter, der hører til den aktuelle side.

Når brugeren klikker på sideknapperne:
Pagination-komponenten har knapper, og når brugeren klikker på dem, ændres page til det nye sidenummer, og alt opdateres automatisk.

Når filtre ændres:
javascript:
setPage(1);

Dette sender brugeren tilbage til side 1, så de altid starter fra begyndelsen efter en ændring.

Tænk på det som en bog, hvor du kun viser én side ad gangen, og sidenummerknapperne hjælper brugeren med at bladre frem og tilbage mellem siderne.
