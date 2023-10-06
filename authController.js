// Здесь идет описание всех функций по взаимодействию с пользователем
const User = require('./models/User')
const Role = require('./models/Role')
const bcrypt = require('bcryptjs');
const { validationResult } = require("express-validator")

// Я создал "class" чтобы скомпоновать функции ниже в одну сущность
class authContoller {

    async registration(req, res) {

        try {

            const errors = validationResult(req) //Возвращение ошибок, вследствие валидации
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Ошибка при регистрации", errors })
            }

            //Вытаскиваем логин и пароль из тела запроса
            const { username, password } = req.body

            //Проверка на существование пользователя в БД по критерию "username"
            const candidate = await User.findOne({ username })

            if(candidate) {
                console.log('Ошибка')
                return res.status(400).json({ message: "Пользователь с таким именем уже существует"})
            }


            //Перед отправкой пароля в БД, в целях безопасноти нужно его "захешировать"
            const hashPassword = bcrypt.hashSync(password, 7);  //Пароль и степень шифрования. Я поставил 7 в целях экономии времени

            //Получение роли с БД, чтобы присвоить её новому пользователю
            const userRole = await Role.findOne({ value: "USER"})
            const user = new User({ username, password: hashPassword, roles: [userRole.value] })

            // Сохранение пользователя в БД и возвращение ответа клиенту
            await user.save()
            return res.json({ message: "Пользователь успешно зарагестрирован"})

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Registration error' })   
        }  
    }


    async login(req, res) {
        try {

        } catch (e) {
            console.log(e)
            res.status(400).json({ message: 'Login error' })
        }
    }



    async getUsers(req, res) {

        try {

        //Создание 2 роли в БД
        //    const userRole = new Role()
        //    const adminRole = new Role({ value: "ADMIN"})

        //    await    userRole.save()
        //    await    adminRole.save()
        //    теперь этот код можно убрать

            res.json("server work)")
        } catch (e) {

        }
    }

}


module.exports = new authContoller()