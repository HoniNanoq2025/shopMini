useRef, useEffect og current.focus for begyndere

useRef - Din digitale pegepind
useRef er som en pegepind, du kan bruge til at pege på ting på din webside.

javascript:
const emailRef = useRef(null);

Dette er ligesom at sige: "Jeg har en pegepind, der hedder 'emailRef', og lige nu peger den på ingenting."

useEffect - Din automatiske handling
useEffect er som en robotassistent, der gør noget automatisk, når din webside er klar.

javascript:

useEffect(() => {
emailRef.current.focus();
}, []);

Her siger du til din robot: "Når siden er klar, så peg på email-feltet og klik i det, så brugeren kan begynde at skrive med det samme."
Det tomme [] betyder bare: "Gør kun dette én gang, når siden først åbnes."

current.focus() - Sæt markøren her!
current.focus() er ligesom at sige: "Markør, hop ind i dette felt!"

javascript:
emailRef.current.focus();

Her siger du: "Tag den ting, som min pegepind peger på (email-feltet), og placer tekstmarkøren dér, så brugeren straks kan begynde at skrive."

I hverdagssprog
Når din formular vises på skærmen, vil markøren automatisk stå og blinke i email-feltet, så brugeren ikke behøver at klikke på det først.
Og når nogen klikker på "Gå til email"-knappen, hopper markøren tilbage til email-feltet, lige meget hvor den var før.
Det er lidt ligesom at have en hjælpsom ven, der altid sørger for, at din kuglepen ligger præcis der, hvor du skal skrive næste gang!
