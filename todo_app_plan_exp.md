Этапы разработки:
Этап #1 - Создать структуру html-разметки через JS [createElement()]:
- Создать 'div' c классом 'to-do-list'
  - Создать 'div' c классом 'task-input'
    - Создать 'input' с атрибутами: class='input-field' type='text'
    - Создать 'button' с атрибутами: class='input-button' onclick='addTask'
  - Создать 'ul' с классом 'task-list'
  - Создать 'div' с классом 'task-sort-buttons'
    - Создать две 'button' с классом 'sort-button'

- Прикрепить через [appendChild()]:
    input-field, input-button -> task-input
    sort-button -> task-sort-buttons
    task-input -> to-do-list
    task-list -> to-do-list
    task-sort-buttons -> to-do-list

Этап #2 - Написать функции добавляющие и удаляющие элементы:

- function [addTask()]
  - Получить 'value' из 'input.task-input'
  - Создать 'li' с классом 'task'
  - Создать 'span' с классом 'description'
  - Создать 'button' с атрибутами class='remove-button' 
    onclick='removeTask' с помощью [addEventListener('click')]
  - Вставить значение из 'value' в 'span' через [innerHTML]
  - Добавить запись в localStorage 
    - taskName -> * Нужно придумать как именовать таски
    - createdAt -> использовать Date.now()
  
  - Прикрепить 
      description, remove-button -> task
      task -> task-list

- function [removeTast()] 
  - Получить родителя кнопки remove-button (task)
  - Открепить от task от task-list через [removeChild()]
  - Удалить запись из localStorage

Этап #3 - Сортировка по дате:
  - Нужно создать массив объектов tasks = [ {id: , name: , createdAt: }]
  - Создать функции
    - function [saveTasks()]:
      - сохранить в хранилище [localStorage.setItem] массив tasks, 
        преобразовав в JSON [JSON.stringify(tasks)]
    - function [loadTasks()]:
      - получить массив из хранилища [localStorage.getItem]
      - если в хранилище пусто - вернуть пустой массив
      - запускать эту функцию при каждой загрузке страницы
    - function [sortTasks(order)]: либо новейшие, либо старейшие
      - сравнение дат из tasks.createdAt
    - function [render()]:
      - получаем task-list
      - проходимся по всему массиву tasks
      - для каждой задачи вызываем функцию addTask();
    










<!-- 
Функции:

1. Добавление задач:
- Создать элемент HTML в виде контейнера (div) с классом .task
- Создать элемент для текста (span) и кнопку для удаления (button)
- Заполнить элемент span текстом полученным из поля inputж -->