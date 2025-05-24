Link video – prezentare proiect: https://youtu.be/zTMGr9kD1_Y?si=wYr0gCOJsiWnI07N 
Link publicare: https://dancequiz.vercel.app/ 
Link GitHub: https://github.com/AndraSima/Dance 

1. Introducere
Proiectul Dance Style Quiz este o aplicatie web interactiva dezvoltata în React, care ofera utilizatorilor o recomandare personalizata de stil de dans pe baza unui quiz. Raspunsurile colectate sunt trimise catre un model de limbaj AI (OpenAI ChatGPT), iar pe baza raspunsului generat, aplicatia cauta automat videoclipuri relevante pe YouTube folosind API-ul YouTube Data.
2. Descrierea problemei
Tot mai multi oameni îsi doresc sa înceapa sa danseze atunci când dansul este vazut nu doar ca o forma de divertisment sau o forma de arta, ci si ca un mijloc eficient de relaxare, terapie si exprimare personala. Totusi, alegerea unui stil de dans potrivit este o provocare frecventa daca nu ai un ghid personalizat sau o descriere clara a optiunilor disponibile.
Desi multi utilizatori se confrunta cu întrebari precum: „Mi s-ar potrivi mai bine un stil dinamic, precum hip-hop-ul, sau unul elegant, precum tango-ul?”, nu au un cadru accesibil în care sa obtina o recomandare pe baza personalitatii, nivelului lor de energie sau preferintelor lor muzicale. Aceasta alegere poate fi descurajanta sau aleatorie în lipsa unei îndrumari interactive.

Aplicatia propusa vine în întâmpinarea acestei nevoi printr-o solutie inteligenta si accesibila: un quiz interactiv care, prin analiza AI a raspunsurilor oferite, identifica stilul de dans care se potriveste cel mai bine fiecarui utilizator. În plus, aplicatia faciliteaza învatarea si explorarea stilului sugerat prin furnizarea resurselor video relevante, care sunt automat extrase de pe YouTube. Prin urmare, problema este abordata nu numai prin furnizarea unui raspuns individualizat, ci si prin furnizarea de instructiuni precise pentru urmatorii pasi, ceea ce face ca tranzitia de la interes la actiune sa fie cât mai natural posibil.
3. Descriere API 
a) OpenAI API (GPT-3.5 Turbo):
- Endpoint: https://api.openai.com/v1/chat/completions 
- Metoda: POST
- Autentificare: Bearer Token
- Exemplu de utilizare:
- ![image](https://github.com/user-attachments/assets/8dd77b93-0255-471a-a599-5c81b07702ca)

b) YouTube Data API v3:
- Endpoint: https://www.googleapis.com/youtube/v3/search 
- Metoda: GET
- Autentificare: API Key
- Exemplu de utilizare:
- ![image](https://github.com/user-attachments/assets/d8dc915c-5a94-452e-a3af-15a19076f4df)


4. Flux de date
Procesul de interactiune cu Dance Style Quiz este structurat, usor de înteles si fluent, cu un flux de date clar definit între componentele aplicatiei si serviciile cloud utilizate (OpenAI si YouTube). Mai jos este o descriere detaliata a modului în care datele sunt transferate prin aplicatie:
> Completarea quiz-ului (Quiz.js)
La deschiderea aplicatiei, utilizatorul este întâmpinat de o interfata prietenoasa, unde poate începe un quiz compus dintr-o serie de întrebari referitoare la stilul sau de viata, preferintele muzicale, nivelul de energie si obiceiurile sale legate de activitate fizica. Aceste întrebari sunt definite într-un array de obiecte în fisierul Quiz.js, fiecare având optiuni multiple de raspuns. Pe masura ce utilizatorul raspunde, selectiile sale sunt salvate într-un array local numit answers, prin functia setAnswers(newAnswers).
> Trimiterea datelor catre OpenAI
Odata ce toate întrebarile au fost completate, array-ul de raspunsuri (answers) este concatenat într-un string care este folosit drept prompt pentru un apel catre API-ul OpenAI (modelul gpt-3.5-turbo). Acest prompt este trimis într-o cerere POST, cu un mesaj formulat astfel încât sa solicite modelului identificarea unui singur stil de dans potrivit utilizatorului, în functie de totalitatea raspunsurilor. Apelul este realizat prin intermediul bibliotecii Axios, cu autentificare pe baza de token stocat în variabila de mediu REACT_APP_OPENAI_KEY.
![image](https://github.com/user-attachments/assets/24f23839-174d-4d23-baba-738d799e6247)

> Primirea raspunsului de la OpenAI si stocarea rezultatului
Raspunsul primit de la OpenAI este un text simplu (ex: „Salsa”), care este extras din obiectul response.data.choices[0].message.content si trimis mai departe catre componenta principala a aplicatiei prin functia onResult(style). Aceasta seteaza starea result din componenta App.js cu stilul de dans recomandat.
> Cautarea de videoclipuri YouTube (Result.js)
Odata identificat stilul de dans, aplicatia trece automat la componenta Result.js, unde stilul returnat este utilizat pentru a construi o interogare (query) catre API-ul YouTube Data v3. Se genereaza o cautare automata de tipul "dance tutorial" (ex: "salsa dance tutorial"), iar rezultatele sunt obtinute printr-un apel GET cu Axios. Raspunsul contine o lista de videoclipuri (obiecte items), din care se extrag titlurile si ID-urile pentru a fi afisate într-un player embedded YouTube.
![image](https://github.com/user-attachments/assets/c9687b1c-219b-45c9-b45a-bf7fb4e3a45e)

> Afisarea rezultatelor si posibilitatea de a relua testul
Utilizatorului i se afiseaza titlul stilului de dans recomandat si o serie de videoclipuri relevante, toate în cadrul unei interfete atractive si responsive: setVideos(res.data.items). La finalul paginii, exista un buton „Reia testul”, care reseteaza starea aplicatiei (setResult(null)) si permite reluarea procesului de la început, în caz ca utilizatorul doreste sa obtina un rezultat diferit sau sa reconsidere raspunsurile.
> Autentificare si autorizare servicii utilizate:
- OpenAI: Bearer Token în header-ul Authorization
- YouTube Data API: API Key în query string
- Datele de autentificare sunt ascunse în fisierul `.env` si accesate prin `process.env.REACT_APP_...`
Acest flux de date asigura o experienta fluida, bazata pe procesarea inteligenta a informatiilor si livrarea de continut personalizat, integrând perfect capabilitatile a doua servicii cloud majore: OpenAI (pentru analiza si decizie logica) si YouTube (pentru furnizarea de continut multimedia adaptat contextului).
5. Capturi ecran aplicatie
![image](https://github.com/user-attachments/assets/3783ed7b-bcf6-41a8-a8ac-66e3a3186089)
![image](https://github.com/user-attachments/assets/2fa615e9-252a-434b-a082-2f66c726ed32)
![image](https://github.com/user-attachments/assets/fe7682e5-9d7f-455a-b45d-93ef09dfba9f)


6. Referinte
https://react.dev/learn 
https://nextjs.org/docs 
https://platform.openai.com/docs/concepts 
https://learning.postman.com/docs/getting-started/first-steps/sending-the-first-request/ 
https://vercel.com/ 

