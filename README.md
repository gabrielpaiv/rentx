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

# Instale as dependências
$ yarn

# Inicie o expo
$ expo start

# Configure seu IP no Json-Server:
# Vá até o package.json aonde estiver "server" e coloque de acordo
# "server": "json-server ./src/services/server.json --host (seu IPV4) --port 3333 --delay 700"

# Configure a api:
# Vá até src/services/api.ts e mude o endereço
# baseURL: 'http://(seu IPV4):3333'

# Inicie o json-server:
$ yarn server

# Acesse o QR Code diretamente do aplicativo Expo Go
```

---

<p align="center">Feito com 🦆 por Gabriel Paiva</p>
