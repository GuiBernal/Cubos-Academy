import "./App.css";
import React from "react";

function fazerRequisicaoComBody(url, metodo, conteudo, token) {
  return fetch(url, {
    method: metodo,
    headers: {
      "Content-Type": "application/json",
      Authorization: token && `Bearer ${token}`,
    },
    body: JSON.stringify(conteudo),
  });
}

function App() {
  const [jogos, setJogos] = React.useState(null);

  React.useEffect(() => {
    fazerRequisicaoComBody(
      "http://192.168.0.48:8081/mostrarClassificacao",
      "GET"
    )
      .then((res) => res.json())
      .then((dados) => setJogos(dados));
  }, []);
  return <div className="App">{jogos && jogos[0].time}</div>;
}

export default App;
