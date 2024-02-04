import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/common/Spinner";
import { useAuth } from "../context/auth";

export default function AdminRoute({ children }) {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`
      );
      if (res) {
        console.log("first", res.data.ok);
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);
  console.log(ok);

  return ok ? <div>{children}</div> : <Spinner />;
}
