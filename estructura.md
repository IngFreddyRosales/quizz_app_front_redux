quizz_app_frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/                        # Capa de comunicación con el backend
│   │   ├── axiosInstance.js        # axios con baseURL + interceptor del token JWT
│   │   ├── authApi.js              # login, register
│   │   ├── categoryApi.js          # getCategories
│   │   ├── quizApi.js              # createSession, getQuestions, answerQuestion, finish, abandon
│   │   ├── userStatApi.js          # getMyStats
│   │   ├── achievementApi.js       # getMyAchievements
│   │   └── seasonApi.js            # getSeasons, getCurrentLeaderboard, getLeaderboard
│   │
│   ├── store/                      # Redux Toolkit — el núcleo del proyecto
│   │   ├── index.js                # configureStore con todos los slices
│   │   └── slices/
│   │       ├── authSlice.js        # { user, token, status } + login/register thunks
│   │       ├── categorySlice.js    # { list, status } + fetchCategories thunk
│   │       ├── quizSlice.js        # { session, questions, currentIndex, score, status }
│   │       ├── userStatSlice.js    # { stats, status } + fetchMyStats thunk
│   │       ├── achievementSlice.js # { list, newlyUnlocked } + fetchAchievements thunk
│   │       └── seasonSlice.js      # { seasons, leaderboard, status } + thunks
│   │
│   ├── pages/                      # Una página = una ruta de React Router
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── HomePage.jsx            # Lista de categorías para jugar
│   │   ├── QuizPage.jsx            # Pantalla de juego activo (pregunta por pregunta)
│   │   ├── ResultPage.jsx          # Resultado final + achievements desbloqueados
│   │   ├── ProfilePage.jsx         # Stats del usuario + mis logros
│   │   ├── LeaderboardPage.jsx     # Rankings por temporada
│   │   └── AdminPage.jsx           # Crear/cerrar temporadas (solo admin)
│   │
│   ├── components/                 # Componentes reutilizables
│   │   ├── PrivateRoute.jsx        # Protege rutas con token
│   │   ├── AdminRoute.jsx          # Protege rutas con role === 'admin'
│   │   ├── Navbar.jsx
│   │   ├── QuestionCard.jsx        # Muestra pregunta + opciones
│   │   ├── AchievementToast.jsx    # Notificación cuando desbloqueas logro
│   │   └── StatCard.jsx            # Tarjeta de stat (XP, nivel, racha)
│   │
│   ├── App.jsx                     # React Router con todas las rutas
│   └── main.jsx                    # ReactDOM + Provider del store
│
├── .env                            # VITE_API_URL=http://localhost:3000
└── package.json