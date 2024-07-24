'use client';

import { useState } from 'react';

export default function Login() {
  const [senha, setSenha] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  function Enviar(email: string, senha: string) {
    let user = { email, senha };

    fetch('http://localhost:3333/users/sign', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
      console.log('logado com sucesso', data);
    })
    .catch(error => {
      console.error('Erro ao fazer login:', error);
    });
  }

  return (
    <div>
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
      <button onClick={() => Enviar(email, senha)}>
        Entrar
      </button>
    </div>
  );
}
