import  { useState } from "react";
import { supabase } from "./supabaseClient";
import { LoadingIcon } from "./components_icons/Icons";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      console.log(error);
      alert(error.error_description || error.message);
    }
    setLoading(false);
  }

  return (
    <div className="h-screen">
      <div className="flex flex-col justify-center items-center h-full">
        <h1 className="text-2xl font-bold ">
          WEATHER STATION TELEMATICANETz
        </h1>
        <h1 className="text-2xl font-bold py-10">
          Inicio de sesi&oacute;n
        </h1>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col justify-center space-y-2">
            <label htmlFor="email" className="font-bold">
              Correo Electr&oacute;nico
            </label>
            <input className="border border-black px-4 py-2 rounded-lg"
              type="email"
              placeholder="Correo Electr&oacute;nico"
              value={email}
              required={true}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password" className="font-bold">
              Contrase&ntilde;a
            </label>
            <input className="border border-black px-4 py-2 rounded-lg "
              type="password"
              placeholder="Contrase&ntilde;a"
              value={password}
              required={true}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={loading}
              className="bg-blue-800 text-white font-bold rounded-lg px-4 py-2">
              {loading
                ? <span className="inline-flex space-x4"><LoadingIcon />Iniciando sesi&oacute;n</span>
                : <span>Inicia sesi&oacute;n</span>}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
