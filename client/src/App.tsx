import React from "react";
import { Welcome } from "./components/Welcome";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { setAccessToken } from "./accessToken";

function App() {
  // Add for loading the application
  const [loading, setLoading] = useState(true);

  // need a condition as app will load regardless..
  // Executes before the app loads
  useEffect(() => {
    fetch("http://localhost:4000/refresh_token", {
      method: "POST",
      credentials: "include",
    }).then(async (res) => {
      const data = await res.json();
      setAccessToken(data);
      console.log(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <p>spin spin spinning...</p>;
  }

  return (
    <div>
      {!loading && (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
