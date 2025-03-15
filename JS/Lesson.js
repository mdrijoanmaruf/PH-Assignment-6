const fetchLessonMenu = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((res) => res.json())
    .then((data) => {
        displayNav(data.data);
    })
}

const displayNav = (navItem) => {
    for(let i of navItem){
        let navContainer = document.getElementById('navContainer');
        let newNav = document.createElement('div');
        newNav.innerHTML = `
            <div >
                <button id="lesson-${i.level_no}" onclick="fetchLessonData(${i.level_no})" class="border-3 border-[rgb(66,42,213)] hover:border-[rgb(98,80,211)] text-[rgb(66,42,213)] hover:bg-[rgb(98,80,211)]  text-[14px] px-4 py-2 cursor-pointer rounded-md hover:text-white font-[600]  ">
                <i class="fa-solid fa-book"></i>
                <span>Lesson-${i.level_no}</span>
            </button>
        </div>
        `
        navContainer.append(newNav)
    }
}


const fetchLessonData = async (id) => {
    document.getElementById('nextLesson').style.display = 'none'
    document.getElementById('notSelected').style.display = 'none';
    document.getElementById('lessonContainer').style.display = 'none';
    document.getElementById('loading').style.display = 'flex';

    // Active button Color
    removeActiveClass();
    document.getElementById(`lesson-${id}`).classList.add('active');

    try {
        const response = await fetch(`https://openapi.programming-hero.com/api/level/${id}`);
        const data = await response.json();
        displayLessonData(data.data);
    } catch (error) {
        console.error('Error fetching lesson data:', error);
    }

    let lesson = document.getElementById(`lesson-${id}`);
};


const displayLessonData = (data) => {
    
    const lessonContainer = document.getElementById('lessonContainer');
    document.getElementById('notSelected').style.display = 'none';
    lessonContainer.innerHTML = '';
    if(data.length == 0){
        document.getElementById('loading').style.display = 'none';
        document.getElementById('nextLesson').style.display = 'block'
        document.getElementById('lessonContainer').style.display = 'none';
        return;
    }
    document.getElementById('lessonContainer').style.display = 'grid';
    document.getElementById('loading').style.display = 'none';

    
    for(let i of data){
        let newItem = document.createElement('div');
        newItem.classList.add(
            'bg-white', 
            'p-[55px]', 
            'rounded-lg', 
            'flex', 
            'flex-col', 
            'gap-3', 
            'items-center',
            'relative'
        );
        

        newItem.innerHTML = `
            <h1 class="text-[30px] font-[700]">${i.word}</h1>
            <p class="text-[18px] font-[500]">Meaning <span class="text-blue-600">|</span> Pronunciation</p>
            <h2 class="text-[26px] font-[600] opacity-80 mb-2 text-center">
            ${i.meaning ? `${i.meaning}` : `<span class="text-red-600">"অর্থ নাই"</span>`} <span class="text-blue-600">|</span> "${i.pronunciation}"</h2>
            <div class="flex justify-between w-full mt-4">
                <div id="word-${i.id}" onclick="showWordDetails(${i.id})" class="bg-blue-100 p-3 rounded-md cursor-pointer hover:bg-blue-200 absolute left-12 bottom-8">
                    <i class="fa-solid fa-circle-info text-[22px] "></i>
                </div>
                <div onclick="pronounceWord('${i.word}')"  class="bg-blue-100 p-3 rounded-md cursor-pointer hover:bg-blue-200 absolute right-12 bottom-8">
                    <i class="fa-solid fa-volume-high"></i>
                </div>
                
            </div>
        `
        console.log(i.word);
        
        lessonContainer.append(newItem)    
            
    }
}

const showWordDetails = (id) => {
    let btnId = `word-${id}`
    fetch(`https://openapi.programming-hero.com/api/word/${id}`)
    .then((res) => res.json())
    .then((data) => {
        displayWordModal(data.data , btnId);
    })
    
}


const displayWordModal = (data, id) => {
    console.log(data);
    
    document.getElementById('modalBox').showModal();
    let modalBoxContainer = document.getElementById('modalBoxContainer');

    let synonymsHTML = data.synonyms.map(i => 
        `<span class="px-3 py-1 bg-blue-200 rounded-md text-[18px] font-[500]">${i}</span>`
    ).join('');

    modalBoxContainer.innerHTML = `
        <div class="mb-6">
            <div class="px-4 py-6 border border-gray-300 rounded-lg flex flex-col gap-5">
                <h1 class="font-[600] text-[32px] opacity-90">
                    ${data.word} (<i class="fa-solid fa-microphone"></i> : ${data.pronunciation})
                </h1>

                <div>
                    <h2 class="text-[24px] font-[600]">Meaning :</h2>
                    <p class="bangla text-[22px] font-[500]">${data.meaning ? `${data.meaning}` : `<span class="text-red-600">অর্থ পাওয়া যায় নাই</span>`}</p>
                </div>

                <div>
                    <h2 class="text-[24px] font-[600]">Example :</h2>
                    <p class="text-[22px] font-[400]">${data.sentence}</p>
                </div>

                <div>
                    <h2 class="text-[24px] font-[600]">সমার্থক শব্দ গুলো :</h2>
                    <div class="flex gap-4 flex-wrap mt-2 w-[90%]">
                        ${synonymsHTML} 
                    </div>
                </div>
            </div>
        </div>
    `;
}


const removeActiveClass = () =>{
    let allActive = document.getElementsByClassName('active');
    for(let i of allActive){
        i.classList.remove('active')
    }
}


function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN'; 
    window.speechSynthesis.speak(utterance);
}

fetchLessonMenu()



