import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses } from './database'
import { COURSE_STACK } from './types'
import { TCourse } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3004, () => {
    console.log("Servidor rodando na porta 3004")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})
//get all courses get http://localhost:3004/courses
app.get('/courses', (req: Request, res: Response) => {
    res.status(200).send(courses)
})
// get http://localhost:3004/courses/search?name=react é um exemplo de busca pelo curso react
app.get('/courses/search', (req: Request, res: Response) => {
    const name = req.query.name as string
    const result = courses.filter((couse) => couse.name.toLowerCase().includes(name.toLowerCase()))
    res.status(200).send(result)
})

app.post('/courses', (req: Request, res: Response) => {
    const id = req.body.id as string
    const name = req.body.name as string
    const lessons = req.body.lessons as number
    const stack = req.body.stack as COURSE_STACK

    const newCourse:TCourse = {
        id,
        name,
        lessons,
        stack
    }
    courses.push(newCourse)
    res.status(201).send('Curso cadastrado com sucesso!')
})