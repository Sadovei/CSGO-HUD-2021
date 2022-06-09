# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


CSGO - 2022

BACKEND
    1. Proiectul se gaseste cu numele csgo-gsi-v2 pe github.
    2. necesita un fisier .env prin care se specifica tipul de stream(A sau B), unde isi seteaza portul definit, 4400 sau 4600.
    3. In fisierul index al folderului Vmix, trebuie setat ip-ul unde se gasesc camerele jucatorilor.
    4. Comunicarea cu parser-ul se face tot pe baza fisierului .env, unde parserul trebuie sa fie pe 4500, respectiv 4700.
    5. De verificat pe viitor, MVP si diferenta de ADR de la clientii diferiti(main si igdir)

FRONTEND
    1. Proiectul se gaseste cu numele CSGO-HUD-2021 pe github.
    2. In interiorul proiectului se afla toate versiunile de HUD + cele complementare, de unde isi trag informatiile din acelasi loc.
    3. Necesita tot un fisier .env, prin care se specifica stream-ul, mai exact de pe ce port sa-si ia datele necesare.
    4. In package.json, se specifica in homepage, locul unde o sa fie build-uit proiectul final, pentru a rula corespunzator.

Pentru a pune HUD-ul pe un pc, este nevoie de aplicatia ELECTRON unde se pune adresa HUD-ului cu argumentul (.../?client=main), iar in csgo,
sa fie instalat cfg-ul aferent clientului ales in browser.( in exemplul anterior cfg-ul de main-obs).
