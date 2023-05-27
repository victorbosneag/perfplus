# perfplus

### Backend-ul pentru aplicatia Apex Olympix

[Frontend-ul Apex Olympix](https://github.com/victorbosneag/perfplus-client)

API Routes:
- Contest:
    - `/create` creeaza un nou concurs
    - `/list` afiseaza toate concursurile (cu paginatie)
    - `/view` afiseaza toate concursurile (fara paginatie)
    - `/find` cauta (si gaseste) un concurs
    - `/delete` sterge concursul
- Contest Content:
    - `/config` configureaza documentele auxiliare pe care le poate aveau un document
    - `/upload` incarca documentul
    - `/get` afiseaza documentul
- Participant:
    - `/create` inregistreaza participanti noi (se pot inregistra mai multi intr-un singur request)
    - `/list` afiseaza toti participantii (cu paginatie)
- Post:
    - `/create` creeaza o postare noua (suporta markdown)
    - `/find` returneaza o postare in functie de id
    - `/list` afiseaza toate postarile
- Ranking:
    - `/create` acorda un loc participantilor
- User:
    - `/create` inregistreaza un nou utilizator
    - `/login` login
    - `/info` returneaza informatii despre user-ul logat

--------

Tehnologii folosite:
- Node.js
- Express
- Sequelize (ORM)
- SQLite (se pot folosi alte baze de date pentru performanta sporita datorita utilizarii unui ORM)

Biblioteci folosite:
- Cele mentionate mai sus la tehnologii
- dotenv
- jsonwebtoken
- body-parser
- n-readline
- node-base64-to-file

-------------
Instructiuni de instalare
```
npm install
node app.js
node loadhs.js licee3
node app.js
```
