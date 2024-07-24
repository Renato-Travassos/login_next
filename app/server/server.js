const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const dbPath = path.join(__dirname, '../Database/users.db');  
const db = new sqlite3.Database(dbPath);
let {createValidationSchema} =require('../controllers/User')

let yupSchema=createValidationSchema()
const porta = 3333;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

app.get('/users', (req, res) => {
    db.all('SELECT * FROM USERS', (erro, rows) => {
        if (erro) {
            console.log(erro);
            res.status(500).send('Erro ao buscar usuários');
        } else {
            console.log(rows);
            res.json(rows);  
        }
    });
});

app.post('/users/sign', (req, res) => {
    
    const  {email,senha}=req.body
   db.get('SELECT * FROM users WHERE email = ? LIMIT 1',[email],
    async(erro,row)=>{
        if (row) {
         const isValid = bcrypt.compareSync(senha, row.senha);
    
         if(!isValid){
             console.log("senha inválida")
             return 
         }
          console.log('login sucesso')
          

        }else{
            console.log('email inexistente')          
        }
    }
   )

});
app.post('/users/create', async (req, res) => {
    const { email, senha, nome } = req.body;
    
     db.get('SELECT * FROM users WHERE email = ? LIMIT 1', [email], async (erro, row) => {
        if (erro) {
            console.log('Erro ao acessar o banco de dados:', erro);
            return res.status(500).send('Erro ao acessar o banco de dados');
        }

        if (row) {
             console.log('Email já cadastrado'); 
        } else {
             try {
                await yupSchema.validate(req.body);
            } catch (validationError) {
                console.log('Erro de validação:', validationError);
                return res.status(400).send('Dados inválidos');
            }

             bcrypt.genSalt(10, (erro, salt) => {
                if (erro) {
                    console.log('Erro ao gerar salt:', erro);
                    return res.status(500).send('Erro ao criar perfil');
                }
    
                bcrypt.hash(senha, salt, (erro, hash) => {
                    if (erro) {
                        console.log('Erro ao gerar hash:', erro);
                        return res.status(500).send('Erro ao criar perfil');
                    }
    
                    const hashedPassword = hash;
                    db.run('INSERT INTO users (nome, senha, email) VALUES (?, ?, ?)', [nome, hashedPassword, email], (erro) => {
                        if (erro) {
                            console.log('Erro ao inserir dados:', erro);
                            res.status(500).send('Erro ao criar perfil');
                        } else {
                            console.log('Perfil criado com sucesso');
                            res.status(201).send('Perfil criado com sucesso');
                        }
                    });
                });
            });
        }
    });
});


app.get('/users/login', (req, res) => {
     
});

app.get('/users/sucess', (req, res) => {
     
});

app.get('/users/getoff', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send('Logout com sucesso');
    });
});

app.listen(porta, () => {
    console.log(`Servidor está rodando na porta ${porta}`);
});
