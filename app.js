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

  console.log(objOfTasks)

// Elements UI получаем элементы со страницы

const listContainer = document.querySelector('.tasks-list-section .list-group');
const form = document.forms['addTask']; // форма
const inputTitle = form.elements['title']; //инпут заглавия таски
const inputBody = form.elements['body']; // инпут описания таски

// Events
  renderAllTasks(objOfTasks); // передаем обект тасок в функцию которая отрендерит таски на странице

  form.addEventListener('submit', onFormSubmitHandler); // сабмит формы, добавление таски

  listContainer.addEventListener('click', onDeleteHandler); // удаление таски
  

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

})(tasks);
