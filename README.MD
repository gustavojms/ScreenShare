# ScreenShare

O projeto ScreenShare é uma aplicação que permite o compartilhamento de tela entre diversos computadores através de websockets. A aplicação foi desenvolvida com o intuito de facilitar o compartilhamento de tela entre professores e alunos durante aulas online, trazendo uma experiência agradável e intuitiva para os usuários. Além disso, temos um chat em tempo real para que os usuários possam se comunicar durante a aula.

## Tecnologias

- [React](https://reactjs.org/)
- [NodeJS](https://nodejs.org/en/)
- [Socket.io](https://socket.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [Express](https://expressjs.com/pt-br/)

## Funcionalidades

- [x] Compartilhamento de tela em salas privadas
- [x] Chat em tempo real para comunicação entre os usuários
- [x] Nomes de usuários personalizados

## Pré-requisitos

- [NodeJS](https://nodejs.org/en/) (versão 18 ou superior)
- [NPM](https://www.npmjs.com/get-npm) (versão 9 ou superior)
- [Docker](https://www.docker.com/) (versão 20 ou superior)

## Como executar o projeto com docker

1. Clone o repositório em sua máquina local:
    
    ```git clone https://github.com/gustavojms/ScreenShare.git``` 

2. Acesse a pasta do projeto:
    
    ```cd ScreenShare```

3. Execute o comando abaixo para rodar o projeto com docker:
    
    ```docker-compose up```

4. Alternativamente, você pode rodar o projeto com o docker em um processo em segundo plano:
        
        ```docker-compose up -d```

## Como executar o projeto sem docker

1. Clone o repositório em sua máquina local:
    
    ```git clone https://github.com/gustavojms/ScreenShare.git```

2. Acesse a pasta da api do projeto:
    
    ```cd ScreenShare/backend```

3. Instale as dependências do projeto:
    
    ```npm install```

4. Execute o comando abaixo para rodar a api:
    
    ```npm run dev```

5. Em outro terminal, acesse a pasta do frontend do projeto:
    
    ```cd ScreenShare/frontend```

6. Instale as dependências do projeto:
    
    ```npm install```

7. Execute o comando abaixo para rodar o frontend:
    
    ```npm run dev```

8. Caso deseja rodar o projeto para que todos os usuários da sua rede local possam acessar, execute o comando abaixo:
    
    ```npm run dev -- --host 0.0.0.0```

Dessa forma qualquer pessoa da sua rede local poderá acessar o projeto através do seu ip local e da porta 5173.

## Como acessar o projeto

Após executar o projeto, acesse o endereço ```http://localhost:5173``` em seu navegador para acessar o frontend da aplicação.

## Como utilizar o projeto

1. Ao entrar na página inicial da aplicação, você terá um formulário para criar o nome de usuário que será utilizado durante a aula. Após criar o nome de usuário, clique no botão "Entrar".

2. Você será redirecionado para a tela principal da aplicação, na qual terá listado no lado esquerdo todas as salas com transmissões ativas. Na parte superior central você terá a opção para criar a sua própria transmissão, basta adicionar o nome da sala que você deseja que seja exibida para os outros usuários e apertar em "Transmitir". Após isso será necessário escolher qual tela você deseja transmistir, automáticamente ao fazer esse passo irá ser criado um chat privado para a sua sala, que fica localizado no lado direito da tela.

3. Caso deseja encerrar sua transmissão, basta clicar no botão de desligar localizado na parte inferior central da tela.