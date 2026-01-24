import { useState } from "react"
import { Footer } from "./componentes/Footer"
import { Guitar } from "./componentes/Guitar"
import { Header } from "./componentes/Header"
import { db} from "./data/db"


export const App = () => {

    const [data, setData] =useState(db)
    console.log(db);
    
  return (
    <>
        <Header/>
        <main className="container-xl mt-5">
            <h2 className="text-center">Nuestra Colección</h2>

            <div className="row mt-5">
            <Guitar nombre="Guitarra1"/>
            <Guitar nombre="Guitarra2"/>
            <Guitar nombre="Guitarra3"/>
            </div>

        </main>
        <Footer/>
    </>
  )
}

