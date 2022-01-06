 Individuellt projekt

Status: Ogranskad
Din identitet är synlig under rättning.
Resultatet är dolt under rättning. Under tiden som rättningen pågår kommer inga ändringar och kommentarer från lärare att visas.

Sista tidpunkt för inlämning: 14 dec 2021 23:55, 8 dagar kvar

Individuell projektarbete - Skolansökningar

 

Din uppgift är att hantera elever som söker till eftergymnasiala utbildningar och matcha dem med rätt skolor. Ta fram en applikation som underlättar arbetet.

 

Data för skolor: https://api.mocki.io/v2/01047e91/schools
Data för elever: https://api.mocki.io/v2/01047e91/students

 

Kriterier för Godkänt

 

  1  Användaren ska ha möjlighet att se samtliga elever i en lista när sidan laddas.
  
  2  Användaren ska kunna filtrera eleverna i listan baserat på utbildning.
  
  3  Användaren ska också kunna sortera listan baserat på följande:

      - Ålder (lägst först)
      - Förnamn (alfabetisk ordning)
      - Efternamn (alfabetisk ordning)
  
  
  4  Användaren ska kunna välja en elev i listan, och se en lista över samtliga skolor som passar eleven.
     (En skola passar en elev om dess önskade utbildning finns samt att skolan har en aktivitet som matchar
     en av elevens hobbys).

 

Kriterier för VG

 

  1  All sortering på listan över elever ska kunna göras i stigande och fallande ordning.
  
  2  Användaren ska kunna söka efter elever via en fritext. Användare kan välja att söka på förnamn, efternamn, utbildning
     eller elever som har en specifik hobby. (OBS! Söker användare på för- eller efternamn måste hen skriva HELA namnet
     för att få en matchning. Man kan dock blanda versaler och gemener och få en matching t.ex.

      - “mArIA” => Alla som heter Maria visas
      - “Mari" => Endast elever som heter Mari matchas, ej Maria.
  
  
  3 När användare väljer en elev i listan, ska samtliga skolor visas. De ska vara färgsorterade efter hur
    väl de matchar elevens behov (dvs gröna skolor ska vara högst upp, sedan gula, sedan röda):

      - Grön: Utbildning samt aktiviteter för alla elevens hobbys finns. // superMatch - klar
      - Gul: Utbildning finns, men alla aktiviteter finns inte.          // goodMatch  - klar
      - Röd: Utbildning finns inte.                                      // badMatch   - klar


Senast inlämning 14 december


school matching priority

backend students
  cassandra: green, yellow 2, red 3
  maria: green, yellow 2, red 3
  fiona: green 1, yellow 1, red 3
  neshin: green, yellow 2, red 3


frontend students
  marcus: green, yellow 3, red 2
  winston: green, yellow 3, red 2
  anna: green 2, yellow 1, red 2
  orlando: green 1, yellow 2 and red 2


.net students
  hannah: green, yellow 2, red 3
  ash: green 1, yellow 1, red 3
  leona: green 1, yellow 1, red 3


const students = [
  {
      "firstName": "Marcus",
      "lastName": "Green",
      "age":"29",
      "hobbies":["football"],
      "programme":"Frontend"
  },
  {
      "firstName": "Cassandra",
      "lastName": "White",
      "age":"18",
      "hobbies":["chess", "gaming", "drawing"],
      "programme":"Backend"
  },
  {
      "firstName": "Hannah",
      "lastName": "Red",
      "age":"24",
      "hobbies":["basketball","gaming"],
      "programme":".NET"
  },
  {
      "firstName": "Winston",
      "lastName": "Black",
      "age":"21",
      "hobbies":["basketball", "football"],
      "programme":"Frontend"
  },
  {
      "firstName": "Maria",
      "lastName": "Scarlet",
      "age":"19",
      "hobbies":["drawing", "chess"],
      "programme":"Backend"
  },
  {
      "firstName": "Ash",
      "lastName": "Yellow",
      "age":"35",
      "hobbies":["gaming", "football"],
      "programme":".NET"
  },
  {
      "firstName": "Leona",
      "lastName": "Grey",
      "age":"42",
      "hobbies":["chess"],
      "programme":".NET"
  },
  {
      "firstName": "Fiona",
      "lastName": "Grey",
      "age":"29",
      "hobbies":["football"],
      "programme":"Backend"
  },
  {
      "firstName": "Anna",
      "lastName": "Forest",
      "age":"21",
      "hobbies":[ "drawing"],
      "programme":"Frontend"
  },
  {
      "firstName": "Neshin",
      "lastName": "Pink",
      "age":"20",
      "hobbies":[ "chess"],
      "programme":"Backend"
  },
  {
      "firstName": "Orlando",
      "lastName": "Beige",
      "age":"24",
      "hobbies":[ "basketball","drawing"],
      "programme":"Frontend"
  }
]



const schools = [
  {
      "name":"Fun School",
      "activities":["drawing","chess","football","basketball", "gaming"],
      "programmes":[]
  },
  {
      "name":"Data School",
      "activities":["drawing","chess", "gaming"],
      "programmes":[".NET","Frontend"]
  },
  {
      "name":"Makrosoft School",
      "activities":["football", "gaming"],
      "programmes":["Backend",".NET"]
  },
  {
      "name":"Boring School",
      "activities":"No activities",
      "programmes":["Frontend","Backend"]
  },
  {
      "name":"Frontend School",
      "activities":["drawing","basketball"],
      "programmes":["Frontend"]
  }
]

