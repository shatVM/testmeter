//Перевірка підключеного файлу скриптів
//console.log('Підключено файл скриптів market.js')

//Визначення масиву об'єктів
let itemsArrayFromFile = []

// Створюємо новий об'єкт XMLHttpRequest
var xhr = new XMLHttpRequest();

// Встановлюємо URL запиту
xhr.open('GET', 'db.json', true);

// Встановлюємо обробник події завершення запиту
xhr.onload = function () {
  // Перевіряємо статус запиту
  if (xhr.status >= 200 && xhr.status < 300) {
    // Парсимо JSON у масив об'єктів
    itemsArrayFromFile = JSON.parse(xhr.responseText);
  } else {
    console.error('Помилка завантаження файлу:', xhr.statusText);
  }
};

// Встановлюємо обробник помилки
xhr.onerror = function () {
  console.error('Помилка завантаження файлу:', xhr.statusText);
};

// Відправляємо запит
xhr.send();

// Отримання елементу з ідентифікатором items 
let itemsDiv = document.getElementById("items");

function showItems(filterParam) {
    //Перевірка існування знайденого блоку
    if (itemsDiv) {
        itemsDiv.innerText = ""
        //Створення блоків по кількості елементів масиву
        itemsArrayFromFile
            .filter(item => !filterParam || item.Group === filterParam)
            //.sort((a, b) => a.Group.localeCompare(b.Group))
            //Сортування за прізвищем
            .sort((a, b) => a.LastName.localeCompare(b.LastName))        
            //
            .forEach((item, index) => {
                //Виводимо на веб сторінку елемент масиву в блок з класом item
                itemsDiv.innerHTML +=
                    `
                <!-- Блок   -->
                <div class="item">    
                    <div class="item-title">${item.dir} </div>                    
                   
                    <div class="item-title">
                        І семестр: 
                        <input class="mark" value = "${item.contact.phone}" onchange="updateMark(this.value)"></input>
                    </div> 
                    <div class="item-title">ІІ семестр: <input class="mark" value = "${item.contact.name}}"></input></div> 
 
                </div>                
                `
            })

    } else {
        //Вивід повідомлення про не знайдений блок
        console.log('Блок товарів не знайдено')
    }
}
showItems(null)

let sortByGroupButton = document.querySelectorAll(".price")
//console.log(sortByGroupButton);
sortByGroupButton.forEach((item) => {
    item.addEventListener('click', () => {
        //console.log(item.innerText)
        if (item.innerText != "Всі") {
            showItems(item.innerText)
        }
        else {
            showItems(null)
        }
    })
})

