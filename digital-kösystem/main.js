console.log('gooo');

/*
Inlämningsuppgift #2 - Digitalt kösystem (IG/G)

Din uppgift är att ansvara för ett kösystem för incheckning av bagage på Arlanda flygplats.
Skapa ett verktyg som hjälper dig visualisera och hålla reda på kön.

Kravställning

  1 När webbapplikationen laddas ska kön vara tom.
  2 Det ska finnas en lista med samtliga personer i kön samt vilken plats i kön personerna har.
  3 Du ska kunna skriva in en persons namn och med ett knapptryck placera personen sist i kön.
  4 Det ska även finnas en Fast Track-knapp, som placerar personen längst fram i kön (istället för sist).
  5 Det ska finnas en knapp på sidan för att checka in bagage. När du klickar på knappen tas första personen i listan bort.
    Om kön är tom, skriv ut meddelandet “There are currently no people standing in line” på sidan.

Inlämning senast 18/11

Inlämnings ska ske i form av en .zip-fil som innehåller all din kod, alternativt en länk till Github-repo.



Lycka till!

B
 */

// form elements
let customerName = document.querySelector('#customer-name')
let standardServiceBtn = document.querySelector('#standard')
let fastTrackServiceBtn = document.querySelector('#fast-track')

// queue status elements
let queueStatus = document.querySelector('#queue-status')
queueStatus.textContent = 'customer in the luggage queue: 0'
let checkInLuggageBtn = document.querySelector('#check-in')
let customersList = document.querySelector('#customers-list')

// position [0] in queueList array tracks fast-track customers
const queueList = [[]]


// add cusomers to the queue list
const addToQList = (e, n) => {
  e.target.id === 'standard' ? queueList.push(n.value) : queueList[0].push(n.value)
  return queueList
}

// add customers to DOM
const displayQStatus = queueList => {
  customersList.innerHTML = ''
  let fastTrackListLength = null
  
  queueList.map((item, i) => {
    if (Array.isArray(item) && item.length === 0) {
      queueStatus.textContent = 'There are currently no people standing in line'
      return
    } else if (Array.isArray(item) && item.length > 0) {
      fastTrackListLength = item.length
      
      item.forEach((fastTrack_item, j) => {
        let queueItem = document.createElement('li')
        queueItem.innerHTML = `<span>${j +1}</span> <span style="color: #24adf0">${fastTrack_item}</span>`
        customersList.appendChild(queueItem)
      })
      queueStatus.textContent = `customer in the luggage queue ${fastTrackListLength}`
    } else {
      queueStatus.textContent = `customer in the luggage queue ${i+fastTrackListLength}`
      let queueItem = document.createElement('li')
      queueItem.innerHTML = `<span>${i+fastTrackListLength}</span> <span>${item}</span>`
      customersList.appendChild(queueItem)
    }
  })
}


// Buttons for:
// standard service
standardServiceBtn.addEventListener('click', _ => {
  if (customerName.value === '') return
  displayQStatus(addToQList(event, customerName))
})

// priority service ignores the rulles of standard service
fastTrackServiceBtn.addEventListener('click', _ => {
  if (customerName.value === '') return
  displayQStatus(addToQList(event, customerName))
})

// remove customers from queueList array
checkInLuggageBtn.addEventListener('click', _ => {
  if (!customersList.hasChildNodes()){
    queueStatus.textContent = 'There are currently no people standing in line'
    console.log('no childnodes');
    return
  }

  queueList[0].length > 0 ?
    queueList[0].splice(0, 1) :
    queueList.splice(1, 1)

  displayQStatus(queueList)
})














// tst

// queueStatus.textContent = `customer in the luggage queue ${i}`



// const q = [['a', 'b', 'c'], 1, 2, 3]
// // console.log(q.reverse());
// console.dir(q);
// console.log(q[0].splice(0, 1));
// console.dir(q);



/*
    // array and function to track fast-track priority customers
    const fastTrack_queueList = []
    const fastTrackService = _=> {
      fastTrack_queueList.push(n.value)
      queueList.unshift(n.value)
    }
  */

