/* Finns 2 buggar pcj em hemsk fetch med async/await.
 
  1 söker man på en specifik sak så ser man inte "columnTitle" för hobbies.

  2 filtrerar man på en utbildning så får man upp pilar för vissa titlar "columnTitle"
    vilket gör det möjligt att sortera listan för den filtrerade utbildning.
    Om man därefter gör en sökning på t.ex drawing så får man upp en ny lista men pilarna
    för sortering är kvar. Försöker man nu sortera så kommer man få tillbaka föregående lista
    som var relaterat filtreringen på utbildning :(

  Finns kanske 100 buggar ¯\_(ツ)_/¯
*/

// async function for all possible fetching
const fetchData = async api => {
  const response = await fetch(api)
  const responseData = await response.json()
  return responseData
}

// existing html elements and global variables
let schools
let students
const main = document.querySelector('main')
const studentListContainer = document.querySelector('#student-list-container')
const studentListWrapper = document.querySelector('#student-list-wrapper')
const filterEducation = document.querySelectorAll('.filter-education option')
let filterOrSearch = false // change to filterOrSearch
let sortActivated = false

/*
  loop the student object and create elements for some info about each student beside
  their hobbies.
  
  hobbies are shown first after a specific education is filtered and click is applied
  to student name (studentFirstName) where user can see more info abut particular student
*/
function displayStudents(students, filterOrSearch) {
  console.log(filterOrSearch);
  students.forEach((student, i) => {
    const studentColumn = document.createElement('div')
    studentColumn.className = 'student-column'
    const studentEntry = document.createElement('span')
    studentEntry.textContent = i +1
    const studentFirstName = document.createElement('span')
    studentFirstName.textContent = student.firstName
    const studentLastName = document.createElement('span')
    studentLastName.textContent = student.lastName
    const studentAge = document.createElement('span')
    studentAge.textContent = student.age
    const studentEducation = document.createElement('span')
    studentEducation.textContent = student.programme
    studentColumn.append(studentEntry, studentFirstName, studentLastName, studentAge, studentEducation)

    // create element that displays student hobbies and add click to studentFirstName. Runs when filter is used
    if (filterOrSearch) {
      let sH = student.hobbies
      const studentHobbies = document.createElement('span')
      studentHobbies.textContent = `${sH[0]}${sH[2] !== undefined ? `, ${sH[1]}, ${sH[2]}` : `${sH[1] !== undefined ? `, ${sH[1]}` : ''}`}`
      studentAge.insertAdjacentElement('afterend', studentHobbies)


      // makes it possible for users to se a list of schools and how they suit a student
      studentFirstName.className = 'student-first-name_hover'
      studentFirstName.addEventListener('click', e => {
        e.stopPropagation()

        // identify and store matched schools
        const schoolPriorities = []
        function identifySchools() {
          const identifiedSchool = (school, schoolLostHobbies, noEducationMatch) => {
            schoolPriorities.push(
              {
                matchedSchool: school.name,
                matchedProgramme: noEducationMatch ? null : student.programme,
                matchedActivities: schoolLostHobbies ? [] : [...school.activities.filter(a => student.hobbies.includes(a))]
              }
            )
          }
  
          schools.forEach(school => {
            if (school.programmes.find(p => p === student.programme)) {
              typeof school.activities !== 'string' ? identifiedSchool(school) : identifiedSchool(school, 'school lost hobbies')
            } else if (!school.programmes.includes(student.programme)) {
              // alert(`nothing here for you to study, ${student.firstName}`)
              identifiedSchool(school, school.activities === 'No activities' ? 'school lost hobbies' : null, 'no education match')
            }
          });
        }
        identifySchools()

        // creates new division that displays each school and color them accordingly
        function displayIdentifiedSchools() {
          const studentSchoolMatchWrapper = document.createElement('div')
          studentSchoolMatchWrapper.id = 'student-school-match-wrapper'
          const currentStudentName = document.createElement('div')
          currentStudentName.id = 'current-student-name'
          currentStudentName.textContent = student.firstName
          setTimeout( _ => studentSchoolMatchWrapper.insertAdjacentElement('afterbegin', currentStudentName), 0);
          main.appendChild(studentSchoolMatchWrapper)
          
          const worstPriority = []
          schoolPriorities.forEach(priority => {
            const possibleSchoolName = document.createElement('p')
            possibleSchoolName.textContent = priority.matchedSchool
  
            if (priority.matchedProgramme === student.programme && student.hobbies.every(h => priority.matchedActivities.includes(h))) {
              possibleSchoolName.style.color = 'green'
              studentSchoolMatchWrapper.insertAdjacentElement('afterbegin', possibleSchoolName)
            } else if (priority.matchedProgramme !== student.programme) {
              worstPriority.push(possibleSchoolName)
            } else {
              possibleSchoolName.style.color = 'yellow'
              studentSchoolMatchWrapper.appendChild(possibleSchoolName)
            }
          })
          
          // add worse schools last :)
          worstPriority.forEach(wP => {
            wP.style.color = 'red'
            studentSchoolMatchWrapper.insertAdjacentElement('beforeend', wP)
          })
  
          // remove list that show school priotiry
          window.addEventListener('click', windowClick = event => {
            if (event.target !== studentSchoolMatchWrapper) {
              window.removeEventListener('click', windowClick)
              main.removeChild(studentSchoolMatchWrapper)
            }
          })
        }
        displayIdentifiedSchools()
      })
    }
    studentListWrapper.appendChild(studentColumn)
  })
}


