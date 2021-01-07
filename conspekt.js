
/* 

  NodeJS — это JavaScript-окружение построенное на движке Chrome V8 (он очень эффективно интерпретирует js в машинный 
код);  NodeJS работает в режиме runtime - работает пока запущен; NodeJS — серверный js; NodeJS это тот же js + некоторые
дополнительные фичи: работа с файлами, создание серверов и т.д.  В NodeJS 1 поток, как и в js

  Node.js следует модульной системе, а встроенная функция require - самый простой способ включить модули, которые 
существуют в отдельных файлах 

*/



Комманды:

node -v                          показывает установленную версия nodeJS
node                             запускает сессию nodeJS - интерактивную среду nodeJS с командами; можно писать js и терминал будет его 
                                 понимать; если закончить текущую сессию nodeJS, например командой .exit, то при новом входе не будут  
                                 доступны данные, например переменные или функции, из прошлой сессии
node <jsFile>                    для запуска файла на nodeJs в терминале указываем путь к файлу; разрешение .js можно не писать

npm -v                           показывает установленную версия nodeJS package manager
npm init                         инициирует проект; мы попадаем в wizard {установщик базовых полей package.json}, где отвечаем на вопросы
npm init -y                      инициирует проект без ответа на вопросы
npm i                            устанавливает все пакеты, указанные в package.json
npm i [-g] <packages>            устанавливает последние версии пакетов в папку node_modules, которые пойдут в проект - не только для  
                                 разработки; такие пакеты записываются в package.json в поле dependencies; они будут в нашем приложении;
                                 если указан -g, то устанавливает пакеты глобально, в node_modules их не будет
npm i <package>@<version>        устанавливает заданную версию пакета
npm i <packages> -D              устанавливает пакеты, как пакеты только для разработки; такие пакеты не пойдут в приложение
npm i <packages> --no-save       устанавливает пакеты без сохранения в package.json
npm rm [-g] <packages>           удаляет локальные {глобальные с флагом -g} пакеты; вложенные {от которых зависит пакет} не удаляются
npm outdated                     выводит пвкеты, для которых доступны более новые версии
npm update                       обновляет все пакеты согласно ^ или ~ перед версиями, так же меняя версии в package.json
npm up [-g] <packages>           обновляет все перечисленные пакеты согласно ^ или ~ перед версиями
npm i <package>@latest           служит для обновления уже установленного пакета до последней версии, игнорируя ^ или ~ 
npm run <scriptName>             запускает приложение через скрипты, установленные в package.json в поле scripts; так же скрипты npm 
                                 могут запускать другие скрипты npm, например {"build": "npm run scss && npm run uglify"}
npm publish                      публикует пакет в реестре, чтобы его можно было установить по имени {новой версии пакета, измененной 
                                 в package.json до публикации}; команда выполняется из папки с package.json {корневой дирректории пакета}

ncu                              показывает пакеты, которые можно обновить {если установлен npm-check-updates}; альтернатива npm outdated
ncu -u                           обновляет файл package.json {если установлен пакет npm-check-updates}, заменяя версии зависимостей



