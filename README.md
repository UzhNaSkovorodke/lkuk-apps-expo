# STONEHEDGE MOBILE

Адрес в git: `https://git.axbit.ru/stonehedge/stonehedge-mobile`

## Необходимые компоненты для запуска приложения

- [Node.js](https://nodejs.org/en/) 10.15.3 и выше
- npm v.6.4.1 и выше, устанавливается вместе с Node.js
- (не обязательно) [nvm](https://github.com/coreybutler/nvm-windows/releases) для управления версиями Node.js
- react-native-cli v.2.0.1 и выше, устанавливается при вызове `npx react-native run-android`
  или `npx react-native run-ios`
- [Android Studio](https://developer.android.com/studio/archive) v.3.4.1 и выше или xCode v.10 + под IOS
- [VS Code](https://code.visualstudio.com/docs/?dv=win) или любая другая IDE
- Эмулятор устройства или реальное устройство, желательно использовать Genimotion (и VirtualBox).

## Подготовка проекта к запуску Android Windows

1. Скачать и установить [Node.js](https://nodejs.org/en/)
2. Скачать и установить [Android Studio](https://developer.android.com/studio/archive)
3. Скачать и установить [JDK](https://www.oracle.com/technetwork/java/javase/downloads/2133151)
4. В переменные среды добавить переменную `ANDROID_HOME`, пример пути `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk`
5. В переменные среды добавить переменную `JAVA_HOME`, пример пути `C:\Program Files\Java\jdk1.8.0_211`
6. В переменную `Path` добавить `C:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk\platform-tools`
   и `C:\Program Files\Java\jdk1.8.0_211\bin`
7. Восстановить зависимости `npm i`
8. Создать виртуальное устройство, [подробнее](https://developer.android.com/studio/run/managing-avds.html)

## Запуска проекта

1. Открываем консоль (`Ctrl+R` дальше пишем `cmd`) или терминал для Mac OS.
2. Переходим в директорию с проектом, пример пути `cd C:\Projects\StoneHedge`
3. Вызываем: `npx react-native run-android` или `npx react-native run-ios`

\*Не нужно каждый раз перезапускать приложение при правках интерфейса, обновить приложение можно нажав на Reload в
эмуляторе или нажав кнопку два раза(R): R+R

## Установка зависимостей

`npm ci`

### Проблема с установкой зависимостей

`В зависимостях проекта есть пакет "stonehedge-shared" проверьте что у вас есть доступ к репозиторию lkuk-common`

## Костыли

### Проблема с переменными из окружения (URL адрес сервера)

Сменить сервер с dev на prod при сборке можно вручную в пакете node_modules, 52 строка:

`node_modules/stonehedge-shared/src/api/index.js`
`${process.env.REACT_APP_API_HOST || ''}${urlParams}?${queryParams}`

### Проблема с изменением/пустым URL при (npm run dev | npm run prod)

`npm run clear-cache`

## Решение возможных проблем под MacOS

### Проблема с npm install под MacOS

`sudo npm ci --unsafe-perm`
`sudo npm ci --unfase-perm=true --allow-root`

### Проблема permissions denied под MacOS то открываем Xcode под Root правами

`sudo /Applications/Xcode.app/Contents/MacOS/Xcode`

### Проблема permissions denied под MacOS проставляем permissions для модулей

`sudo chmod -R 777 /Users/_YOUR_USER_/Projects/StoneHedge/node_modules `

## Дополнительная информация по react-native

[react-native](https://facebook.github.io/react-native/docs/getting-started)