fetchData('https://api.mocki.io/v2/01047e91/schools').then(responseSchools => schools = responseSchools)
fetchData('https://api.mocki.io/v2/01047e91/students').then(responseStudents => students = responseStudents)

setTimeout(() => displayStudents(students, filterOrSearch), 1000);



/*
  remove previously displayed student info from the student-list and show only
  student info that is matching a specific education
  
  info about all students can be listed back depending of the selected filter option
*/
function filterStudents(selectedFilterValue, whatToSort, invertSort, specificSearchMatch) {
  filterOrSearch = selectedFilterValue === 'all' ? false : true

  let studentsToDisplay = []
  if (selectedFilterValue) {
    const filteringStudents = _ => students.filter(student => student.programme === selectedFilterValue)
    studentsToDisplay = selectedFilterValue === 'all' ? students : filteringStudents()
  } else if (filterOrSearch) {
    studentsToDisplay = specificSearchMatch
  }

  if (sortActivated) {
    console.log(sortActivated);
    // sorting
    studentsToDisplay.sort((studentX, studentY) => {
      const sortNumericalValues = _ => invertSort ?  studentX[whatToSort] - studentY[whatToSort] : studentY[whatToSort] - studentX[whatToSort]
      const sortAlphabeticalValues = _ => invertSort ?  studentX[whatToSort] > studentY[whatToSort] : studentX[whatToSort] < studentY[whatToSort]
      return whatToSort === 'age' ? sortNumericalValues() : sortAlphabeticalValues()
    })
    console.log('sort done');
  }

  // remove child's that are only individual students, the elements with class .student-column
  while (studentListWrapper.hasChildNodes()) {
    if (studentListWrapper.childElementCount === 1) {
      setTimeout(() => {
      }, 0);
        displayStudents(studentsToDisplay, filterOrSearch)
      return
    }
    studentListWrapper.removeChild(studentListWrapper.lastChild)
  }
}



// user can select one education and get only students related to that education
filterEducation.forEach(filterVal => {
  filterVal.addEventListener('click',  _ => {
    
    // REMOVE
    const removeSortArrows = _ => {
      const columnTitles = document.querySelectorAll('.column-title')
      
      if (columnTitles[1].children.length === 0) {
        return
      }

      columnTitles.forEach((title, i) => {
        /*
          skip to remove child element for the "filter by" column title.
          also the students and hobbies column title dont have children so we do return else we get
          an typeError that their children is undefined.
          the hobbies title is also removed completely
        */
        if (columnTitles[0] === title ||
          columnTitles[columnTitles.length -1] === title ||
          columnTitles[columnTitles.length -2] === title) {
            columnTitles[4].remove() // försöker ta bort all gånger påståendet stämmer
            return
        }
        title.children[0].remove()
      })
    }

    // ADD
    const addSortArrows = filterVal => {
      const columnTitles = document.querySelectorAll('.column-title')

      // clean previously filtered students related to an education
      if (columnTitles[1].children.length > 0) {
        removeSortArrows()
      }

      // add new column title for student hobbies
      const columnTitle = document.createElement('span')
      columnTitle.className = 'column-title'
      columnTitle.textContent = 'hobbies'
      columnTitles[3].insertAdjacentElement('afterend', columnTitle)

      columnTitles.forEach(title => {
        /*
          skip sort arrows on first and last column title.
          the numbered column title represent total students in the list while
          the last column title is for filtering options

          note the colum title for hobbies is not in the columnTitles array at this point in loop and will never be,
          would need to run querySelectorAll('.column-title') again to see it
        */
        if (columnTitles[0] === title || columnTitles[columnTitles.length -1] === title) {
          return
        }

        const sortArrow = document.createElement('span')
        sortArrow.className = 'column-title_sort-arrows'
        title.appendChild(sortArrow)

        // add the ability to sort
        let invertSort = null
        sortArrow.addEventListener('click', e => {
          invertSort = !invertSort

          let sortTitle
          if (e.target.parentNode.textContent !== 'age') {
            sortTitle = e.target.parentNode.textContent !== 'surname' ? 'firstName' : 'lastName'
          } else sortTitle = e.target.parentNode.textContent // for select option "all"

          sortActivated = true
          filterStudents(filterVal, sortTitle, invertSort)
          sortActivated = false
        })
      })
    }
    filterVal.value !== 'all' ? addSortArrows(filterVal.value) : removeSortArrows()

    // removes and adds .student-columns
    // this function can also sort student info for respective column-title while under selected education
    filterStudents(filterVal.value)
  })
})



// user can search for students by name, surname, education and by their hobbies
function specifiedSearch() {
  const searchBtn = document.querySelector('#gooo')
  const searchField = document.querySelector('#search')
  
  searchBtn.addEventListener('click', _ => {
    const columnTitles = document.querySelectorAll('.column-title')
    const specificSearchMatch = []
    students.forEach(student => {
      for (const [key, value] of Object.entries(student)) {
        if (key !== 'hobbies') {
          value.toLocaleLowerCase() === searchField.value.toLocaleLowerCase() ? specificSearchMatch.push(student) : null
        } else {
          value.some(v => v === searchField.value) ? specificSearchMatch.push(student) : null
        }
      }
    })

    if (specificSearchMatch.length === 0) {
      alert('search value is either empty or not found')
      return
    } 
    
    filterStudents(null, null, null, specificSearchMatch)
  })
}
specifiedSearch()