/* 

  Нельзя называть проект в packag.json ( "name": "styled-сomponents" ) так же, как и один из пакетов (Parcel заругался)!

  В новой версии Node.js npm пакеты (локальные) нужно запускать с помощью утилиты npx. Например: npx webpack вместо 
webpack;  в поле scripts в package.json можно не писать npx. Так же npx сначало устанавливает модуль, если он не установлен, 
а затем он отрабатывает, после чего модуль удаляется; например: npx create-react-app my-app  сначало установит модуль 
create-react-app, который потом создаст проект my-app, а потом create-react-app удалится

  В папке node_modules у установленных пакетов обычно есть несколько зависимостей (вложенные пакеты), которые можно посмотреть   
в поле dependencies в package.json для каждого пакета. Эти зависимости так же устанавливаются в папку node_modules. 
Получается цепочка зависимостей для работы нашего приложения; т.е. все зависимости из dependencies будут в приложении

devDependencies — пакеты, которые нужны для разработки. Всякие галпы и плагины к ним обычно подпадают в эту категорию.
dependencies — пакеты, от которых ваш пакет зависит непосредственно: как правило — библиотеки; они все ставятся в node_modules.

В production версию продукта попадают не все модули, использующиеся при разработке. Модули из devDependencies не попадут 
в production (при npm run build), только модули из dependencies!  
Но это не касается webpack - в финальный bundle попадут все зависимости:
  https://jsramblings.com/do-dependencies-devdependencies-matter-when-using-webpack
  https://stackoverflow.com/questions/40143357/do-you-put-babel-and-webpack-in-devdependencies-or-dependencies 

Пока не импортировали в проект из node_modules установленный модуль, он в проект не попадает!


                  Основное различие между локальными и глобальными пакетами заключается в следующем: 
- локальные пакеты устанавливаются в каталог, в котором мы запускаем npm i <packages>, и помещаются в node_modules в этом
  каталоге 
- все глобальные пакеты помещаются в одно место в нашей системе (место зависит от настроек), независимо от того, где мы 
  запускаем npm install npm i -g <package>; обновление глобального пакета заставит все проекты использовать новую версию, что 
  может привести к плохим последствиям, т.к. некоторые пакеты могут нарушить совместимость с другими зависимостями и так далее;
  пакет должен быть установлен глобально, когда он предоставляет исполняемую команду, запускаемую из оболочки (CLI), и он 
  повторно используется в проектах (npm, create-react-app, mocha, react-native-cli, nodemon...);  
  По дефолту глобальные пакеты загружаются по такому пути  C:\Users\Anton\AppData\Roaming\npm\node_modules (базовые глобальные
  пакеты: browser-sync, create-react-app, firebase-tools, gulp, json-server, npm-check-updates, rimraf, yarn)

  Например, если chalk установить глобально, то к нему не будет доступа из проекта; для того, что бы получить доступ, можно 
установить модуль require-global; что бы команды chalk были доступны из терминала нужен модуль chalk-cli 

      Почему нам нужно установить gulp глобально и локально?
При установке инструмента глобально он будет использоваться пользователем как утилита командной строки где угодно, 
в том числе вне проектов node. Глобальные установки для проекта node плохи, потому что они затрудняют развертывание.


  package-lock.json служит для сохранения конкретных версий всех зависимостей, которые мы устанавливаем в проект (включая все
вложенные). Это полезно, если, например, другой разработчик разворачивает мой проект, и вроде бы все то же самое, а проект
не работает. А все потому что где то какая то вложенная зависимость установилась не в той версии и в ней что то поменялось 



                                    Версионность:

            Что означают цифры в версии проекта? В качестве примера возьмём версию 7.12.4

  Первая цифра означает мажорную версию проекта. Мажорная версия проекта - это стабильная, готовая к использованию 
версия проекта. Когда проект на стадии релиза (первого запуска), то проекту выставляется мажорная версия 1. Каждая 
последующая цифра означает что в проекте произошли глобальные изменения, изменившие как внешнее взаимодействие с 
проектом, так и внутреннюю реализацию. При этом новая версия не совместима с предыдущей.
  Вторая цифра означает минорную версию проекта. Минорная версия - это когда в проекте меняется внутренняя реализация 
функционала, при этом внешнее взаимодействие осталось не изменённым или изменилось, но при этом сохранены все способы 
взаимодействия и не ломается совместимость с предыдущими проектами. Например, введение новой функции во взаимодействие 
с проектом.
  Третья цифра означает патч-версию проекта. Патч-версия означает маленькие изменения или правку "багов" и ошибок текущей 
версии, которые не отражаются на функциональности проекта и взаимодействии с ним. Например, это может быть оптимизация 
кода или рефакторинг.
  Таким образом версия 7.12.4 означает что проект 7 раз значительно изменялся, обрастая новым функционалом и меняя порядок 
взаимодействия с ним, 12 раз был улучшен и 4 раза был проведён рефакторинг.

            Правила ведения версий проекта

  При ведении версий следует придерживаться общепризнанных правил:
1. Версии не могут быть отрицательными. Например, не следует использовать версию 1.-1.2.
2. При изменении мажорной версии обнуляются минорная и патч версия проекта. При изменении минорной версии обнуляется патч 
версия. Например, с версии 1.2.1 мы может сделать версию 2.0.0 или 1.2.0.
3. Версии должны изменяться пошагово. Например, не допустимо после версии 1.1.1 создавать версию 1.1.3. Возможные версии 
следующие: 2.0.0, 1.2.0, 1.1.2.
4. Только что созданный проект, находящийся в разработке следует помечать версией 0.1.0.

            Метки версий проекта

  К версии проекта можно добавлять слова "alpha", "beta", "rc" или "release". Это обозначения этапов разработки. Например, 
если к версии 1.0.0 добавить метку "alpha", то получится 1.0.0-alpha, что будет означать что проект представляет собой уже 
готовую версию продукта, однако пока что находиться в альфа тестировании. 


                                    Обновления версий с префиксами:

  При установке пакетов ставятся или указанные версии или последнии, если не указывать;
при повторном запуске npm i не произойдет обновление существующих пакетов. 
  Для обновления нужно использовать: npm up [-g] [<packages>]; если перед 
версией указан ~ или ^, то обновление будет происходить следующим образом:

~  - will update you to all future patch versions, without incrementing 
     the minor version:  ~1.2.3 will use releases from 1.2.3 to <1.3.0
^  - will update you to all future minor/patch versions, without incrementing 
     the major version:  ^2.3.4 will use releases from 2.3.4 to <3.0.0

*/


Пакеты:

npm-check-updates                проверяет и обновляет зависимости в package.json до последних версий, игнорируя указанные версии
chalk                            подсветка текста в консоле
nodemon                          перезапускает сервер при изменениях в файлах