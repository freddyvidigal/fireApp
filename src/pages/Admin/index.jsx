import "./admin.css";
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import {
addDoc,
collection,
onSnapshot,
query,
orderBy,
where,
doc,
deleteDoc,
updateDoc
 } from 'firebase/firestore';
import { wait } from "@testing-library/user-event/dist/utils";


export default function Admin(){
    const[tarefaInput, setTarefaInput] = useState('');
    const[user, setUser] = useState({});
    const[tarefas, SetTarefas] = useState([]);
    const[edit, SetEdit] = useState({});


    useEffect(() => {
    async function loadTarefas(){
        const userDatail = localStorage.getItem("@detailUser")
        setUser(JSON.parse(userDatail))
    if(userDatail){
        const data = JSON.parse(userDatail);

        const tarefaRef = collection(db,"tarefas")
        const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data?.uid))
        const unsub = onSnapshot(q, (snapshot) => {
            let lista = [];

            snapshot.forEach((doc)=>{
                lista.push({
                    id: doc.id,
                    tarefa: doc.data().tarefa,
                    userUid: doc.data().userUid
                })
            })
            
            SetTarefas(lista);
        })
    }
    
    
    }
    loadTarefas();
    }, [])

async function handleRegister(e){
    e.preventDefault();

   if(tarefaInput === ''){
    alert('Digite sua tarefa...')
    return;
   } 

   if(edit?.id){
    handleUpdatetarefa();
    return;

   }

   await addDoc(collection(db, "tarefas"), {
    tarefa: tarefaInput,
    created: new Date(),
    userUid: user?.uid
   })
   .then(()=>{
    console.log("tarefa Regsitrada")
    setTarefaInput('');
   })
   .catch((error) =>{
    console.log("Erro Ao Registrar" + error)
   })

}
async function handleLogout(){
    await signOut(auth);

}

async function deleteTarefa(id){
    const docRef = doc(db, "tarefas", id)

    await deleteDoc(docRef)
}

async function editTarefa(item){
    setTarefaInput(item.tarefa);
    SetEdit(item);
}
async function handleUpdatetarefa(){
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
        tarefa: tarefaInput
    })
.then(()=> {
    console.log("Tarefa Atualizada")
    setTarefaInput('');
    SetEdit({})
})
.catch((error)=>{
    console.log("error aoatualizar"+error)
    setTarefaInput('');
    SetEdit({})
})
}

return(
    <div className="admin-container">
    
    <h1>Minhas Tarefas</h1>

    <form className="form" onSubmit={handleRegister}>
     <textarea 
     placeholder="Digite sua tarefa..."
     value={tarefaInput}
     onChange={(e)=> setTarefaInput(e.target.value)}  
     
     
     />
    
    {Object.keys(edit).length > 0 ? (
        <button className="btn-register" style={{backgroundColor: '#6add39'}}  type="submit">Atualizar tarefa</button>
    ) : (
        <button className="btn-register" type="submit">Registar tarefa</button>
    )}
      
        
        
    </form>  
   {tarefas.map((item)=>(
     <article key={item.id} className="list">
     <p>{item.tarefa}</p>

     <div>
         <button onClick={()=> editTarefa(item)} >Editar</button>
         <button onClick={()=> deleteTarefa(item.id)} className="btn-delete">Concluir</button>
     </div>
 </article>
   ))}

    <button className="btn-logout" onClick={handleLogout}>Sair</button>

    </div>
)
}