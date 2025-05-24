Link video – prezentare proiect: https://youtu.be/zTMGr9kD1_Y?si=wYr0gCOJsiWnI07N 
Link publicare: https://dancequiz.vercel.app/ 
Link GitHub: https://github.com/AndraSima/Dance 

1. Introducere
Proiectul Dance Style Quiz este o aplica?ie web interactiv? dezvoltat? în React, care ofer? utilizatorilor o recomandare personalizat? de stil de dans pe baza unui quiz. R?spunsurile colectate sunt trimise c?tre un model de limbaj AI (OpenAI ChatGPT), iar pe baza r?spunsului generat, aplica?ia caut? automat videoclipuri relevante pe YouTube folosind API-ul YouTube Data.
2. Descrierea problemei
Tot mai mul?i oameni î?i doresc s? înceap? s? danseze atunci când dansul este v?zut nu doar ca o form? de divertisment sau o form? de art?, ci ?i ca un mijloc eficient de relaxare, terapie ?i exprimare personal?. Totu?i, alegerea unui stil de dans potrivit este o provocare frecvent? dac? nu ai un ghid personalizat sau o descriere clar? a op?iunilor disponibile.
De?i mul?i utilizatori se confrunt? cu întreb?ri precum: „Mi s-ar potrivi mai bine un stil dinamic, precum hip-hop-ul, sau unul elegant, precum tango-ul?”, nu au un cadru accesibil în care s? ob?in? o recomandare pe baza personalit??ii, nivelului lor de energie sau preferin?elor lor muzicale. Aceast? alegere poate fi descurajant? sau aleatorie în lipsa unei îndrum?ri interactive.

Aplica?ia propus? vine în întâmpinarea acestei nevoi printr-o solu?ie inteligent? ?i accesibil?: un quiz interactiv care, prin analiza AI a r?spunsurilor oferite, identific? stilul de dans care se potrive?te cel mai bine fiec?rui utilizator. În plus, aplica?ia faciliteaz? înv??area ?i explorarea stilului sugerat prin furnizarea resurselor video relevante, care sunt automat extrase de pe YouTube. Prin urmare, problema este abordat? nu numai prin furnizarea unui r?spuns individualizat, ci ?i prin furnizarea de instruc?iuni precise pentru urm?torii pa?i, ceea ce face ca tranzi?ia de la interes la ac?iune s? fie cât mai natural posibil.
3. Descriere API 
a) OpenAI API (GPT-3.5 Turbo):
- Endpoint: https://api.openai.com/v1/chat/completions 
- Metod?: POST
- Autentificare: Bearer Token
- Exemplu de utilizare:
b) YouTube Data API v3:
- Endpoint: https://www.googleapis.com/youtube/v3/search 
- Metod?: GET
- Autentificare: API Key
- Exemplu de utilizare:

4. Flux de date
Procesul de interac?iune cu Dance Style Quiz este structurat, u?or de în?eles ?i fluent, cu un flux de date clar definit între componentele aplica?iei ?i serviciile cloud utilizate (OpenAI ?i YouTube). Mai jos este o descriere detaliat? a modului în care datele sunt transferate prin aplica?ie:
> Completarea quiz-ului (Quiz.js)
La deschiderea aplica?iei, utilizatorul este întâmpinat de o interfa?? prietenoas?, unde poate începe un quiz compus dintr-o serie de întreb?ri referitoare la stilul s?u de via??, preferin?ele muzicale, nivelul de energie ?i obiceiurile sale legate de activitate fizic?. Aceste întreb?ri sunt definite într-un array de obiecte în fi?ierul Quiz.js, fiecare având op?iuni multiple de r?spuns. Pe m?sur? ce utilizatorul r?spunde, selec?iile sale sunt salvate într-un array local numit answers, prin func?ia setAnswers(newAnswers).
> Trimiterea datelor c?tre OpenAI
Odat? ce toate întreb?rile au fost completate, array-ul de r?spunsuri (answers) este concatenat într-un string care este folosit drept prompt pentru un apel c?tre API-ul OpenAI (modelul gpt-3.5-turbo). Acest prompt este trimis într-o cerere POST, cu un mesaj formulat astfel încât s? solicite modelului identificarea unui singur stil de dans potrivit utilizatorului, în func?ie de totalitatea r?spunsurilor. Apelul este realizat prin intermediul bibliotecii Axios, cu autentificare pe baz? de token stocat în variabila de mediu REACT_APP_OPENAI_KEY.

> Primirea r?spunsului de la OpenAI ?i stocarea rezultatului
R?spunsul primit de la OpenAI este un text simplu (ex: „Salsa”), care este extras din obiectul response.data.choices[0].message.content ?i trimis mai departe c?tre componenta principal? a aplica?iei prin func?ia onResult(style). Aceasta seteaz? starea result din componenta App.js cu stilul de dans recomandat.
> C?utarea de videoclipuri YouTube (Result.js)
Odat? identificat stilul de dans, aplica?ia trece automat la componenta Result.js, unde stilul returnat este utilizat pentru a construi o interogare (query) c?tre API-ul YouTube Data v3. Se genereaz? o c?utare automat? de tipul "dance tutorial" (ex: "salsa dance tutorial"), iar rezultatele sunt ob?inute printr-un apel GET cu Axios. R?spunsul con?ine o list? de videoclipuri (obiecte items), din care se extrag titlurile ?i ID-urile pentru a fi afi?ate într-un player embedded YouTube.

> Afi?area rezultatelor ?i posibilitatea de a relua testul
Utilizatorului i se afi?eaz? titlul stilului de dans recomandat ?i o serie de videoclipuri relevante, toate în cadrul unei interfe?e atractive ?i responsive: setVideos(res.data.items). La finalul paginii, exist? un buton „Reia testul”, care reseteaz? starea aplica?iei (setResult(null)) ?i permite reluarea procesului de la început, în caz c? utilizatorul dore?te s? ob?in? un rezultat diferit sau s? reconsidere r?spunsurile.
> Autentificare ?i autorizare servicii utilizate:
- OpenAI: Bearer Token în header-ul Authorization
- YouTube Data API: API Key în query string
- Datele de autentificare sunt ascunse în fi?ierul `.env` ?i accesate prin `process.env.REACT_APP_...`
Acest flux de date asigur? o experien?? fluid?, bazat? pe procesarea inteligent? a informa?iilor ?i livrarea de con?inut personalizat, integrând perfect capabilit??ile a dou? servicii cloud majore: OpenAI (pentru analiz? ?i decizie logic?) ?i YouTube (pentru furnizarea de con?inut multimedia adaptat contextului).
5. Capturi ecran aplica?ie


6. Referin?e
https://react.dev/learn 
https://nextjs.org/docs 
https://platform.openai.com/docs/concepts 
https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/ 
https://vercel.com/ 

