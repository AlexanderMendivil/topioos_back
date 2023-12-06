require('dotenv').config();
import express from 'express'
import cors from 'cors'
import { getOneArea, getAreas, addArea, updateArea, deleteArea, changeStatus } from './services/areas.service'
import { login, signUp } from './services/auth.service';
import { IArea } from './interfaces/area.interface';
const app = express()
const port = process.env.PORT || 3001;

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))



app.post('/login', login);

app.post('/signup', signUp);

app.get('/area', async (req, res) => {

  const areas = await getAreas()
  res.send(areas)
})
app.post('/area', async (req, res) => {
  const result = await addArea(req.body)
  res.send(result)
})
app.put('/area', async (req, res) => {
  const  area = req.body as IArea
  const result = await updateArea(area)
  res.send(result)
})
app.delete('/area', async (req, res) => {
  const ids = req.body
  const result = await deleteArea(ids)
  res.send(result)
})

app.put('/status', async (req, res) => {
  const  { id, status } = req.body
  const result = await changeStatus(id, status)
  res.send(result)
})

app.post('/OneArea', async (req, res) => {
  console.log(req.body)
  const area = await getOneArea(req.body.id)
  res.send(area)
})

app.listen(port, async () => {
  console.log(`Express is listening at http://localhost:${port}`)
})
