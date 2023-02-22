import { useState } from "react";

import "./home.css";
import { Link } from "react-router-dom";
import { auth } from "../../firebaseConnection";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== "" && password !== "") {
      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // navegar para /admin
          navigate("/admin", { replace: true });
        })
        .catch((erro) => {
          alert(erro);
        });
      console.log("teste");
    } else {
      alert("Preencha todos os campos");
    }
  }

  return (
    <div className="home-container">
      <h1>Lista de tarefas</h1>
      <span>Gerencie sua tarefa de forma fácil</span>

      <form className="form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Digite sua senha...."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Acessar</button>
      </form>

      <Link className="button-link" to="/register">
        Nao possui uma conta? cadastre-se
      </Link>
    </div>
  );
}
