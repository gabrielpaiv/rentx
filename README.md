# RentX 🚘

&nbsp;

<img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/RentX.png?raw=true" alt="Capa"/>

&nbsp;

## 🚧 Informações sobre o projeto

- O projeto consiste em um app de aluguel de carros. Nele você pode:
  - Ver os carros disponíveis,
  - Ver os detalhes de cada carro,
  - Escolher um intervalo no calendário,
  - Confirmar os detalhes do agendamento e agendar,
  - Ver os carros já agendados.
  - Criar uma conta e fazer login
  - Mudar os dados do perfil
- A aplicação roda no modelo Offline-first, as possibilidades de uso offline são:
  - Ver os carros disponíveis (sem o preço)
  - Mudar os dados do perfil (exceto a senha)
  - Ver a descrição do carro

&nbsp;

<div cols=3 align="center">
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/Home.jpeg?raw=true" height="500px" alt="Home"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/CarDetails.jpeg?raw=true" height="500px" alt="CarDetails"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/Scheduling.jpeg?raw=true" height="500px" alt="Scheduling"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/SchedulingDetails.jpeg?raw=true" height="500px" alt="SchedulingDetails"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/SchedulingComplete.jpeg?raw=true" height="500px" alt="SchedulingComplete"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/MyCars.jpeg?raw=true" height="500px" alt="MyCars"/>
  <img src="https://github.com/gabrielpaiv/gabrielpaiv/blob/main/.github/images/Projects/rentx/RentX-animation.gif?raw=true" height="500px" alt="RentX-animation"/>

</div>

&nbsp;

## 🛠️ Tecnologias/Ferramentas ultilizadas

- React Native
- Styled Components
- Expo
- React Navigation
- Axios
- Date-fns
- Lottie
- React Native Calendars
- Reanimated V2
- Iphone X Helper
- Json Server
- Typescript
- WatermelonDB
- Fast Image
- Yup

## ⚙️ Instalação

```
# Supondo que seu terminal seja Unix
# Abra um terminal e copie este repositório com o comando
$ git clone https://github.com/gabrielpaiv/rentx.git
```

```
# Acesse a pasta da aplicação
$ cd rentx

# Acesse o backend da aplicação
$ cd backend

# Instale as dependências
$ yarn

# Inicie a api
$ yarn start

# Acesse a página inicial
$ cd ../

# Inicie o metro bundler
$ yarn start

# Instale o apk no android (certifique-se que seu dispositivo físico esteja
# conectado com a opção de depuração USB ativada ou que o emulador esteja pronto)
$ yarn run android

# Configure a api:
# Vá até src/services/api.ts e mude o endereço
# baseURL: 'http://(seu IPV4):3333'

```

---

<p align="center">Feito com 🦆 por Gabriel Paiva</p>
