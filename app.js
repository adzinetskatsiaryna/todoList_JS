const tasks = [
  {
    _id: '5d2ca9e2e03d40b326596aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095c1288e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
  {
    _id: '5d2ca9e2e03d40b3232496aa7',
    completed: true,
    body:
      'Occaecat non ea quis occaecat ad culpa amet deserunt incididunt elit fugiat pariatur. Exercitation commodo culpa in veniam proident laboris in. Excepteur cupidatat eiusmod dolor consectetur exercitation nulla aliqua veniam fugiat irure mollit. Eu dolor dolor excepteur pariatur aute do do ut pariatur consequat reprehenderit deserunt.\r\n',
    title: 'Eu ea incididunt sunt consectetur fugiat non.',
  },
  {
    _id: '5d2ca9e29c8a94095564788e0',
    completed: false,
    body:
      'Aliquip cupidatat ex adipisicing veniam do tempor. Lorem nulla adipisicing et esse cupidatat qui deserunt in fugiat duis est qui. Est adipisicing ipsum qui cupidatat exercitation. Cupidatat aliqua deserunt id deserunt excepteur nostrud culpa eu voluptate excepteur. Cillum officia proident anim aliquip. Dolore veniam qui reprehenderit voluptate non id anim.\r\n',
    title:
      'Deserunt laborum id consectetur pariatur veniam occaecat occaecat tempor voluptate pariatur nulla reprehenderit ipsum.',
  },
];

(function(arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task)=>{
    acc[task._id] = task;
    return acc;
  },{}); // создаем объект в котором ключом является (_id task), а значением сам объект task. Для этого проходимся по массиву редьсом

  const themes = {
    default: {
      '--base-text-color': '#212529',
      '--header-bg': '#007bff',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#007bff',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#0069d9',
      '--default-btn-border-color': '#0069d9',
      '--danger-btn-bg': '#dc3545',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#bd2130',
      '--danger-btn-border-color': '#dc3545',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#80bdff',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
    },
    dark: {
      '--base-text-color': '#212529',
      '--header-bg': '#343a40',
      '--header-text-color': '#fff',
      '--default-btn-bg': '#58616b',
      '--default-btn-text-color': '#fff',
      '--default-btn-hover-bg': '#292d31',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#b52d3a',
      '--danger-btn-text-color': '#fff',
      '--danger-btn-hover-bg': '#88222c',
      '--danger-btn-border-color': '#88222c',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
    light: {
      '--base-text-color': '#212529',
      '--header-bg': '#fff',
      '--header-text-color': '#212529',
      '--default-btn-bg': '#fff',
      '--default-btn-text-color': '#212529',
      '--default-btn-hover-bg': '#e8e7e7',
      '--default-btn-border-color': '#343a40',
      '--default-btn-focus-box-shadow':
        '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
      '--danger-btn-bg': '#f1b5bb',
      '--danger-btn-text-color': '#212529',
      '--danger-btn-hover-bg': '#ef808a',
      '--danger-btn-border-color': '#e2818a',
      '--input-border-color': '#ced4da',
      '--input-bg-color': '#fff',
      '--input-text-color': '#495057',
      '--input-focus-bg-color': '#fff',
      '--input-focus-text-color': '#495057',
      '--input-focus-border-color': '#78818a',
      '--input-focus-box-shadow': '0 0 0 0.2rem rgba(141, 143, 146, 0.25)',
    },
  };

  let lastSelectedTheme = localStorage.getItem('app_theme') || 'default';
  console.log(objOfTasks)

// Elements UI получаем элементы со страницы

const listContainer = document.querySelector('.tasks-list-section .list-group');
const form = document.forms['addTask']; // форма
const inputTitle = form.elements['title']; //инпут заглавия таски
const inputBody = form.elements['body']; // инпут описания таски
const themeSelect = document.getElementById('themeSelect')


// Events
setTheme(lastSelectedTheme)
  renderAllTasks(objOfTasks); // передаем обект тасок в функцию которая отрендерит таски на странице

  form.addEventListener('submit', onFormSubmitHandler); // сабмит формы, добавление таски

  listContainer.addEventListener('click', onDeleteHandler); // удаление таски
  themeSelect.addEventListener('change', onThemeSelectHandler)

// Function

// при помощи метода Object.values вернем массив значений, пройдем по нему, создадим li, поместим li d fragment, а fragment в контейнер на страницу
  function renderAllTasks(taskList){
    if(!taskList){
      console.error('Передайте список задач')
      return
    }

    const fragment = document.createDocumentFragment();
    Object.values(taskList).forEach(task=>{
      const li = listItemTemplate(task); // вызываем функцию создания li (task) в дом дереве
      fragment.appendChild(li)
      
    })
    listContainer.appendChild(fragment);
   
  }; 


  // создаем li в разметке функция получает таску и деструктуризацией достаем _id, title, body
  function listItemTemplate ({_id, title, body}={}) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 
    'd-flex', 
    'align-items-center',
    'flex-wrap',
    'mt-2'); //добавляем li классов
    li.setAttribute('data-task-id', _id); // создаем дата атрибут для ли, со значением _id для идентификации при клике 

    const span = document.createElement('span');
    span.textContent = title;
    span.style.fontWeight = 'bold';

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete task';
    deleteBtn.classList.add('btn', 'btn-danger', 'ml-auto', 'delete-btn');

    const article = document.createElement('p');
    article.textContent = body;
    article.classList.add('mt-2', 'w-100')

    li.appendChild(span);
    li.appendChild(deleteBtn);
    li.appendChild(article)
    //console.log(li)
    return li
  }; 


  //
  function onFormSubmitHandler (e){
    e.preventDefault();
    const titleValue = inputTitle.value;
    const bodyValue = inputBody.value;
    //console.log(titleValue, bodyValue);
    if(!titleValue || !bodyValue){
      alert ('Пожалуйста введите title и body');
      return;
    }
    const task = createNewTask(titleValue, bodyValue); // вызываем функцию создания новой таски 
    const listItem = listItemTemplate(task); // сoздаем новый элемент li на странице
    listContainer.insertAdjacentElement('afterbegin', listItem); // помещаем новый li на странице
    form.reset(); // обнуляем инпуты
  };


  //создаем новую таску. Функция получает title, body, которые прочитали из инпутов формы, создает объект новой таски, 
  //помещает его в обект тасок и ретурнит 
  function createNewTask(title, body){

    const newTask = {
      title,
      body,
      completed: false,
      _id: `task-${Math.random()}`
    };

    objOfTasks[newTask._id] = newTask;

    return { ...newTask }
  };


  // удаление таски по id в объекте тасок
  function deleteTask (id){
    const {title} = objOfTasks[id];
    const  isConfirm = confirm(`Точно хотите удалить задачуЖ ${title}?`);
    if(!isConfirm) return isConfirm;
    delete objOfTasks[id]
    return isConfirm
  };

  //удаление html элемента по confirmed и li
  function deleteTaskFromHtml (confirmed, el){
    if(!confirmed) return
    el.remove()
  };


  //удаление li по таргету находим кнопку по которой кликнули, затем родителя кнопки и 
  //вызываем обработчик куда передаем родителя и состояние true или false 
function onDeleteHandler ({target}){
  if(target.classList.contains('delete-btn')){
    const parent = target.closest('[data-task-id]');
    const id = parent.dataset.taskId;
    const confirmed = deleteTask(id);

    deleteTaskFromHtml(confirmed, parent)
  }
};


// обработчик события изменения селекта
function onThemeSelectHandler(e) {
  const selectedTheme = themeSelect.value;
  const isConfirmed = confirm(
    `Вы действительно хотите изменить тему: ${selectedTheme}`,
  );
  if (!isConfirmed) {
    themeSelect.value = lastSelectedTheme;
    return;
  }
  setTheme(selectedTheme);
  lastSelectedTheme = selectedTheme;
  localStorage.setItem('app_theme', selectedTheme);
}


// функця установки темы
function setTheme(name) {
  const selectedThemObj = themes[name];
  Object.entries(selectedThemObj).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value);
  });
}

})(tasks);
