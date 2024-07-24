'use client';

import { useState } from 'react';
import User from '../models/User';
 

export default function Login() {

const [nome,setNome]=useState<string>("")
const [senha,setSenha]=useState<string>("")
const [email,setEmail]=useState<string>("")

function Enviar(user: User) {


  
    fetch('http://localhost:3333/users/create', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Sucesso ao criar perfil', data);
     })
     
  }

    return  (
        <>
        <div>


        <input 
          type="text" 
          placeholder="ex:Ana,Ezra" 
          value={nome}
          onChange={(e) => setNome(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="example@gmail.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="*****" 
          value={senha}
          onChange={(e) => setSenha(e.target.value)} 
        />
<button 
          onClick={() => Enviar({nome,email,senha} )}>
          Cadastrar
        </button>
    

        </div>
        </>
    )
  }